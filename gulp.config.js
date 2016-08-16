module.exports = function() {

    var client = './src/';
    var clientApp = client + 'app/';
    var temp = './devBuild/';

    var config = {

        /*** file path ****/
        temp: temp,
        alljs: ['./src/**/*.js', './*.js'],
        sass: client + 'sass/**/*.scss',
        index: client + 'index.html',
        //css: temp + 'styles.css',
        cssTemplates: client + 'sass/admin-scss/*.css',
        html: clientApp + '**/*.html',

        /*** temp files ***/
        css: 'styles.css',
        cssSrc: temp + 'css/styles.css',
        js: 'app.js',
        jsSrc: temp + 'js/app.js',
        img: temp + 'img/',
        imgSrc: client + 'img/**/*.*',
        fontSrc: client + 'fonts/**/*.*',
        font: temp + 'fonts/',

        /*** Bower and NPM locations ***/
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /*** template cache ***/
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'app/'
            },
            src: temp + 'js/templates.js'
        }

    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};