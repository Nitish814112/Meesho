// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXAnZxoD-kl3M1nmRWgTiJbZvjulnfuk",
  authDomain: "meeshologinsystem.firebaseapp.com",
  projectId: "meeshologinsystem",
  storageBucket: "meeshologinsystem.firebasestorage.app",
  messagingSenderId: "837485523416",
  appId: "1:837485523416:web:be571c049641553ac2c2ad",
  measurementId: "G-28ZX82JHBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);