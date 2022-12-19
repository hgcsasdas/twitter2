const moment = require('moment')
const helpers = {};

 //para convertir la fecha y que el usuario pueda entenderla
helpers.timeago = timestamp =>{
    return moment(timestamp).startOf('minute').fromNow();
};

module.exports = helpers;