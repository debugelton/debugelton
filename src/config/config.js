'use strict';
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000
  },

  test: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000
  },

  production: {
    root: rootPath,
    viewPath: rootPath + '/app/views',
    app: {
      name: 'app'
    },
    port: process.env.PORT || 3000
  }
};

module.exports = config[env];
