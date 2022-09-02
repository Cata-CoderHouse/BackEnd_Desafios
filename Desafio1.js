//Desafio #1
//Maria Catalina Hernandez Casas
//cataxto@gmail.com


class Usuario
{
    constructor(nombre, apellido, libros, mascotas)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }

    getFullName()
    {
        return this.nombre+" "+this.apellido;
    }

    addMascota(pMascota)
    {
        this.mascotas.push(pMascota);
    }


    countMascotas()
    {
        return this.mascotas.length;
    }

    addBook(pNombre, pAutor)
    {
        let obj={'nombre':pNombre,'autor':pAutor}
        this.libros.push(obj);
    }


    getBookNames()
    {
        let nombres=[]
        for (let i = 0; i < this.libros.length; i++) {
            nombres.push(this.libros[i].nombre)
        };
        return nombres;
    }
}

usuario = new Usuario("Cata","Hernandez",[{'nombre':'n1','autor':'l1'},{'nombre':'n2','autor':'l2'}],['m1','m2'])
console.log(usuario.getFullName());
console.log(usuario.countMascotas());
usuario.addMascota('m3')
console.log(usuario.countMascotas());
console.log(usuario.addBook({'nombre':'n3','autor':'l3'}));
console.log(usuario.getBookNames());
