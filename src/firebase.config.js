import { initializeApp } from "firebase/app";
import { getFireStore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD-CPNS0MfT6A7qP4ghldlACx1nkZDsgUQ",
  authDomain: "mx48live-house-marketplace.firebaseapp.com",
  projectId: "mx48live-house-marketplace",
  storageBucket: "mx48live-house-marketplace.appspot.com",
  messagingSenderId: "992972747908",
  appId: "1:992972747908:web:a08d26a6d3581b3a9b7ed1"
};

initializeApp(firebaseConfig)

export const db = getFireStore()
