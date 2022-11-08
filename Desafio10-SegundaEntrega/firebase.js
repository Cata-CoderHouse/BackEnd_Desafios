// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, doc, addDoc, getFirestore} from 'firebase/firestore'; //Agrego esta linea, getFire.. para consultar la bdd

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS-jZbLCOm8nxfyvefF8d2WQMzJ68iwzo",
  authDomain: "after-firebase-31b70.firebaseapp.com",
  projectId: "after-firebase-31b70",
  storageBucket: "after-firebase-31b70.appspot.com",
  messagingSenderId: "687616277756",
  appId: "1:687616277756:web:2b3f366c43726089d4ab79",
  measurementId: "G-X4WVLKFB60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Agrego esta funcion

const db = getFirestore();

const cargarBDD= async()=>{
    const promise = await fetch('./json/productos.json') //consulto archivo local
    const productos = await promise.json();
    productos.forEach(async(prod)=>{
        await addDoc(collection(db,"productos"),{
            fecha: prod.timestamp,
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            codigo: prod.codigo,
            imagen:prod.imagen,
            precio: prod.precio,
            inventario: prod.inventario
            
        })
    })
}

export {cargarBDD}
