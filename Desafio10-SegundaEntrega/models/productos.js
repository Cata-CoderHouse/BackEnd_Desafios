class Producto{
    constructor(nombre, descripcion, codigo, imagen, precio, inventario){
        let time = 
        this.timestamp = new Date().toLocaleString();
        this.nombre = nombre || "";
        this.descripcion = descripcion || "";
        this.codigo = codigo || "";
        this.imagen = imagen || "";
        this.precio = precio || 0;
        this.inventario = inventario || 0;
    }
}

module.exports = Producto;