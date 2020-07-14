const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = (req,res) => {
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
}       