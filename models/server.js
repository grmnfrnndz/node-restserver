const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuario: '/api/usuarios',
            categoria: '/api/categoria',
            producto: '/api/producto',
            buscar: '/api/buscar',
            upload: '/api/upload',
        }

        // conectar con la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // parseo y lectura de body
        this.app.use(express.json());

        // Directorio public
        this.app.use(express.static('public'));

        // Filesupload 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));
        
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/user'));
        this.app.use(this.paths.categoria, require('../routes/categoria'));
        this.app.use(this.paths.producto, require('../routes/producto'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.upload, require('../routes/upload'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('corriendo en el puerto', this.port);
        });
    }


}


module.exports = Server;
