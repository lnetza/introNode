const express = require('express');
const Viaje = require('../models/Viajes');
const router = express.Router();
const Testimonial = require('../models/Testimoniales');

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

    router.get('/testimoniales', (req,res) => {
        res.render('testimoniales',{
            pagina: 'Testimoniales'
        });
    });

    //Insertar en formulario
    router.post('/testimoniales', (req, res) =>{
        //Validar que los campos esten llenos
        let {nombre, correo, mensaje}= req.body;

        let errores = [];
        if(!nombre){
            errores.push({'mensaje':'Agrega tu nombre'})
        }
        if(!correo){
            errores.push({'mensaje':'Agrega tu correo'})
        }
        if(!mensaje){
            errores.push({'mensaje':'Agrega tu mensaje'})
        }

        //Revisar por errores
        if(errores.length>0){
            //Muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo, 
                mensaje
            })
        } else{
            //Alamacena en la BD
            Testimonial.create({
                nombre,
                correo,
                mensaje
            }).then(testimonial => res.redirect('/testimoniales'))
              .catch(error => console.log(error));
        }
    })

    return router;
}