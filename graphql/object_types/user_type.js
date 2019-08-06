var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLFloat = require("graphql").GraphQLFloat;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var BookModel = require("../../models/User");

var userType = new GraphQLObjectType({
  name: "user",
  fields: function() {
    return {
      _id: {
        type: GraphQLInt
      },
      email: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      x_coordinate: {
        type: GraphQLFloat
      },
      y_coordinate: {
        type: GraphQLFloat
      }
    };
  }
});

module.exports = userType;
