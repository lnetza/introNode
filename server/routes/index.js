const express = require('express');
const Viaje = require('../models/Viajes');
const router = express.Router();
const Testimonial = require('../models/Testimoniales');

module.exports = function(){
    //Página de inicio
    router.get('/', (req,res) => {
        //Uso de promises para múltiples consultas
        const promises =[];

        promises.push(Viaje.findAll({
            limit: 3
        }))

        promises.push(Testimonial.findAll({
            limit: 3
        }))

        /* limitado a 3 resultados
        Viaje.findAll({
            limit: 3
        })*/

        //Pasar el promise y ejecutarlo
        const resultado = Promise.all(promises);

        resultado.then(resultado => res.render('index',{
                pagina: 'Próximos Viajes',
                clase: 'home',//Clase de css
                viajes: resultado[0],
                testimoniales: resultado[1]
        }))
        .catch(error => console.log(error))
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

    //Muestra todos los testimoniales
    router.get('/testimoniales', (req,res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales',{
                pagina: 'Testimoniales',
                testimoniales
            }))
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