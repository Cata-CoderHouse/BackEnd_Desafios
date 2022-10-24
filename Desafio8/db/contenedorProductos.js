const {option} = require('./config.js')
const knex = require('knex')(option.sqlite);

class ContenedorProductos{

    constructor(configConnection, tabla){
        this.knex = knex(configConnection);
        this.tabla = tabla;
    }

    async getProducts(){
        try{
            let productos = await this.knex.select('*').from(this.tabla);
            return productos;
        }catch{
            return new Error(`Error ${error}`)
        }
    }


    async getProductoById(id){
        try{
            let producto = await this.knex.select('*').from(this.tabla).where('id',id);
            return producto;
        }catch{
            return new Error(`Error ${error}`)
        }
    }

    async addProducto(producto){
        try{
            let id = await this.knex(this.tabla).insert(producto);
            return id;
        }catch{
            return new Error(`Error ${error}`)
        }
    }


    async updateProduct(id,producto){
        try{
            let id = await this.knex(this.tabla).where('id',id).update(producto);
            return id;
        }catch{
            return new Error(`Error ${error}`)
        }
    }
    

    async deteleteProduct(id){
        try{
            let id = await this.knex(this.tabla).where('id',id).del();
            return id;
        }catch{
            return new Error(`Error ${error}`)
        }
    }
}