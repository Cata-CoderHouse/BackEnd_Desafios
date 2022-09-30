//const fs = require('fs');
import fs from 'fs';

/*
Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.
*/

export class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo;
    }

    async #leerUnArchivo(rutaArchivo){ // #-> para decir es privado
        try {
            const contenidoArchivo = await fs.promises.readFile(this.rutaArchivo, 'utf8'); // i- leo el archivo
            const contenidoArchivoParseado = JSON.parse(contenidoArchivo);    //ii- parseo porque el archivo es un txt
            return contenidoArchivoParseado;    
        } catch (err) {
            console.log(err);
            return false;           
        }
    }

    async save(obj){ // guarda un objeto en el archivo , devuelve el id asignado
        const contenidoArchivo = await this.#leerUnArchivo(); 
        let idAsign;
        if (contenidoArchivo.length!==0) {
            idAsign = contenidoArchivo[contenidoArchivo.length-1].id+1;
            await fs.promises.writeFile(this.rutaArchivo,JSON.stringify([...contenidoArchivo,{...obj,'id':idAsign}],null,2),'utf-8');
            await console.log(idAsign);
        } else {
            idAsign = 1;
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([{...obj,'id':idAsign}]),'utf-8');  //los tespuntos agregan nuevo contenido luego del existente
            await console.log(idAsign);
        }
    }

    async getById(id){ // busca por id y devuelve el objeto encontrado
        const contenidoArchivo = await this.#leerUnArchivo();  
        let product = {id}
        try {
            for(let obj of contenidoArchivo){
                if(obj.id===id){
                    await console.log(obj);
                    product=obj;
                    return product;                
                }
            }
        } catch (error) {
            return error;
        }        
    }

    async getAll(){ //Idevuelve un array con los objetos presentes en el archivo I
        const contenidoArchivo = await this.#leerUnArchivo();
        console.log(contenidoArchivo);
    }

    async deleteById(id){
        const contenidoArchivo = await this.#leerUnArchivo;
        try {
            for(let obj of contenidoArchivo){
                if(obj.id===id){
                    contenidoArchivo.splice(id);
                }
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteAll(){
        const contenidoArchivo = await this.#leerUnArchivo();
        fs.truncateSync(contenidoArchivo, 0,()=>console.log('Contenido borrado'))

    }
}