/*
Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
*/


//Importo e instancio los módulos
const express= require('express');
const productos = require('./productos');
const app = express();

app.use(express.json())//middleware para para poder leer archivos tipo json
app.use(express.urlencoded({extended:true}))//codificar data que llega desde el body

//Declaró el puerto
const PORT=7070;
app.listen(PORT,()=>{
    console.log('listening on port '+PORT);
});

//renderizar el middleware en productos.js
app.use('/api/productos',productos)


