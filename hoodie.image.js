/**
 * Hoodie plugin image
 * Lightweight and easy image
 */

/* global Hoodie */

Hoodie.extend(function (hoodie) {
  'use strict';

  var guid = (function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    }
    return function () {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
    };
  })();

  hoodie.image = {

    upload: function (base64, /*opitional*/ prefix, /*opitional*/ userData) {

      prefix = prefix || '';
      prefix = prefix + guid();
      var defer = window.jQuery.Deferred();
      if (!base64)
        defer.reject(new Error({message: 'the image is empty'}));
      defer.notify('upload', arguments, false);
      var task = {
        image: {
          base64: base64,
          id: prefix,
          userData: userData
        }
      };
      hoodie.task('cordovaimageupload').start(task)
        .then(defer.resolve)
        .fail(defer.reject);
      return defer.promise();
    }

  };

  function out(name, obj, task) {
    if (window.debug === 'image') {
      var group = (task) ? 'task: ' + task + '(' + name + ')': 'method: ' + name;

      console.groupCollapsed(group);
      if (!!obj)
        console.table(obj);
      console.groupEnd();
    }
  }

  if (window.debug === 'image') {
    hoodie.task.on('start', function () {
      out('start', arguments[0], arguments[0].type);
    });

    // task aborted
    hoodie.task.on('abort', function () {
      out('abort', arguments[0], arguments[0].type);
    });

    // task could not be completed
    hoodie.task.on('error', function () {
      out('error', arguments[1], arguments[1].type);
    });

    // task completed successfully
    hoodie.task.on('success', function () {
      out('success', arguments[0], arguments[0].type);
    });
  }

});
