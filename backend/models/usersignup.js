const express = require("express");
const mongoose = require("mongoose");

const usersignup = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confrimpassword: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("usersignup", usersignup);
