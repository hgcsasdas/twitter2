//Esto lo que hace es una utilización de la librería 
//de mongoose para guardarlo en una constante y poder utilizarla cuando quieras
const mongoose = require('mongoose');
//esto utiliza la conexión
const { database } = require('./keys');

mongoose.set('strictQuery', true)

mongoose.connect(database.URI, {
    useNewUrlParser: true,
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));