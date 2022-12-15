const ctrl = {}

ctrl.index = (req, res)=> {
    
};
//Esta función lo que hace es tomar la imagen y procesarla y crearla en la bbdd
ctrl.create = (req, res)=> {
    console.log(req.file);
    res.send('funciona');
};

ctrl.like = (req, res)=> {
    
};

ctrl.comment = (req, res)=> {
    
};

ctrl.remove = (req, res)=> {
    
};

module.exports = ctrl;