var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var BookModel = require("../../models/User");

var authenticationType = new GraphQLObjectType({
  name: "authentication",
  fields: function() {
    return {
      token: {
        type: GraphQLString
      }
    };
  }
});

module.exports = authenticationType;
