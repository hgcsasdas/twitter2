const ctrl = {}

const { Image } = require('../models');

ctrl.index = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto 
    const images = await Image.find().sort({timestamp:-1}).lean({ virtuals: true });
    res.render('index', {images});
} 

module.exports = ctrl;