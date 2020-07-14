const express = require('express');
const router = express.Router();

const Testimonial = require('../models/Testimoniales');
/**COntroladores */
const nosotrosController = require ('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');



module.exports = function(){

    /*Sin usar MVC
        router.get('/nosotros', (req,res) => {
        res.render('nosotros',{
            pagina: 'Sobre nosotros'
        });
    });
    */

    //Página de inicio
    router.get('/', homeController.consultasHomepage);
    
    router.get('/nosotros', nosotrosController.infoNosotros);

    router.get('/viajes', viajesController.mostrarViajes);

    router.get('/viajes/:id', viajesController.mostrarViaje);

    //Muestra todos los testimoniales
    router.get('/testimoniales', testimonialesController.mostrarTestimoniales);

    //Insertar en formulario
    router.post('/testimoniales', testimonialesController.agregarTestimonial);

    return router;
}