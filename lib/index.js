var ImageApi = require('./image');
var Db = require('./db');
var _ = require('lodash');
var utils = require('hoodie-utils-plugins')('image:db');
var ExtendedDatabaseAPI = utils.ExtendedDatabaseAPI;


module.exports = function (hoodie) {

  var image = {};
  var dbPluginName = 'plugins/hoodie-plugin-image';
  var dbPluginProfile = new ExtendedDatabaseAPI(hoodie, hoodie.database('plugins/hoodie-plugin-profile'));
  var pluginDb = new Db(hoodie, dbPluginProfile, dbPluginName);

  _.extend(image,  new ImageApi(hoodie, pluginDb, dbPluginProfile));
//  _.extend(image,  new NetworkApi(hoodie, pluginDb));

  return image;
};
