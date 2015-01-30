/**
 * Dependencies
 */
var utils = require('hoodie-utils-plugins')('image:image');
var log = utils.debug();
var async = require('async');
var AWS = require('aws-sdk');


module.exports = function (hoodie, pluginDb) {
  var Image = this;

  var s3Bucket, config, bucket;

  var _validConfig = function (task, cb) {
    debugger;
    log('_validConfig', task);
    var cfg = hoodie.config.get('aws_config');
    if (!cfg) {
      var default_config = {
        enabled: true,
        settings: {
          region: 'sa-east-1',
          key: 'AKIAIHCKJS3HEZB3IRKA',
          secretKey: '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',
          bucket: 'goappes-image-hoodie-test'
        }
      };

      hoodie.config.set('aws_config', default_config);
      cfg = hoodie.config.get('aws_config');
      //return cb('Cannot get config using `hoodie.config.get()`');
    }

    if (!cfg.enabled)
      return cb('Pls configure/enable the admin image plugin');

    config = {
      accessKeyId: cfg.settings.key,
      secretAccessKey: cfg.settings.secretKey,
      region: cfg.settings.region
    };
    bucket = cfg.settings.bucket;
    AWS.config.update(config);
    s3Bucket = new AWS.S3({ params: {Bucket: cfg.settings.bucket} });
    cb();
  };

  var _validAttrs = function (task, attr, cb) {
    log('_validAttrs', task);
    if (!attr || !task[attr]) {
      return cb('Pls, fill the param: ' + attr);
    }
    cb();
  };

  var _setAcl = function (task, db, cb) {
    log('_setAcl', task);
    var params = {
      Key: task.image.id, /* required */
      ACL: 'public-read',
    };
    s3Bucket.putObjectAcl(params,  cb);
  };

  var _goUpload = function (task, db, cb) {
    log('_goUpload', task);
    var buf = new Buffer(task.image.base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    var data = {
      Key: task.image.id,
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    s3Bucket.putObject(data, function (err, _data) {
      delete task.image.base64;
      task.image.s3 = {};
      task.image.s3.onPut = _data;
      task.image.s3.url = 'https://s3-' + config.region + '.amazonaws.com/' + bucket + '/' + data.Key + '';
      cb(err, _data);
    });
  };

  var _addReference = function (task, db, cb) {
    log('_addReference', task);
    task.image.owner = {
      db: db,
      userId: db.split('/').pop()
    };
    pluginDb.add('image', task.image, cb);
  };

  Image.goUpload = function (db, task, cb) {
    log('goUpload', task);

    async.series([

        async.apply(_validConfig, task),
        async.apply(_validAttrs, task, 'image'),
        async.apply(_validAttrs, task.image, 'base64'),
        async.apply(_validAttrs, task.image, 'id'),
        async.apply(_goUpload, task, db),
        async.apply(_setAcl, task, db),
        async.apply(_addReference, task, db),
      ],
      utils.handleTask(hoodie, 'goUpload', db, task, cb)
    );
  };

  return Image;
};
