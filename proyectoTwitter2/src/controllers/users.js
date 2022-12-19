const ctrl = {}

ctrl.signup = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto 
    res.render('signup');
} 
module.exports = ctrl;