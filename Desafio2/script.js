import {Contenedor} from './Contenedor.js';
let contenedor1 = new Contenedor('./datos.txt');

//Punto 1: guardar un objeto en el contenedor
//Se define el objeto a guardar
let objAGuardar = {'nombre': 'Product1','precio':5000,'cantidad':20};
//Impresion del objeto
console.log('Objeto a guardar:'+JSON.stringify(objAGuardar));
const idGuardado = contenedor1.save(objAGuardar);
console.log('El id del objeto guardado es: '+idGuardado);

//Punto 2: Traer un objeto para un id dado
console.log('El objeto con id 2 es: '+contenedor1.getById(2));

//Punto 3: Traer todos los objetos del json del contenedor
console.log('Todos los elementos del contenedor son: \n'+contenedor1.getAll());

//Punto 4: Borrar un objeto por id del objeto
console.log('Borro objeto con id i'+contenedor1.deleteById(1));
console.log('Todos los elementos del contenedor son: \n'+contenedor1.getAll());

//Punto 5: borro todos los registros del archivo
//contenedor1.deleteAll()
console.log('Todos los elementos del contenedor son: \n'+contenedor1.getAll());

// const traerApi = async () =>{
//     try {
//         const resp = await fetch('https://api-dolar-argentina.herokuapp.com/api/dolaroficial')
//         const respParseada = await resp.json()
//         console.log(respParseada)
//         console.log(respParseada.compra)
//     } catch (err) {
//         console.log(err)
//     }
// }

// traerApi()