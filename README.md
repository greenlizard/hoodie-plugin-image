hoodie-plugin-image
=======================

[![Build Status](https://travis-ci.org/goappes/hoodie-plugin-image.svg?branch=master)](https://travis-ci.org/goappes/hoodie-plugin-image) [![Dependencies](https://david-dm.org/goappes/hoodie-plugin-image.png)](https://david-dm.org/goappes/hoodie-plugin-image) [![devDependency Status](https://david-dm.org/goappes/hoodie-plugin-image/dev-status.svg)](https://david-dm.org/goappes/hoodie-plugin-image#info=devDependencies) [![Code Climate](https://codeclimate.com/github/goappes/hoodie-plugin-notification/badges/gpa.svg)](https://codeclimate.com/github/goappes/hoodie-plugin-image)

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
### hoodie.image.upload(base64, /*opitional*/meta, /*opitional*/id)
return url
