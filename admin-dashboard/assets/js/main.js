/*
 * Some portions adapted from https://github.com/hoodiehq/hoodie-plugin-social
 * Other remaining work Copyright 2014 GoAppes
 */

$(function () {

    var hoodieAdmin = top.hoodieAdmin;

    function getConfig(callback) {
      hoodieAdmin.request('GET', '/plugins/'+encodeURIComponent('plugin/hoodie-plugin-image'))
        .fail(function(error) { callback(error); })
        .done(function(response) { callback(null, response); })
    }
    function setConfig(doc, callback) {
      hoodieAdmin.request('PUT', '/plugins/'+encodeURIComponent('plugin/hoodie-plugin-image'), {
        data: JSON.stringify(doc)
      })
        .fail(function(error) { callback(error); })
        .done(function(response) { callback(null, response); })
    }

    function updateConfig(obj, callback) {
        getConfig(function (err, doc) {
            if (err) {
                return callback(err);
            }
            doc.config = _.extend(doc.config, obj);
            setConfig(doc, callback);
        });
    }


    // set initial form values
    getConfig(function (err, doc) {
        if (err) {
          console.log(err)
            return alert(err);
        }

        //set image values
        $('[name=awsEnabledSelect]').find("option[value='" + doc.config.aws_config.enabled + "']").attr("selected","selected").change();
        $('[name=awsRegion]').val(doc.config.aws_config.settings.region);
        $('[name=awsKey]').val(doc.config.aws_config.settings.key);
        $('[name=awsSecretKey]').val(doc.config.aws_config.settings.secretKey);
        $('[name=awsBucket]').val(doc.config.aws_config.settings.bucket);

    });

    //listen for submit button
    $('#submitBtn').on('click', function() {
        $('form').first().submit();
    });

    // save config on submit
    $('.form-horizontal').submit(function (ev) {
        ev.preventDefault();
        var cfg = {
           aws_config: {
               enabled: ($('[name=awsEnabledSelect]').val() === 'true'),
               settings: {
               		region: $('[name=awsRegion]').val(),
                  key: $('[name=awsKey]').val(),
                  secretKey: $('[name=awsSecretKey]').val(),
                  bucket: $('[name=awsBucket]').val()
               }
           }
        };
        updateConfig(cfg, function (err) {
            if (err) {
            	console.log(err)
                return alert(err);
            }
            else {
                alert('Config saved');
            }
        });
        return false;
    });

});
