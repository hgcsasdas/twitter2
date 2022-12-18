const path= require('path');
const { randomizer } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

const  { Image, Comment } = require('../models');
const { url } = require('inspector');
const { fstat } = require('fs');
const image = require('../models/image');
const { log } = require('console');

const ctrl = {}

ctrl.index = async (req, res)=> {
    //creamos un objeto viewmodel que se llenará con una imagen y sus comentarios
    const viewModel = {image:{}, comments: {}};
    //llenamos el viewmodel
    const image = await Image.findOne({_id: req.params.images_id}).lean();
    if(image){
        image.views = image.views +1;
        viewModel.image = image;
        //await image.save();
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
            const targetPath = path.resolve(`/public/upload/${urlImg}${ext}`);
        
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
                res.redirect('/images/' + urlImg)
                //res.send('works');
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
        res.json({likes: image.likes});

        res.redirect('/images/' + image._id);
        return;
    }else{
        res.status(500).json({error: 'Error interno'})
    }

};

ctrl.comment = async  (req, res)=> {
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

ctrl.remove = async (req, res)=> {
    const image = await Image.findOne({filename: req.params.image_id});
    if(image){
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteOne({image_id: image_id});
        await image.remove();
        res.json(true)
    }
};

module.exports = ctrl;