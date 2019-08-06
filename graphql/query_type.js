var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLDate = require("graphql-date");
var User = require("../models/User");
var UserType = require("./object_types/user_type");

var queryType = new GraphQLObjectType({
  name: "query",
  fields: function() {
    return {
      current_user: {
        type: UserType,

        resolve: (parentValue, args, request) => {
          return request.user;
        }
      },
      user: {
        type: UserType,
        args: {
          _id: {
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve: function(root, params) {
          console.log(params._id);
          const user = User.findById(params._id).exec();
          if (!user) {
            throw new Error("Error");
          }
          return user;
        }
      },
      users: {
        type: GraphQLList(UserType),
        resolve: function() {
          return User.find().exec();
        }
      }
    };
  }
});

module.exports = queryType;
