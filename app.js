require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { SETUP_MONGO, URL_MONGO } = require('./utils/constants');
const handleError = require('./errors/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');

const { PORT = 3003 } = process.env;
const app = express();
mongoose.connect(URL_MONGO, SETUP_MONGO);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
