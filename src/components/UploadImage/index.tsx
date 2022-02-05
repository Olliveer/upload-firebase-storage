import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import NextImage from 'next/image';
import { FormEvent, useState } from 'react';
import { storage } from '../../services/firebase';

type Images = {
  fullPath: string;
  url: string;
};

export function UploadImage() {
  const [images, setImages] = useState<Images[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleForm(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    //@ts-ignore
    handleUpload(event.target.files[0]);
  }

  async function handleUpload(file: File) {
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {
        setLoading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('done', uploadTask.snapshot);
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setImages([
            ...images,
            { fullPath: uploadTask.snapshot.ref.fullPath, url },
          ])
        );
        setLoading(false);
        console.log(images);
      }
    );
  }

  function handleDelete(fullPath: string) {
    const desertRef = ref(storage, fullPath);
    setLoading(true);
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setImages(images.filter((image) => image.fullPath !== fullPath));
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <input type="file" onChange={handleForm} />
      <button>Enviar</button>

      {images.length > 0 &&
        images.map((image, index) => {
          console.log(image);
          return (
            <>
              <table>
                <thead>
                  <td>name</td>
                  <td>image</td>
                  <td>actions</td>
                </thead>
                <tbody>
                  <tr>{image.fullPath}</tr>
                  <tr>
                    <NextImage
                      key={index}
                      src={image.url}
                      blurDataURL={image.url}
                      placeholder="empty"
                      alt="Image"
                      width={200}
                      height={200}
                    />
                  </tr>
                  <tr>
                    <button onClick={() => handleDelete(image.fullPath)}>
                      Excluir
                    </button>
                  </tr>
                </tbody>
              </table>
            </>
          );
        })}

      {loading && <p>Loading.....</p>}
    </div>
  );
}
