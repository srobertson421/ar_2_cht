import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBI6EJA2eFyoJo7HghiWvEiK69vAUuqbZI",
  authDomain: "chtdb-73b85.firebaseapp.com",
  databaseURL: "https://chtdb-73b85.firebaseio.com",
  projectId: "chtdb-73b85",
  storageBucket: "chtdb-73b85.appspot.com",
  messagingSenderId: "448889081503",
  appId: "1:448889081503:web:539dffa79f849abeabdcaa"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence()
.catch(function(err) {
  if (err.code === 'failed-precondition') {
    console.log(err);
  } else if (err.code === 'unimplemented') {
    console.log(err);
  }
});

export const db = firebase.firestore();
export const auth = firebase.auth();