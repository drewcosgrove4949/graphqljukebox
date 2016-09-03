'use strict';

var AWS = require('aws-sdk');
var Promise = require('promise');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  
  console.log('bucket in EVENT is'+ event.bucket);
  console.log('data in EVENT is'+ event.data);
  
  var id = new Date().getTime();
  var data = Object.assign({}, event.data, { id: id });
  
  console.log('ID is '+ id);
  console.log('DATA is'+ JSON.stringify(data));
  
  var p = {
    Bucket: event.bucket,
    Key: id + '.json',
    Body: JSON.stringify(data),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  
  console.log('P is '+ JSON.stringify(p));
  
  s3Promise(p, 'upload').then(function (data) {
    console.log('id', data, { id: id.toString() });
    return callback(null, { id: id.toString() });
  }).catch(function (err) {
    console.log('error in s3 upload', err);
    return callback(err);
  });
};

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