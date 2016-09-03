'use strict';

console.log("addtrackmutations");

var graphql = require('graphql');
var playlistService = require('../../services/playlistService.js');

var newTrackId = new graphql.GraphQLObjectType({
  name: 'SearchResultId',
  description: 'Search result id schema',
  fields: function fields() {
    return {
      id: {
        type: graphql.GraphQLString,
        description: 'Id of the track in the db'
      }
    };
  }
});

var addTrackMutation = {
  name: 'AddTrackMutation',
  description: 'Add a track to the playlist and get an id back',
  type: newTrackId,
  args: {
    name: {
      type: graphql.GraphQLString
    },
    artist: {
      type: graphql.GraphQLString
    },
    url: {
      type: graphql.GraphQLString
    },
    imageUrl: {
      type: graphql.GraphQLString
    }
  },
  resolve: function resolve(_, parentArgs, args) {
    return playlistService.addTrack(args);
  }
};

exports.addTrackMutation = addTrackMutation;