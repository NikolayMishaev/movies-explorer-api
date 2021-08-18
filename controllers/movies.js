const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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
      next(new BadRequestError(`Переданы некорректные данные при создании фильма.
      В поле ${err.message.replace('card validation failed: ', '')}`));
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным id не найден');
    }
    if (owner === movie.owner.toString()) {
      await Movie.findByIdAndRemove(req.params.id);
      res.send({ message: 'фильм удален' });
    }
    throw new ForbiddenError('Вы не можете удалять фильмы других пользователей');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
