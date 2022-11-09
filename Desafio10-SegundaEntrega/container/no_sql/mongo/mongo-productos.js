const mongoose = require('mongoose');
const Productos = require('../../../models/productos');

class Server{
    constructor(){
        this.connect();
    }

connect(){ //async function CRUD( //CRUD();
    try {
        const URL= 'mongodb+srv://catalina:ptyfzmbm@clustercatacocer.9ixky5i.mongodb.net/?retryWrites=true&w=majority'//'mongodb://localhost:27017/ecommerce';
        mongoose.connect(URL, { //await 
            useNewUrlParser: true, 
            useUnifiedTopology: true});
        console.log('Conectado a la base de datos');

        }catch(error){
            console.log('Error al conectar a la base de datos');    
        }
    }


    //crear un nuevo Producto
    async createProducto(prod){
        try{
            const newProd= new Productos(prod);
            await newProd.save(); 
            console.log('Producto creado');
        }catch(error){
            console.log('Error al crear el producto');
        }
    }

    //obtener todos los productos
    async getProductos(){
        try{
            const prods= await Productos.find();
            console.log(prods);
            return prods;
        }catch(error){
            console.log('Error al obtener los productos');
        }
    }

    //update un producto
    async updateProd(id, prod,objJson){ //objJson -> Json con claves y vlres a actualizar
        console.log('Actualizando producto')
        await Productos.updateOne(objJson)
    }

    async deleteProd(id){
        console.log('Borrando producto')
        await Usuarios.deleteOne({id:id})
    }
}
const server = new Server();
server.createProducto({
    "timestamp": "01/17/2022, 12:29:12 AM",
    "nombre": "Canon Camara",
    "descripcion": "Este es una camara",
    "codigo": "105",
    "imagen": "https://cdn4.iconfinder.com/data/icons/48-bubbles/48/25.Camera-Front-256.png",
    "precio": 10500,
    "inventario": 50,
    "id": 2
});
server.getProductos();
server.updateProd();