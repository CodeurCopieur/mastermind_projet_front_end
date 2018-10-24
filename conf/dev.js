// Configuration de développement (quand on travaille)
var baseConfig = require('./base');

var config = {
    css: {
        task: 'css:dev',
        name: 'styles.css',
    },
    destination: baseConfig.destination,
    path: this.destination + '/assets/css/',
};

module.exports = config;