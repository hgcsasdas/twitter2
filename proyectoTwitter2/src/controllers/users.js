const ctrl = {}
const User = require('../models/user');

ctrl.signup = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto 
    const user = req.body.user;
    const password = req.body.password;

    const newUser = new User({name: user,password: password});
    await newUser.save();
    res.redirect('/login');
} 
ctrl.login = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto
    const user = req.body.user;
    const password = req.body.password;
    const usuario = await User.findOne({name: user,password: password})
    if(usuario){
        res.redirect('/');
    }else{
        res.redirect('/login');
    }
} 
ctrl.loginGo = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto 
    res.render('login');
} 
ctrl.signupGo = async (req, res) =>{
    //sort lo que hace es buscar por los datos del objeto 
    res.render('signup');
} 
module.exports = ctrl;