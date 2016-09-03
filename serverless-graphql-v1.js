'use strict';

console.log("start");
require('env2')('.env');
console.log("env done");
var graphql = require('graphql');
console.log("step 1");
var isEmpty = require('lodash.isempty');
console.log("step 2");
var schema = require('./lib/schema');
console.log("step 3");

exports.handler = function (event, context, callback) {
  console.log('Incoming Event', event);
  // In the introspection query from GraphiQL the variables key is not present in the event body
  var variables = event.variables && !isEmpty(event.variables) ? JSON.parse(event.variables) : {};
  graphql.graphql(schema.root, event.query, null, variables).then(function (data) {
    return callback(null, data);
  }).catch(function (err) {
    return callback(err);
  });
};