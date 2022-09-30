/*>> Consigna:  
Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
Ambas páginas contarán con un botón que redirija a la otra.
*/

const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const fs = require('fs');

//para el hbs
app.set('views','./views');
app.set('view engine','hbs');

//puerto
const PUERTO=3000;
app.listen(PUERTO,() => {
    console.log('PUERTO listening on port '+PUERTO);
});

//para trabajar con json y formatos
app.use(express.urlencoded({extended: true})); //Esto es para formData
app.use(express.json())

//productos
const contenidoArchivo = fs.readFileSync('./productos.txt', 'utf8', (err, data) => {
    if (err){console.log(err)}
    else {console.log('data cargada')}
}); 
const productos = JSON.parse(contenidoArchivo);
console.table(productos);

//enlazar hds con el app
app.engine('hbs',hbs.engine({
    extname:'.hbs', // opcional, la extension de los archivos handlerbars
    partialsDir:__dirname+'/views/partials', //estos tres obligatorsos
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout: 'layoutBase.hbs' //cual tomar y que me diga donde incrustar
}));

app.get('/',(req, res)=>{
    res.render('partials/formulario') //El index se incrusta al default:layout1.hbs
})

app.post('/productos',(req, res)=>{
    let producto=req.body;
    productos.push(producto);
    res.redirect('/productos');
    console.log(req.body);
    console.log(productos);
})

app.get('/productos',(req,res)=>{
    res.render('partials/tabla',{productos})
})
