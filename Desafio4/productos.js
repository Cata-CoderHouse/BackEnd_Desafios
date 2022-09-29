//importo express y router
const express = require('express');
const {Router} = express;
const fs = require('fs');

//instancio router
const router= Router();

//leo el archivo de productos
const contenidoArchivo = fs.readFileSync('./productos.txt', 'utf8', (err, data) => {
    if (err){console.log(err)}
    else {console.log('data cargada')}
}); 
const productos = JSON.parse(contenidoArchivo);
console.table(productos);

//ruteo de productos
//GET '/api/productos' -> devuelve todos los productos.
 router.get('/',(req,res) => {
    res.send(productos);
 })

 //GET '/api/productos/:id' -> devuelve un producto según su id.
 router.get('/:id',(req,res)=>{
    const {id} = req.params;
    console.log('El id es '+id)
    if(id){
        let producto = productos.find(prod => prod.id==parseInt(id));
        console.log(producto);
        if(producto){
        res.status(200).json({
            mensaje: 'Producto encontrado',
            producto
        })
        } else {
        res.status(400).json({
            mensaje: 'Producto no encontrado'
        })
        }
    }
 })

 //POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/',(req,res)=>{
    const productoGuardar = req.body;
    const idAsign = productos.length;
    console.log('El id asignado es '+idAsign);
    console.log('producto a guardar '+productoGuardar);
    console.log('a guardar '+{productoGuardar, id:idAsign});
    productos.push(productoGuardar);
    res.status(201).send({status: "Producto guardado"});
    res.status(404).send({status: "Producto no encontrado"})
});
//http://localhost:7070/api/productos?nombre=Computador&precio=5000&cantidad=10

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/:id',(req, res) => {
    const {id} = req.params;
    const productoModificar = req.body;
    console.log('El id a modificar es '+id);
    if(id){
        let productoReemplazar = productos.find(prod => prod.id==parseInt(id));
        if(productoReemplazar){
            let indiceAReemplazar = productos.indexOf(productoReemplazar);
            productos[indiceAReemplazar] = productoModificar;
            res.status(200).json({
            mensaje: 'Producto modificado',
            productos
        })
        } else {
        res.status(400).json({
            mensaje: 'Producto no encontrado'
        })
        }
    }
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/api/productos/:id',(req,res) => {
    const {id} = req.params;
    console.log('El id a borrar es '+id);
    res.status(200).json({
        mensaje: 'Producto borrado'})
        /*
    if(id){
        let productoBorrar = productos.find(prod => prod.id==parseInt(id));
        if(productoBorrar){
            let indiceABorrar = productos.indexOf(productoBorrar);
            productos.splice(indiceABorrar,1);
            res.status(200).json({
            mensaje: 'Producto borrado',
            productos
        })
        } else {
        res.status(400).json({
            mensaje: 'Producto no encontrado'
        })
        }
    }
    */
})

 //exporto
module.exports = router;




