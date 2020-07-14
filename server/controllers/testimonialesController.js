
const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = (req,res) => {
    Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        }))
}

exports.agregarTestimonial = (req, res) =>{
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
}