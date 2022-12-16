const path= require('path');
const { randomizer } = require('../helpers/libs');
const fs = require('fs-extra');

const  { Image } = require('../models');
const { url } = require('inspector');
const { fstat } = require('fs');

const ctrl = {}

ctrl.index = async (req, res)=> {
    const image = await Image.findOne({_id: req.params.images_id}).lean();
    console.log(image);
    res.render('image', { image });
};
//Esta función lo que hace es tomar la imagen y procesarla y crearla en la bbdd
ctrl.create = (req, res)=> {
    
    const saveImage = async () => {
        //creamos un nombre aleatorio para la imagen
        const urlImg = randomizer();
        console.log("Estoy dentro");
        //hacemos una comprobación de si ya existe esta "imagen"
        const images = await Image.find({filename: urlImg});
        if (images.length > 0) {
            saveImage();
        }else{

            //ruta de donde está la imagen
            const imageTempPath = req.file.path;
            //extensión del archivo
            const ext = path.extname(req.file.originalname).toLowerCase();
            //a donde queremos mover la imagen y la extensión
            const targetPath = path.resolve(`src/public/upload/${urlImg}${ext}`);
        
            //con esto procesamos si la imagen tiene esta extensión, y si la tiene se empieza a procesar 
            if (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath, targetPath); 
                //creamos un nuevo objeto para el esquema
                const newImg = new Image({
                    title: req.body.title,
                    filename: urlImg + ext,
                    description: req.body.description,
                });
                const imageSave = await newImg.save();
                res.send('works');
            }else{
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solo están permitidas imágenes'});
            }
        }
    };
    saveImage();
};

ctrl.like = (req, res)=> {
    
};

ctrl.comment = (req, res)=> {
    
};

ctrl.remove = (req, res)=> {
    
};

module.exports = ctrl;