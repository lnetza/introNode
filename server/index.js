// Importar express
const express = require('express');
const path= require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');

//Probar conexión
//const db = require('./config/database');

/*Probar conexión a la BDD
db.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error));
*/


//Configurar express
const app = express();

//Habilitar pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views',path.join(__dirname,'./views'));

//Cargar carpeta estatica public
app.use(express.static('public')); 

//Validar si estamos en desarrolo o en producción
const config = configs[app.get('env')];

//creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

//Muestra el año actual
app.use((req,res,next)=>{
    //Crear nueva fecha
    const fecha = new Date();
    res.locals.fechaActual= fecha.getFullYear();
    
    return next();
})

//Ejecutamos bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//Cargar las rutas
app.use('/', routes());

app.listen(3000);