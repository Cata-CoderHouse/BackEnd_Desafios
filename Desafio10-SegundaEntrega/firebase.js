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

//create todos los productos
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

//create un producto 
const createProducto = async(objProd)=>{
    const estado = await addDoc(collection(db,"productos"),{
        fecha: objProd.timestamp,
        nombre: objProd.nombre, 
        descripcion: objProd.descripcion,
        codigo: objProd.codigo,
        imagen:objProd.imagen,
        precio: objProd.precio,
        inventario: objProd.inventario
    })
}

const getProducto = async (id) =>  {
    const producto = await getDoc(doc(db,"productos",id));
    const prod = [producto.id, producto.data()];
    return prod;
}

const getProductos = async()=>{
    const productos = await getDocs(collection(db,"productos"));
    const prod = productos.docs.map((prod)=>{
        return [prod.id, prod.data()];
    })
    return prod;
}

const updatProducto = async(id, info) => {
    const estado = await updateDoc(doc(db,"productos",id), info);
    return estado;
}

const deleteProducto = async(id) =>{
    const estado = await deleteDoc(doc(db,"productos",id));
    return estado;
}
export {cargarBDD}
