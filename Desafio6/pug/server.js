const express = require('express');
const app = express();
const fs = require('fs');

//para el hbs
app.set('views','./src/views');
app.set('view engine','pug');

//puerto
const PUERTO=3030;
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

//enrutas las direcciones
app.get('/',(req, res)=>{
    res.render('formulario',{render:true}) //El index se incrusta al default:layout1.hbs
})

app.post('/productos',(req, res)=>{
    let producto=req.body;
    productos.push(producto);
    res.redirect('/productos');
    console.log(req.body);
    console.log(productos);
})

app.get('/productos',(req,res)=>{
    res.render('tabla',{productos,foto:productos.foto,render:false})
})
