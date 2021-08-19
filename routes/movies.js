const router = require('express').Router();
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/', getAllMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
