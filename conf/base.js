// Configuration de base
var config = {
    source: './src',
    destination: './dist',
    css: {
        autoprefixer: {
            version: ['last 2 version', '> 1%', 'ie 9', 'ie 8']
        }
    }
};

module.exports = config;