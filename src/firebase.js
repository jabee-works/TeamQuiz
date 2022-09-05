// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Kw91wkyMjz3gw3dOuuGIEmvbj5M7r5U",
  authDomain: "teamquiz-1be2f.firebaseapp.com",
  projectId: "teamquiz-1be2f",
  storageBucket: "teamquiz-1be2f.appspot.com",
  messagingSenderId: "496182497218",
  appId: "1:496182497218:web:d9171d6896c462093c905b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp