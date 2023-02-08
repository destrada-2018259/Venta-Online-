const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        //variables de configuración
        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categorias'
    
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
    }

    routes(){
        this.app.use(this.categoriaPath, require('../routes/categoria'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}
module.exports = Server;