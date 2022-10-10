console.log('Se conectó un cliente');

const socket = io(); //para usar los sockets desde el lado del cliente


//Funcion enlazar lista original d eproductos al html
function renderizarProductos(listaProd){
    console.log('renderizando data de productos')
    let mensaje = document.getElementById('msjNoPdctos');
    mensaje.innerHTML='';
    let tablaP= document.getElementById('tablaP')
    tablaP.innerHTML = ''; //borrar lo anterior
    tablaP.innerHTML = `<tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Foto</th>
                    </tr>`
                listaProd.forEach(prod=>{
                nuevoArreglo = `<tr>
                    <td>${prod.nombre}</td>
                    <td>${prod.cantidad}</td>
                    <td>${prod.precio}</td>
                    <td> <img src="${prod.foto}" style="width: 7vw; min-width: 70px;" alt="foto de {{nombre}}"></td>
                </tr>`;
                tablaP.innerHTML += nuevoArreglo});
}


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
    renderizarProductos(data);
    console.log('Success:', data);
    socket.emit('notificacion', 'Se actualizó la tabla');
    })


// //Para el chat

//datos de fecha
n =  new Date();
// y = n.getFullYear();
// m = n.getMonth() + 1;
// d = n.getDate();

//funcion enviando mensajes
let botonChat=document.getElementById('boton-chat');
botonChat.addEventListener('click',()=>{
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);
})

//funcion para renderizar
function renderChat(data) {
    let historialChat = document.getElementById('chat');
    historialChat.innerHTML = 'Hola';
    data.forEach(msjChat => {
        console.log('mensaje de chat',msjChat);
        historialChat.innerHTML += `<div>
        <strong>${msjChat.email}</strong>:
        <p>${msjChat.texto}</p>
        </div>`
    });
}

//funcion para recibir por el sockets
socket.on('messages-chat', (data) => {
    console.log('mensajes chat en el cliente',data);
    renderChat(data);
})


