const mongoose = require('mongoose');
const Carritos = require('../../../models/carritos');

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


    //crear un nuevo Carrito
    async createCarrito(car){
        try{
            const newCar= new Carritos(car);
            await newCar.save(); 
            console.log('Carrito creado');
        }catch(error){
            console.log('Error al crear el carrito');
        }
    }

    //obtener todos los carritos
    async getCarritos(){
        try{
            const cars= await Carritos.find();
            console.log(cars);
            return cars;
        }catch(error){
            console.log('Error al obtener los carritos');
        }
    }

    //update un carrito
    async updateCar(id, car,objJson){ //objJson -> Json con claves y vlres a actualizar
        console.log('Actualizando carrito')
        await Carritos.updateOne(objJson)
    }

    async deleteCar(id){
        console.log('Borrando carrito')
        await Usuarios.deleteOne({id:id})
    }
}
const server = new Server();
server.createCarrito({
    "timestamp": "12/12/2021 12:50:25",
    "productos": [{
        "timestamp": "10/17/2022, 12:29:12 AM",
        "nombre": "Hp Ink",
        "descripcion": "Este es una impresora",
        "codigo": "101",
        "imagen": "https://cdn4.iconfinder.com/data/icons/azullustre-mayosoft/AzulLustre_icons/256/Impresora.png",
        "precio": 10500,
        "inventario": 50,
        "id": 2
    }],
    "id": 1
});
server.getCarritos();
server.updateCar();