var gulp = require('gulp');
var _ = require('lodash');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// Task configuration for delivering development or production versions, refactored in dedicated files
// var baseConfig = require('./conf/base.js');
// var devConfig = _.merge({}, baseConfig, require('./conf/dev.js'));
// var prodConfig = _.merge({}, baseConfig, require('./conf/prod.js'));

// Configuration de base
var baseConfig = {

    source: './src',
    destination: './dist',
    css: {
        autoprefixer: {
            version: ['last 2 version', '> 1%', 'ie 9', 'ie 8']
        }
    },
    js: {
        task: 'js'
    }
};

// Configuration de développement (quand on travaille)
var devConfig = _.merge({}, baseConfig, {
    css: {
        task: 'css:dev',
        name: 'styles.css',
    },
    path: baseConfig.destination + '/assets/css/',
});

// Configuration de production (ce que l'on livre)
var prodConfig = _.merge({}, baseConfig, {
    css: {
        task: 'css:prod',
        name: 'styles.min.css',
    },
    path: baseConfig.destination  + '/assets/css/',
});


/**
 *
 */
gulp.task(devConfig.css.task, function () {
    return gulp.src(devConfig.source + '/assets/css/styles.scss')
        /* ici les plugins Gulp à executer */
        .pipe(sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer.apply(null, devConfig.css.autoprefixer.version))
        .pipe(plugins.csscomb())
        .pipe(plugins.rename(devConfig.css.name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devConfig.path))
        .pipe(browserSync.reload({stream: true}));
});

/**
 *
 */
gulp.task(prodConfig.css.task, function () {
    return gulp.src(prodConfig.source + '/assets/css/styles.scss')
        /* ici les plugins Gulp à executer */
        .pipe(sourcemaps.init())
        .pipe(plugins.plumberNotifier())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer.apply(null, prodConfig.css.autoprefixer.version))
        .pipe(plugins.csso())
        .pipe(plugins.rename(prodConfig.css.name))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(prodConfig.path)
        .pipe(browserSync.reload({stream: true})));
});

/**
 *
 */
gulp.task('js', function () {
    return gulp.src(devConfig.source + '/assets/js/**/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(devConfig.destination + '/assets/js/'))
        .pipe(browserSync.reload({stream: true}));
});


// Static Server + watching scss/html files
gulp.task('serve',function() {

    browserSync.init({
        server: "dist",
        notify: true,
        port: 8001,
        open: "local",
        startPath: "/home.html"
    });

    gulp.watch([devConfig.source + '/assets/css/**/*.scss'], [devConfig.css.task]).on('change', browserSync.reload);
    gulp.watch([devConfig.source + '/assets/js/**/*.js'], [devConfig.js.task]).on('change', browserSync.reload);
    gulp.watch([devConfig.destination + '/index.html']).on('change', browserSync.reload);
});

gulp.task('dev', [devConfig.css.task, devConfig.js.task, 'serve']);
gulp.task('prod', [prodConfig.css.task]);

gulp.task('default', [devConfig.css.task, 'js']);