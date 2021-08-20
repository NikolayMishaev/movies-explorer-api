const mongoose = require('mongoose');
const { validityError } = require('../errors/messages');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (v) => /^https?:\/\/(www\.)?[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]*#?/i.test(v),
      message: validityError.urlBadRequest,
    },
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (v) => /^https?:\/\/(www\.)?[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]*#?/i.test(v),
      message: validityError.urlBadRequest,
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (v) => /^https?:\/\/(www\.)?[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]*#?/i.test(v),
      message: validityError.urlBadRequest,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
