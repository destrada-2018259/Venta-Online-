const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        //variables de configuración
        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categorias'
        this.productoPath = '/api/productos'
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.carritoPath = '/api/carrito'
        this.facturaPath = '/api/factura'


    
        //Conectar a la base de datos
        this.conectarDB();

        //middleware
        this.middlewares();

        //rutas de mi app

        this.routes();
    
    }

    //Metodo de conexion a mongo
    async conectarDB(){
        await dbConection();
    }

    middlewares(){

        //cors
        this.app.use(cors());
        this.app.use(express.static('public'));
         //Lectura y parseo del body
         this.app.use( express.json() );
    }

    routes(){
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productoPath, require('../routes/producto'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.carritoPath, require('../routes/carrito'));
        this.app.use(this.facturaPath, require('../routes/factura'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}
module.exports = Server;