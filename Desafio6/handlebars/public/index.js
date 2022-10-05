const socket = io(); //para usar los sockets desde el lado del cliente

//Recibir a informacion del servidor para ver la tabla acualizada
socket.on('productos', (data) => {
    console.log(data);
    alert(data);
    socket.emit('notificacion', 'Se actualizó la tabla');
    //Sustraer la informacion del nuevo producto en el formulario
    let nombreProd = document.getElementById('nombre');
    let cantidadProd = document.getElementById('cantidad');
    let precioProd = document.getElementById('precio');
    let fotoProd = document.getElementById('foto');
    //Crear un objeto json con la informacion del nuevo producto
    let nuevoProducto = {nombre:nombreProd,cantidad:cantidadProd,precio:precioProd,foto:fotoProd};
    socket.emit('nuevoProducto', nuevoProducto); //envio el nuevo producto al servidor
})