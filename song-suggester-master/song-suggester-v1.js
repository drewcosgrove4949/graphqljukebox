'use strict';

require('env2')('.env');
var fetch = require('isomorphic-fetch');
var apiRoot = 'http://ws.audioscrobbler.com/2.0/';
var apiKey = process.env.API_KEY;
//var apiKey = 'c2d4bcff70f24b8427921fde76555910';

exports.handler = function (event, context, callback) {

console.log('song suggester started');
console.log('API KEY is ' + apiKey);

  var max = event.limit ? event.limit : 10;
  var query = event.query;
  
  console.log(query);
  
 var url = apiRoot + '?method=track.search&track=' + query + '&limit=' + max + '&api_key=' + apiKey + '&format=json';
  
 // var url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track="stronger"&limit=&api_key=c2d4bcff70f24b8427921fde76555910&format=json';
  
  console.log(url);
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log('MATCHED TRACKS', JSON.stringify(json));
    if (json.results && json.results.trackmatches.track.length > 0) {
      var suggestions = json.results.trackmatches.track.map(function (track) {
        return {
          name: track.name,
          artist: track.artist,
          url: track.url,
          imageUrl: track.image[1]['#text']
        };
      });
      return callback(null, suggestions);
    } else {
      return callback(null, []);
    }
  }).catch(function (err) {
    console.log('Err retreiving song suggestions', err);
    return callback(err);
  });
};