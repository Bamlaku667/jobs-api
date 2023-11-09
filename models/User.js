const mongoose = require("mongoose");
const {hashData, verifyData} = require("../utils/hashData");
const generateToken = require("../utils/generateToken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    matche: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
    minlength: 6,
    trim: true
  },
});

userSchema.pre('save', async function(next) {
  this.password = await hashData(this.password);
  next();
} )

userSchema.methods.createJWT = async function () {
  const tokenData = {userId: this._id, name: this.name}
  const token =  await generateToken(tokenData);
  return token;
}

userSchema.methods.comparePassword = async function(unHashedPassword) {
  const isPasswordMatch = await verifyData(unHashedPassword, this.password);
  return isPasswordMatch;
}

const User = mongoose.model("User", userSchema);

module.exports = User;