const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = async (req,res) => {
    //Uso de promises para múltiples consultas
    //const promises =[];

    const viajes = await Viaje.findAll({limit: 3});

    const testimoniales = await Testimonial.findAll({limit: 3});

    /* limitado a 3 resultados
    Viaje.findAll({
        limit: 3
    })*/

    //Pasar el promise y ejecutarlo
    //const resultado = Promise.all(promises);

    res.render('index',{
        pagina: 'Próximos Viajes',
        clase: 'home',//Clase de css
        viajes,
        testimoniales
    });    
}       