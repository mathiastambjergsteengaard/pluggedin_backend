var createError = require("http-errors");
var express = require("express");
require("dotenv").config();
var GraphQLSchema = require("graphql").GraphQLSchema;
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var autoIncrement = require("mongoose-auto-increment");

var mongoose = require("mongoose");
var app = express();
var graphqlHTTP = require("express-graphql");

var cors = require("cors");

mongoose
  .connect("mongodb://localhost/node-graphql", {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true
  })
  .then(() => console.log("connection successful"))
  .catch(err => console.error(err));

autoIncrement.initialize(mongoose.connection);
var User = require("./models/User");

var queryType = require("./graphql/query_type");
var mutationType = require("./graphql/mutation_type");
const jsonwebtoken = require("jsonwebtoken");

// auth middleware
// const auth = jwt({
//   secret: process.env.JWT_SECRET,
//   credentialsRequired: false
// });
app.use("*", cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET,
//     credentialsRequired: false
//   }),
//   function(req, res) {
//     console.log(res);
//     console.log("hej", req);
//   }
// );
app.use(function(req, res, next) {
  try {
    const token = req.headers.authorization;
    jsonwebtoken.verify(token, process.env.JWT_SECRET, async function(
      err,
      payload
    ) {
      if (payload) {
        await User.findOne(
          {
            email: payload.email
          },
          function(err, user) {
            req.user = user;
          }
        );
        next();
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
    next();
  }
});
app.use(
  "/graphql",
  cors(),

  graphqlHTTP({
    schema: new GraphQLSchema({ query: queryType, mutation: mutationType }),
    rootValue: global,
    graphiql: true
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
