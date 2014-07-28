/*jshint node: true*/
'use strict';

var argv = require('yargs').argv;
var merge = require('lodash.merge');

/**
 *
 * @param {Object} config A config object containing data for each environment. For example:
 *
 * default: {   // Default is required and contains all common data
 *   port: 8888
 * },
 * development: { // contains data that will override the default values for the development environment
 *    port: 8000
 * },
 * production: { // contains data that will override the default values for the production environment
 *    port: 8001
 * }
 */
module.exports = function parseEnv(config) {
  return merge({}, config.default, config[process.env.NODE_ENV], argv.overrides, function mergeVerify(a, b) {
    return Array.isArray(a) ? b : undefined;
  });
};
