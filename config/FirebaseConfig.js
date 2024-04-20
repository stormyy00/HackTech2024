
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAfO5_K8-wMJhMDnzhwj_X56yhNcpEcMB4",
    authDomain: "moodreal-1c337.firebaseapp.com",
    projectId: "moodreal-1c337",
    storageBucket: "moodreal-1c337.appspot.com",
    messagingSenderId: "489339736078",
    appId: "1:489339736078:web:07d9b124d4c84147c36c5f",
    measurementId: "G-PP94TN9RQ5"
};

console.log("Firebase Config: ", firebaseConfig);
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebase_app); // Use firebase_app instead of app
console.log("Firebase app initialized:", firebase_app);
console.log("Firebase auth instance:", auth);

export { firebase_app, auth, signInWithEmailAndPassword }; // Export both for use in other parts of your app

