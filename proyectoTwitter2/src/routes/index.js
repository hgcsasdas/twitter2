const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const users = require('../controllers/users');

//rutas de acceso
module.exports = app =>{

    router.get('/', home.index);

    router.get('/login', users.loginGo);
    router.post('/login', users.login);

    router.get('/signup', users.signupGo);
    router.post('/signup', users.signup);

    router.get('/images/:images_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.remove);

    app.use(router);
};