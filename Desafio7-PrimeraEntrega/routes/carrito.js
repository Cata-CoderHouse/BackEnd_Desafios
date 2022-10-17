const {Router} = require('express');
const carrito = require('../models/carrito');
const File = require('../container/File');

const carritoRouter = Router();
const controller = new File('carrito');
const controllerProductos = new File('productos');  
const admin = require('../utils/admin');

carritoRouter.post('/',(req,res)=>{
    let carrito = new Carrito();
    res,json(controller.save(carrito));
})

carritoRouter.delete('/:id',(req,res)=>{
    let {id} = req.params;
    res.json(controller.deleteById(id));
})

carritoRouter.get('/:id/productos',admin,(req,res)=>{
    let {id} = req.params;
    console.log('el id del carritos es'+id);
    let carrito = controller.getById(id);
    if(carrito.productos == undefined){
        res.json({response: 'No carrito encontrado'})
    }else{
        res.json({id:carrito.id, productos: carrito.productos});
    }
})

carritoRouter.post('/:id/productos',admin,(req,res)=>{
    let {id} = req.params;
    let carrito = controller.getById(id);
    let body = req.body.id_prod;

    let producto = body.forEach(id_prod =>{
        let prod = controllerProductos.getById(id_prod);
        carrito.productos.push(prod);
    })

    let response = controller.update(carrito)
    res.json({response: 'Producto adicionado al carrito', carrito: response});
});

carritoRouter.delete('/:id/productos/:id_prod',(req,res)=>{
    let {id, id_prod} = req.params;
    let carrito = controller.getById(id);
    let index = carrito.productos.findIndex((el,ind)=>{
        if(el.id == id_prod) {return true}
    });

    let nuevosProductos = carrito.productos.filter((prod,ind)=>prod.id != id_prod)
    console.log(index, carrito.productos);
    carrito.productos = nuevosProductos;
    let response = controller.update(carrito);
    res.json({response: 'Producto eliminado del carrito', carrito: response});
})

module.exports = carritoRouter;