const express = require("express");
const mongoose = require("mongoose");

const loginwithgoogle = new mongoose.Schema({
  googleID: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  displayName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("loginwithgoogle", loginwithgoogle);
