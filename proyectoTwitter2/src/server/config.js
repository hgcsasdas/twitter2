const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const session = require('express-session');
const passport = require('passport');

const { dirname } = require('path');
const exp = require('constants');
const errorHandler = require('errorhandler');
require('../config/passport');

//iniciar la aplicacion en un puerto empleando nodemon
module.exports = app => {

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine', '.hbs');

    //middlewares
    app.use(morgan('dev'))
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(session({
        secret: 'mySecret',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //rutas
    routes(app);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //errorhandler
    if ('development' === app.get('env')){
        app.use(errorHandler) 
    }

    return app;
}    