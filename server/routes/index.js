const express = require('express');
const router = express.Router();

module.exports = function(){
    router.get('/', (req,res) => {
        res.render('index');
    });
    
    router.get('/nosotros', (req,res) => {
        res.render('nosotros',{
            pagina: 'Sobre nosotros'
        });
    });

    router.get('/viajes', (req,res) => {
        //Aqui leé la carpeta viajes
        res.render('viajes',{
            pagina: 'Próximos Viajes'
        });
    });

    return router;
}