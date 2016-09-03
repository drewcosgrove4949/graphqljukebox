'use strict';

var AWS = require('aws-sdk');
var Promise = require('promise');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  var params = { Bucket: event.bucket };
  return s3Promise(params, 'listObjects').then(function (data) {
    Promise.all(createS3Promises(data.Contents, event.bucket)).then(function (values) {
      return callback(null, values);
    }).catch(function (err) {
      return callback(err);
    });
  }).catch(function (err) {
    console.log('error in retrieve playlist', err);
    return callback(err);
  });
};

function createS3Promises(objects, bucket) {
  return objects.map(function (obj) {
    var p = { Bucket: bucket, Key: obj.Key };
    return s3Promise(p, 'getObject').then(function (file) {
      return JSON.parse(file.Body.toString());
    }).catch(function (err) {
      console.log('key', obj.key, 'err', err);
    });
  });
}

function s3Promise(params, method) {
  return new Promise(function (resolve, reject) {
    s3[method](params, function (err, data) {
      console.log('err in s3', method, err);
      if (err) return reject(err);
      console.info('incoming data:', data);
      resolve(data);
    });
  });
}