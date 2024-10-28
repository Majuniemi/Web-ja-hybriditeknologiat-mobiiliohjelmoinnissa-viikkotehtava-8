// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, serverTimestamp, deleteDoc, doc, onSnapshot } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
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