var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var User = require("../models/User");
var UserType = require("./object_types/user_type");
var GraphQLString = require("graphql").GraphQLString;
var User = require("../models/User");
var UserType = require("./object_types/user_type");
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var signupMutation = require("./mutations/user").signupMutation;
var loginMutation = require("./mutations/user").loginMutation;
var updateUserMutation = require("./mutations/user").updateUserMutation;

var mutationType = new GraphQLObjectType({
  name: "mutation",
  fields: function() {
    return {
      signup: signupMutation,
      login: loginMutation,
      updateUser: updateUserMutation
    };
  }
});

module.exports = mutationType;
