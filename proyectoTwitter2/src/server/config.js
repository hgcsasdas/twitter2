const path = require('path');
const exphbs = require('express-handlebars');


const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../public/routes/index');

const { dirname } = require('path');
const exp = require('constants');

module.exports = app => {

    app.set('port', process.env.PORT || 3000);

    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine', 'hbs');

    //middlewares
    app.use(morgan('dev'))
    app.use(multer({dest: path.join(--dirname, '../upload/temp')}).single('image'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //route
    routes(app);

    return app;
}    