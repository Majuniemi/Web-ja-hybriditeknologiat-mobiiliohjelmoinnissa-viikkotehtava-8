// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, serverTimestamp, deleteDoc, doc, onSnapshot } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD5eVRvbzSmSk85Ld9IHyA0RgC1B1pQ98",
    authDomain: "web-hybrid-firebase-demo.firebaseapp.com",
    projectId: "web-hybrid-firebase-demo",
    storageBucket: "web-hybrid-firebase-demo.appspot.com",
    messagingSenderId: "670045058856",
    appId: "1:670045058856:web:c817d2534986b9fa08421d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const firestore = getFirestore(app)

const SHOPPING_LIST = 'shopping-list'

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    deleteDoc,
    doc,
    onSnapshot,
    SHOPPING_LIST
}