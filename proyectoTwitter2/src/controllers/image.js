const path= require('path');
const { randomizer } = require('../helpers/libs');
const fs = require('fs-extra');
const  { Image, Comment } = require('../models');
const md5 = require('md5');

const { url } = require('inspector');
const { fstat } = require('fs');
const { db } = require('../models/image');

const ctrl = {}

ctrl.index = async (req, res)=> {
   //creamos un objeto viewmodel que se llenará con una imagen y sus comentarios
   const viewModel = {image:{}, comments: {}};
   //llenamos el viewmodel
   const image = await Image.findOne({_id: req.params.images_id}).lean();
   if(image){
        const updatedImage = await Image.findOneAndUpdate(
            { _id: image._id },
            { $inc: { views: 1 } }
        ).lean();
        viewModel.image = updatedImage;

       const comments = await Comment.find({image_id: image._id}).lean();
       viewModel.comments = comments;
       res.render('image', viewModel);
   }else{
       //si la imagen no existe, redirigimos a la pagina principal
       res.redirect('/');
   }
    
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
                res.redirect('/images/' + newImg._id);
            }else{
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Solo están permitidas imágenes'});
            }
        }
    };
    saveImage();
};

ctrl.like = async (req, res)=> {
    const image = await  Image.findOne({filename: req.params.image_id})
    if(image){
        image.likes = image.likes +1;
        await image.save();
        res.json({likes: image.likes})
    } else{
        res.status(500).json({error: 'Error interno'})
    }
};

ctrl.comment = async (req, res)=> {
    //guardar comentarios
    const image = await Image.findOne({_id: req.params.image_id}).lean();
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.comment = req.body.coment;
        newComment.image_id = image._id;
        await newComment.save()
        res.redirect('/images/' + image._id);
    }else{
            //si el comentario no existe, redirigimos a la pagina principal
        res.redirect('/');
    }
};

/*No funciona la funcion remove, error: TypeError: img.remove is not a function*/
ctrl.remove = async (req, res)=> {
    const image = await Image.findOne({_id: req.params.image_id}).lean();
    if(image){
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename ));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
        res.send("The object has been deleted!")
    }
};

async function el(img){
    await img.remove();
}

module.exports = ctrl;