require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { SETUP_MONGO, URL_MONGO } = require('./utils/constants');
const NotFoundError = require('./errors/NotFoundError');
const handleError = require('./errors/handleError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { urlUnkownError } = require('./errors/messages');
const { signinValidation, signupValidation } = require('./middlewares/validation');

const { PORT = 3003 } = process.env;
const app = express();
mongoose.connect(URL_MONGO, SETUP_MONGO);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(limiter);

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('*', (req, res, next) => {
  next(new NotFoundError(urlUnkownError.urlUnkown));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
