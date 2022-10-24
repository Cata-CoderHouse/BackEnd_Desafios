const {option} = require('./config');

const knex = require('Knex')(option.mysql);

knex.schema.createTable('productos',table=>{
    table.increments('id').primary();
    table.timestamp('timestamp');
    table.string('nombre');
    table.string('descripcion');
    table.string('codigo');
    table.string('imagen');
    table.float('precio');
    table.integer('inventario');
})
.then(()=>console.log('Tabla creada'))
.catch((err)=>{console.log(err); throw err})
.finally(()=>{knex.destroy()});

