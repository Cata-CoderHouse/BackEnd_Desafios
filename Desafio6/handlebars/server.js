const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const fs = require('fs');
const {Server: IOServer} = require('socket.io'); 
const {Server: HttpServer} = require('http');


//para el hbs
app.set('views','./views');
app.set('view engine','hbs');

//para el websocket
const httpServer=new HttpServer(app); 
const io = new IOServer(httpServer); 

//puerto
const PUERTO=3000;
httpServer.listen(PUERTO,() => {
    console.log('PUERTO listening on port '+PUERTO);
});

//para trabajar con json y formatos
app.use(express.urlencoded({extended: true})); //Esto es para formData
app.use(express.json())

//productos
const contenidoArchivo = fs.readFileSync('./productos.txt', 'utf8', (err, data) => {
    if (err){console.log(err)}
    else {console.log('data cargada')}
});
const productos = JSON.parse(contenidoArchivo);
//console.table(productos);

const messages = [
    { email: "Juan@email.com", texto: "¡Hola! ¿Que tal?" },
    { email: "Pedro@email.com", texto: "¡Muy bien! ¿Y vos?" },
    { email: "Ana@email.com", texto: "¡Genial!" }
 ];


//enlazar hds con el app
app.engine('hbs',hbs.engine({
    extname:'.hbs', // opcional, la extension de los archivos handlerbars
    partialsDir:__dirname+'/views/partials', //estos tres obligatorsos
    layoutsDir:__dirname+'/views/layouts',
    defaultLayout: 'layoutBase.hbs' //cual tomar y que me diga donde incrustar
}));

//cargar los archivos estáticos de public
app.use(express.static('./public'));

app.get('/',(req, res)=>{ 
    //res.render('../public/tablaSocket',{layout:'../partials/formulario'})  
    res.render('partials/formulario',) //El index se incrusta al default:layout1.hbs   
    //res.sendFile(__dirname+'/views/partials/formulario.hbs');
});

app.post('/productos',(req, res)=>{
    let producto=req.body;
    productos.push(producto);
    res.redirect('/productos');
    //console.log(req.body);
    //console.log(productos);
})

//Para usar los sockets desde el lado del servidor
io.on('connection',(socket)=>{
    console.log('Se conectó un cliente');
    socket.emit('mensajes','Bienvenido al servidor');
    //socket.emit('productos',productos);
    // socket.emit('productos',productos);
   socket.emit('envio-productos',{productos: productos});
   socket.emit('envio-productos',{chats: messages});
   socket.on('envio-nuevoProducto',(data)=>{ //recibo e nuevo producto del cliente
        console.log('se recibio nuevo producto') 
        productos.push(data); //inserto el producto a la lista productos
        console.log('productos',productos);
        io.sockets.emit('envio-productos',{productos: data}); //mensaje global a todos los clientes conectados al canal de websocket  
    })

    //Para el chat
    //socket.emit('messages-chat', messages);
    socket.on('new-message', (data) => {
        console.log('Se recibio mensaje desde el cliente',data)
        messages.push(data);
        console.log('messages:',messages);
        io.sockets.emit('envio-productos',{chats: messages}); //mensaje global a todos los clientes conectados al canal de websocket
    })
    //envio al cliente
    
})

    // let tabla = document.getElementById('tabla');
    // tabla.innerHTML = '';
    // data.forEach((producto) => {
    //     tabla.innerHTML += `
    //     <tr>
    //         <td>${producto.title}</td>
    //         <td>${producto.price}</td>
    //         <td>${producto.thumbnail}</td>
    //     </tr>
    //     `
    // });

