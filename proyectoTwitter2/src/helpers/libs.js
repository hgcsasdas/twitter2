const helpers = {};

helpers.randomizer = () =>{
    const posible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let stringAleatorio = 0;
    for (let i=0; i < 6; i++){
        stringAleatorio += posible.charAt(Math.floor(Math.random() * posible.length));
    }
    return stringAleatorio;
}; 

module.exports = helpers;