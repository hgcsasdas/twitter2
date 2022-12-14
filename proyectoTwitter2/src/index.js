//1.- invocamos express
const express = require('express');
const config = require('./server/config')

//database
require('./database');

//
const app = config(express());

//empezar server
app.listen(app.get('port'), () =>{
    console.log("SERVER RUNNING IN http://localhost:" + app.get('port'));
});
 