import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxe4mub9bpw-Jb1wXscdcX1xL0gePYBoo",
  authDomain: "smarteval-db405.firebaseapp.com",
  databaseURL: "https://smarteval-db405.firebaseio.com",
  storageBucket: "smarteval-db405.appspot.com",
  messagingSenderId: "951970894946",
  appId: "1:951970894946:web:02c0b99a2d1687b99a6d3b",
  measurementId: "G-K8XFS9NR26",
  projectId: "smarteval-db405"
};

export const fire = firebase.initializeApp(firebaseConfig);
