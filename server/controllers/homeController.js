const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = async (req,res) => {
    //Uso de promises para múltiples consultas
    //const promises =[];

    const viajes = await Viaje.findAll({limit: 3});

    const testimoniales = await Testimonial.findAll({limit: 3});

    

    res.render('index',{
        pagina: 'Próximos Viajes',
        clase: 'home',//Clase de css
        viajes,
        testimoniales
    })    
}       