import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDi8Qw6OhLnRGzO_4kxTtvE8bpJxc4oQqc",
  authDomain: "begamesmall.firebaseapp.com",
  databaseURL: "https://begamesmall-default-rtdb.firebaseio.com",
  projectId: "begamesmall",
  storageBucket: "begamesmall.firebasestorage.app",
  messagingSenderId: "597503734142",
  appId: "1:597503734142:web:6558a9793e08d74665832f",
  measurementId: "G-RWLCN42H05"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };