//Esto te manda a la página de inicio
module.exports = app =>{
    app.get('/', (req, res) =>{
        res.send('index page');
    });
};