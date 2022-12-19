//libreria para iniciar sesion, no hemos sido capaces de implementarlo correctamente

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
    usernameField: 'user'
}, async (user, password, done) => {
    const usuario = await User.findOne({name: user});
    if(!usuario) {
        return done(null, false, {message: 'usuario no encontrado'});
    }else {
        const contrasenia = await User.findOne({password: user});
        if(contrasenia) {
            return done(null, user);
        }else{
            return done(null, false, {message: 'contrasenia no encontrado'});
        }

    }
}));

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});