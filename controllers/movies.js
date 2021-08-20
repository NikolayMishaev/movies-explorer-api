const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { movieError } = require('../errors/messages');
const { messages } = require('../utils/constants');

const getAllMovies = async (req, res, next) => {
  try {
    res.send(await Movie.find({ owner: req.user._id }));
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  try {
    res.send(await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    }));
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(movieError.movieCreateBadRequest));
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundError(movieError.movieIdNotFound);
    }
    if (owner === movie.owner.toString()) {
      await Movie.findByIdAndRemove(req.params.id);
      res.send({ message: messages.movieDeleted });
    }
    throw new ForbiddenError(movieError.movieDeleteForbidden);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
