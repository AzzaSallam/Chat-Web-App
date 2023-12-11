// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3iGOmT2Zbs_oJ_uUSMAi4Z4EnhziKY68",
    authDomain: "final-chat-fda30.firebaseapp.com",
    projectId: "final-chat-fda30",
    storageBucket: "final-chat-fda30.appspot.com",
    messagingSenderId: "449634309686",
    appId: "1:449634309686:web:f965cba0a035286f73ea97"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {db , storage , auth};