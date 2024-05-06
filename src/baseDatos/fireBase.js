// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrFI-Fhnr-qGZ7UcpGJmi-xASBsd4Lm0A",
  authDomain: "fir-proyecto-web.firebaseapp.com",
  projectId: "fir-proyecto-web",
  storageBucket: "fir-proyecto-web.appspot.com",
  messagingSenderId: "206600243388",
  appId: "1:206600243388:web:93f436fb1f32af5b6b68b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app);

const auth = getAuth(app);

export {app, dataBase, auth};