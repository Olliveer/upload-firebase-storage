// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBofp6gWbjSnXjqVnhujtCpjfKFwS_AJp8',
  authDomain: 'uplaod-firebase.firebaseapp.com',
  projectId: 'uplaod-firebase',
  storageBucket: 'uplaod-firebase.appspot.com',
  messagingSenderId: '980755696032',
  appId: '1:980755696032:web:b4dc5ef618d4e18eba7cc5',
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseapp);

export { storage };
