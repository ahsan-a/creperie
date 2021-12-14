import firebase from 'firebase/app';
import 'firebase/firestore';

// @ts-ignore
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };
