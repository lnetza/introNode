// Importar express
const express = require('express');
const routes = require('./routes');

//Configurar express
const app = express();

//Cargar las rutas
app.use('/', routes());

app.listen(3000);