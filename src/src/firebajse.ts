import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlChBqMNhlztQHyB8tQ1ijqXvwehAEttg",
  authDomain: "tesis2024-64adf.firebaseapp.com",
  projectId: "tesis2024-64adf",
  storageBucket: "tesis2024-64adf.appspot.com",
  messagingSenderId: "516953568799",
  appId: "1:516953568799:web:257621dc28a7eee5d9072a",
  measurementId: "G-FGCS6X9SMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase inicializado correctamente");
const userRef = collection(db, 'Usuarios');
const FinanzasRef = collection(db, 'Finanzas');
const pediaRef = collection(db, 'FichaMedica');
const CitaActualRef = collection(db, 'CitaActual');
const ConfiRef = collection(db, "Settings")
const eventosRef = collection(db, 'Eventos');

export { userRef, FinanzasRef, pediaRef, CitaActualRef, ConfiRef, eventosRef };
export const auth = getAuth();
