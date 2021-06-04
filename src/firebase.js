import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCzOhEhSeWzqNxfHgcIFCZIJjdqVFt_f3k",
  authDomain: "pronostiek2021.firebaseapp.com",
  projectId: "pronostiek2021",
  storageBucket: "pronostiek2021.appspot.com",
  messagingSenderId: "142060530228",
  appId: "1:142060530228:web:7efd75f02c53c85efa3861",
  measurementId: "G-ERQDR8XKBJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

export const querySnapshotToData = (qs) => {
  const array = [];
  qs.forEach((q) => array.push({ ...q.data(), id: q.id }));
  return array;
};

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
