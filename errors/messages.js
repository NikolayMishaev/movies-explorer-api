const userError = {
  userIdNotFound: 'Пользователь по указанному id не найден',
  userIdBadRequest: 'Указан не валидный номер id пользователя',
  userCreateBadRequest: 'Переданы некорректные данные при создании пользователя',
  userEmailConflict: 'Пользователь с таким email уже зарегистрирован',
};

const movieError = {
  movieIdNotFound: 'Фильм по указанному id не найден',
  movieDeleteForbidden: 'Вы не можете удалять фильмы других пользователей',
  movieCreateBadRequest: 'Переданы некорректные данные при создании фильма',
};

const validityError = {
  urlBadRequest: 'указанный URL не прошел валидацию',
  emailBadRequest: 'указанный email не прошел валидацию',
};

const authorizationError = {
  authorizationFailed: 'Необходима авторизация',
  jwtFailed: 'JWT не прошел проверку',
  userUnauthorized: 'Неправильные почта или пароль',
};

const urlUnkownError = {
  urlUnkown: 'Указанный адрес не существует',
};

module.exports = {
  userError,
  movieError,
  validityError,
  authorizationError,
  urlUnkownError,
};
