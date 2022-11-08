const express = require('express');
const carritoRouter = require('./routes/carrito');
const productsRouter = require('./routes/productos');

const app = express(); //instanciar express
const PORT = process.env.PORT || 8080;

app.use(express.json()); //para interactuar con el front
app.use(express.urlencoded({ extended: true })); //para interactuar con el front

//Dos conjunto de rutas para productos y carrito
app.use('/api/productos',productsRouter); //usar set de rutas para productos
app.use('/api/carrito',carritoRouter);; //usar set de rutas para carrito

//Listen del puerto
app.listen(PORT,()=>console.log(`Server on Port ${PORT}`))

