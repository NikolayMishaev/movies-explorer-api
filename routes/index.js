const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { urlUnkownError } = require('../errors/messages');
const { signinValidation, signupValidation } = require('../middlewares/validation');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError(urlUnkownError.urlUnkown));
});

module.exports = router;
