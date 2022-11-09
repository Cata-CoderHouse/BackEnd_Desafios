// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, doc, addDoc, getFirestore, getDoc, updateDoc} from 'firebase/firestore'; //Agrego esta linea, getFire.. para consultar la bdd

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
const db = getFirestore();

//create todos los carritos
const cargarBDD= async()=>{
    const promise = await fetch('../../db/carrito.json') //consulto archivo local
    const carritos = await promise.json();
    carritos.forEach(async(car)=>{
        await addDoc(collection(db,"carritos"),{
            fecha: car.timestamp,
            productos: car.productos,
            id:car.id
        })
    })
}

//create un carrito
const createCarrito = async(objCar)=>{
    const estado = await addDoc(collection(db,"carritos"),{
        fecha: objCar.timestamp,
        productos: objCar.productos,
        id:objCar.id
    })
}

const getCarrito = async (id) =>  {
    const carrito = await getDoc(doc(db,"carritos",id));
    const car = [car.id, car.data()];
    return car;
}

const getCarritos = async()=>{
    const carritos = await getDocs(collection(db,"carritos"));
    const car = carritos.docs.map((car)=>{
        return [car.id, car.data()];
    })
    return car;
}

const updateCarrito= async(id, info) => {
    const estado = await updateDoc(doc(db,"carritos",id), info);
    return estado;
}

const deleteCarrito = async(id) =>{
    const estado = await deleteDoc(doc(db,"carritos",id));
    return estado;
}
export {cargarBDD}
