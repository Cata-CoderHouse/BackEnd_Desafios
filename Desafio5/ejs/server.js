const express = require('express');
const app = express();
const fs = require('fs');

//para el hbs
app.set('views','./src/views');
app.set('view engine','ejs');

//puerto
const PUERTO=3070;
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

//rutas
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

