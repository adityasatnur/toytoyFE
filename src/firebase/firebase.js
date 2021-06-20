import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyClcSD0MfbScrXM-_k3v21ntP7v4EfA3ts",
  authDomain: "toytoy-bd37c.firebaseapp.com",
  databaseURL:
    "https://toytoy-bd37c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "toytoy-bd37c",
  storageBucket: "toytoy-bd37c.appspot.com",
  messagingSenderId: "604912752484",
  appId: "1:604912752484:web:fae96b5a2b269536cc0c71",
  measurementId: "G-LJSY9GDHQN",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});
const signInWithGoogle = () => auth.signInWithPopup(provider);
const signOutFromGoogle = () => auth.signOut();

export {
  storage,
  auth,
  signInWithGoogle,
  signOutFromGoogle,
  firestore,
  firebase as default,
};
