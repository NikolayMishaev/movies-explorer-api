const { URL_MONGO_PROD, NODE_ENV } = process.env;

const SETUP_MONGO = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const URL_MONGO = NODE_ENV === 'production' ? URL_MONGO_PROD : 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  SETUP_MONGO,
  URL_MONGO,
};
