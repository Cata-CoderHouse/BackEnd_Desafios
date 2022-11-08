const {Router} = require('express');
const { readdirSync } = require('fs');
const File = require('../container/File'); //
const Product = require('../models/productos');

const productosRouter = Router();
const controller = new File('productos')

productosRouter.get('/', (req, res) => {
    res.json(controller.getAll());
})
productosRouter.get('/:id', (req, res) => {
    res.json(controller.getById(req.params.id));
})

productosRouter.post('/', (req, res) => {
    let body = req.body;
    let producto = new Product(body.nombre, body.descripcion, body.codigo, body.imagen, body.precio, body.inventario);
    res.json(controller.save(producto));
})

productosRouter.put('/:id', (req, res) => {
    let {id} = req.params;
    let producto = {...req.body, id: parseInt(id)}
    res.json(controller.update(producto));
})

productosRouter.delete('/:id', (req, res) => {
    let {id} = req.params;
    res.json(controller.deleteById(id));
});

module.exports = productosRouter;