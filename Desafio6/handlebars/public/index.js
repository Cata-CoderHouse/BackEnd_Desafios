console.log('Se conectó un cliente');

const socket = io(); //para usar los sockets desde el lado del cliente


//Funcion renderizar y enlazar lista original d eproductos al html
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

//funcion para renderizar chat
function renderChat(data) {
    let historialChat = document.getElementById('chat');
    historialChat.innerHTML = '';
    data.forEach(msjChat => {
        historialChat.innerHTML += `<div>
        <p><strong style="color: blue">${msjChat.email}</strong> [<span style="color: brown">${fecha}</span>]: <i style="color: green">${msjChat.texto}</i></p>
        </div>`
    });
}
//datos de fecha
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
h = n.getHours();
mi = n.getMinutes();
s = n.getSeconds();
const fecha = d+'/'+m+'/'+ y +' '+h+':'+mi+':'+s;


//funcion enviando mensajes chat al servidor
let botonChat=document.getElementById('boton-chat');
botonChat.addEventListener('click',()=>{
    const mensaje = {
        email: document.getElementById('email').value,
        texto: document.getElementById('texto').value
    }
    console.log('Enviando nuevo mensaje al servidor',mensaje)
    socket.emit('new-message', mensaje);
})


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
    console.log(data.productos);
    renderizarProductos(data.productos);
    console.log('Success:', data.productos);
    socket.emit('notificacion', 'Se actualizó la tabla de productos');

    console.log('llegaron los chats al cliente')
    console.log(data.chats);
    renderChat(data.chats);
    console.log('Success:', data.chats);
    socket.emit('notificacion', 'Se actualizó la tabla de productos');
    })





