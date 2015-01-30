/**
 * Hoodie plugin image
 * Lightweight and easy image
 */

/**
 * Dependencies
 */
var Image = require('./lib');

/**
 * Image worker
 */

module.exports = function (hoodie, callback) {

  var image = new Image(hoodie);

  //hoodie.task.on('imageget:add', image.get);
  hoodie.task.on('cordovaimageupload:add', image.goUpload);


  callback();

};
