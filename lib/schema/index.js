'use strict';

console.log("index");
var graphql = require('graphql');
var suggestionsQuery = require('./query/suggestionsQuery.js').suggestionsQuery;
var playlistQuery = require('./query/playlistQuery.js').playlistQuery;
var addTrackMutation = require('./mutation/addTrackMutation.js').addTrackMutation;
var schema = exports;

console.log("index2");

// The main schema
schema.root = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      suggestions: suggestionsQuery,
      playlist: playlistQuery
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTrack: addTrackMutation
    }
  })
});