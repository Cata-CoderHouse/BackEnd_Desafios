const fs= require('fs');

module.exports = class File {
    constructor(name){
        this.name = `${__dirname}/db/${name}.json`

        try{
            this.elements = fs.readFileSync(this.name, 'utf-8');
            this.elements = JSON.parse(this.elements);
        } catch(err){
            this.elements = []; //No hay nada en el archivo y creo un array vacio
        }
    }

    getAll(){
        return this.elements;
    }

    getById(id){
        try{
            let element = {id};
            this.elements.forEach(elem=>{
                if(element.id==elem.id){
                    element = elem;
                }
            })
            return element;
        }catch(err){
            return err;
        }
    }

    save(element){
        try{
            if(this.elements.length==0){
                element.id=1;
            }else{
                element.id=this.elements.length+1;
            }
            this.elements.push(element);
            fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
            .then(()=>console.log('Archivo guardado'))
            .catch(e=>console.log(e));

            return ({response: 'Elemento guardado', element});
        } catch(err){
            console.log(err);
            return({response: 'Error al guardar el elemento', err});
        }
    }

    update(element){
        try{
            let uno = this.elements.find(elem=>elem.id==element.id);
            console.log(uno)
            let nuevoElemento = {...uno, ...element};

            let indice = this.elements.findIndex((el,ind)=>{
                if(el.id==nuevoElemento.id){
                    return true;
                }
            });
            this.elements[indice] = nuevoElemento;

            fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
            .then(()=>console.log('Elemento actualizado'))
            .catch(e=>console.log(e));

            return ({response: 'Elemento actualizado', element: nuevoElemento});
        }catch(e){
            console.log(e);
            return ({response: 'Error al actualizar el elemento', e});
        }
    }

    delete(){
        fs.truncateSync(this.name, 0, ()=> console.log('Archivo borrado'));
        return({response: 'Archivo borrado'});
    }

    deleteById(id){
        try{
            let index = this.elements.findIndex((el,ind)=>{
                if(el.id==id){return true}
            })

            let element= this.elements.splice(index,1)
            fs.promises.writeFile(this.name, JSON.stringify(this.elements, null, '\t'))
            .then(()=>console.log('Elemento con id ${id} borrado'))
            .catch(e=>console.log(`Error ${e}`));

            return({response: 'Elemento borrado', element});
        }catch(e){
            console.log(e);
            return ({response: 'Error al borrar el elemento, no existe', e});
        }
    }
}