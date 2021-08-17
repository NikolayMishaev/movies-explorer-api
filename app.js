const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { SETUP_MONGO, URL_MONGO } = require('./utils/constants');
const NotFoundError = require('./errors/NotFoundError');
const handleError = require('./errors/handleError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(URL_MONGO, SETUP_MONGO);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Указанный адрес не существует'));
});

app.use(handleError);

app.listen(PORT);
