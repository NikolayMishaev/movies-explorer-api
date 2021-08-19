const mongoose = require('mongoose');
const validator = require('validator');
const { validityError } = require('../errors/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validityError.emailBadRequest,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    minlength: 8,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
