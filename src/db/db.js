import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyCHPJzoS2Yc8uYOhD-farkBvVp3z8KXKp4",
    authDomain: "c-notes-backend.firebaseapp.com",
    projectId: "c-notes-backend",
    storageBucket: "c-notes-backend.appspot.com",
    messagingSenderId: "576339172611",
    appId: "1:576339172611:web:807bb5bb269e44f92a9d36"
};

const fb = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = fb.auth();
export const firebaseFirestore = fb.firestore();
export const firebaseGoogle = new firebase.auth.GoogleAuthProvider();
export const firebaseFacebook = new firebase.auth.FacebookAuthProvider();