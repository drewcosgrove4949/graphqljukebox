'use strict';

console.log('suggestion service');

var lambdaInvoke = require('../utils/lambda-invoke');

exports.retrieveSongSuggestions = function (query, limit) {
console.log('retrieve song suggestion');
console.log(process.env.LAMBDA_SONG_SUGGESTER);
  var params = {
    FunctionName: process.env.LAMBDA_SONG_SUGGESTER,
    Payload: {
      query: query,
      limit: limit
    }
  };
  return lambdaInvoke.invoke(params).then(function (data) {
    return data;
  }).catch(function (err) {
    console.error('ERROR:', err);
    return err;
  });
};