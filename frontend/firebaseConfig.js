// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjtmTKvwGiD6UJzRoKB6p-AvXSL729O7k",
    authDomain: "bashalagbeauth.firebaseapp.com",
    projectId: "bashalagbeauth",
    storageBucket: "bashalagbeauth.firebasestorage.app",
    messagingSenderId: "958503574004",
    appId: "1:958503574004:web:8e04e2ba441dfc6ea981a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);