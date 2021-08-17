const mongoose = require('mongoose');
const validator = require('validator');

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
      message: 'Указан невалидный формат почты',
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
