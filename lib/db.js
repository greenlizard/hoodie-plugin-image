var utils = require('hoodie-utils-plugins')('image:db'),
    ExtendedDatabaseAPI = utils.ExtendedDatabaseAPI,
    async = require('async');

module.exports = function (hoodie, dbPluginProfile, dbname) {

  /**
   * Profile _dbname
   */

  var db = new ExtendedDatabaseAPI(hoodie, hoodie.database(dbname));

  /**
   * Profile dbAdd
   */

  var dbAdd = function (hoodie, callback) {
    hoodie.database.add(dbname, function (err) {
      callback(err);
    });
  };

  var addLookupByUserId = function (callback) {

    var index = {
      map: function (doc) {
        if (doc.owner && doc.owner.userId)
          emit(doc.userId, doc._id);
      }
    };

    db.addIndex('by_userId', index, function (err) {
      if (err) {
        return callback(err);
      }

      return callback();
    });
  };

  async.series([
    async.apply(dbAdd, hoodie),
    async.apply(addLookupByUserId)
  ],
  function (err) {
    if (err) {
      console.error(
        'setup db error() error:\n' + (err.stack || err.message || err.toString())
      );
    }
  });

  return db;
};
