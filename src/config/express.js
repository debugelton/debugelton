'use strict';
var express        = require('express');
var favicon        = require('serve-favicon');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var compress       = require('compression');
var hbs            = require('express-handlebars');
var glob 	   = require('glob');
var logger	   = require('morgan');

module.exports = function(app, config) {
    var env                    = process.env.NODE_ENV || 'development';
    app.locals.ENV             = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    app.set('view engine', 'hbs');
    app.set('views', config.viewPath);
    app.engine('hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: config.viewPath + '/layouts/',
  partialsDir: config.viewPath + '/partials/'
} ));

    app.use(favicon(config.root + '/app/public/favicons/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/app/public'));

    var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){

        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {error: err.message});
        });

    }
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {error: err.message});
    });
};
