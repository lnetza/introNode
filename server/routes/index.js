const express = require('express');
const Viaje = require('../models/Viajes');
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
        Viaje.findAll()
            .then(viajes => res.render('viajes',{
                pagina: 'Próximos Viajes',
                viajes
            }))
            .catch(error => console.log(error))
    });

    router.get('/viajes/:id', (req,res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje',{
                viaje
            }))
            .catch(error => console.log(error));
    });

    return router;
}