const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { userError, authorizationError } = require('../errors/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

const getDataUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(userError.userIdNotFound);
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(userError.userIdBadRequest));
    }
    next(err);
  }
};

const updateDataUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    res.send(await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    ));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new NotFoundError(userError.userIdNotFound));
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError(authorizationError.userUnauthorized);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError(authorizationError.userUnauthorized);
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'protected-key',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashPassword,
    });
    res.send({
      name: user.name, user: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(userError.userCreateBadRequest),
      );
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError(userError.userEmailConflict));
    }
    next(err);
  }
};

module.exports = {
  createUser,
  updateDataUser,
  login,
  getDataUser,
};
