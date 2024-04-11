import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpTozHiHbDtDYRudXQOVe_gPDURUFBzZM",
    authDomain: "fir-27090.firebaseapp.com",
    projectId: "fir-27090",
    storageBucket: "fir-27090.appspot.com",
    messagingSenderId: "949825551723",
    appId: "1:949825551723:web:ae571589cb6a85aa0d202e",
    measurementId: "G-JQSPVH1B1P"
  };

const Firebase = initializeApp(firebaseConfig)
const firestore = getFirestore(Firebase);
const storage = getStorage(Firebase);
export  {Firebase, firestore, storage}