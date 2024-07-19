// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUlkHm3qYqtBP_0P5QN74sLzRvQDe7lbQ",
  authDomain: "verso-lda.firebaseapp.com",
  databaseURL: "https://verso-lda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "verso-lda",
  storageBucket: "verso-lda.appspot.com",
  messagingSenderId: "467688147873",
  appId: "1:467688147873:web:c8f671f4d499f1f7c0d9e0",
  measurementId: "G-H1BT1XLE7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app)
const analytics = getAnalytics(app);

export {
  app,
  auth,
  analytics
}