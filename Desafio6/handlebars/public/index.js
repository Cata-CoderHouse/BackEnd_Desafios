console.log('Se conectó un cliente');

const socket = io(); //para usar los sockets desde el lado del cliente


//Enviar el nuevo producto al servidor
let boton=document.getElementById('boton');
boton.addEventListener('click',()=>{
    //Sustraer la informacion del nuevo producto en el formulario
    let nombreProd = document.getElementById('nombre').value;
    let cantidadProd = document.getElementById('cantidad').value;
    let precioProd = document.getElementById('precio').value;
    let fotoProd = document.getElementById('foto').value;
    //Crear un objeto json con la informacion del nuevo producto
    let nuevoProducto = {nombre:nombreProd,cantidad:cantidadProd,precio:precioProd,foto:fotoProd};
    console.log('nuevoProducto: ',nuevoProducto);
    socket.emit('envio-nuevoProducto', nuevoProducto); //envio el nuevo producto al servidor
})

//Recibir a informacion del servidor para ver la tabla acualizada
socket.on('envio-productos', (data) => {
    console.log('llegaron los productos al cliente');
    console.log(data);
    let nuevoArreglo;
    let tablaP= document.getElementById('tablaP')
    tablaP.innerHTML = '';
            data.forEach(prod=>{
                nuevoArreglo = `<tr>
                    <td>${prod.nombre}</td>
                    <td>${prod.cantidad}</td>
                    <td>${prod.precio}</td>
                    <td> <img src="${prod.foto}" style="width: 7vw; min-width: 70px;" alt="foto de {{nombre}}"></td>
                </tr>`

                tablaP.innerHTML += nuevoArreglo;
            })
            
            console.log('Success:', data);
    socket.emit('notificacion', 'Se actualizó la tabla');
    })
