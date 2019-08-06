var GraphQLID = require("graphql").GraphQLID;
var GraphQLFloat = require("graphql").GraphQLFloat;
var UserType = require("../object_types/user_type");
var GraphQLString = require("graphql").GraphQLString;
var User = require("../../models/User");
var authenticationType = require("../object_types/authentication_type");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var GraphQLNonNull = require("graphql").GraphQLNonNull;

var signupMutation = {
  type: authenticationType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async function(root, params) {
    var users = await User.find({
      email: params.email
    }).exec();
    console.log(user);
    if (users.length) {
      throw new Error("User already exist with that email");
    }
    var user = new User({
      name: params.name,
      email: params.email,
      password: await bcrypt.hash(params.password, 10)
    });
    console.log(user);
    await user.save(err => {});
    return {
      token: jsonwebtoken.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      )
    };
  }
};

var loginMutation = {
  type: authenticationType,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async function(root, params) {
    var user = await User.findOne({
      email: params.email
    }).exec();
    const valid = await bcrypt.compare(params.password, user.password);

    console.log(valid);
    if (!valid) {
      throw new Error("Incorrect password");
    }

    return {
      token: jsonwebtoken.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      )
    };
  }
};

var updateUserMutation = {
  type: UserType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
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
  },
  resolve: async function(root, params) {
    var user = await User.findOne({
      _id: params._id
    }).exec();

    if (!user) {
      throw new Error("No user with that id");
    }
    user.name = params.name;
    user.x_coordinate = params.x_coordinate;
    user.y_coordinate = params.y_coordinate;
    await user.save(() => {});
    return user;
  }
};

module.exports = {
  signupMutation: signupMutation,
  loginMutation: loginMutation,
  updateUserMutation: updateUserMutation
};
