import express from 'express';
const app = express();

import {Contenedor} from './Contenedor.js';
let products = new Contenedor('./productos.txt');

/*
>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/

//1 puerto
const PORT = 8080;
app.listen(PORT, ()=>console.log('El servidor esta escuchando en puerto 8080'))

app.get('/',(req,res)=>{
    res.send('Desafio #3');
})

//2 Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
app.get('/products',(req,res)=>{
    res.json(products.getAll())
})

//3 Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
app.get('/productoRandom',(req,res)=>{
    let tamanioArr = products.tamanio();
    let IdRandom= Math.floor(Math.random()*tamanioArr+1);
    res.json(products.getById(IdRandom))
})
