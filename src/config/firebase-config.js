// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB75_lzNWU0iXXRFjzNHC7p76VYqDfsPHE",
  authDomain: "react-app-auth-67d5e.firebaseapp.com",
  projectId: "react-app-auth-67d5e",
  storageBucket: "react-app-auth-67d5e.firebasestorage.app",
  messagingSenderId: "879212267418",
  appId: "1:879212267418:web:071dbf7ef7a20112151c23",
  measurementId: "G-C09C6LZ1CV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

//analytics
const analytics = getAnalytics(app);

//authentication
const auth = getAuth(app);

export { auth, analytics };
