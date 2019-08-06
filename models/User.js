var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  x_coordinate: Number,
  y_coordinate: Number
});

UserSchema.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.model("User", UserSchema);
