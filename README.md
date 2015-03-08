hoodie-plugin-image
=======================

[![Build Status](https://travis-ci.org/greenlizard/hoodie-plugin-image.svg?branch=master)](https://travis-ci.org/greenlizard/hoodie-plugin-image) [![Dependencies](https://david-dm.org/greenlizard/hoodie-plugin-image.png)](https://david-dm.org/greenlizard/hoodie-plugin-image) [![devDependency Status](https://david-dm.org/greenlizard/hoodie-plugin-image/dev-status.svg)](https://david-dm.org/greenlizard/hoodie-plugin-image#info=devDependencies) [![Code Climate](https://codeclimate.com/github/greenlizard/hoodie-plugin-notification/badges/gpa.svg)](https://codeclimate.com/github/greenlizard/hoodie-plugin-image)

## Dependencies
fist of all create a bucket on amazon

before
```shell
  hoodie install hoodie-plugin-image
```
for cordova/phonegap users
```shell
  bower install hoodie-plugin-image
```

## Setup client
```html
 <script src="/_api/_files/hoodie.js"></script>
```
for cordova/phonegap users

```html
  <script src="<bowerdir>/hoodie/dist/hoodie.js"></script>
  <script src="<bowerdir>/hoodie-plugin-image/hoodie.image.js"></script>
```

## API
### upload: function (base64, /*opitional*/ prefix, /*opitional*/ userData)
return url

save ref on data base of plugin
