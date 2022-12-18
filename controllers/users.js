const User = require('../models/user');
const { NOT_FOUND_ERR_STATUS, VALIDATION_ERR_STATUS, SERVER_ERR_STATUS } = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('notFoundId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERR_STATUS).send({ message: 'Переданы некорректные данные о пользователе' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERR_STATUS).send({ message: 'Переданы некорректные данные о пользователе' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERR_STATUS).send({ message: 'Переданы некорректные данные о пользователе' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERR_STATUS).send({ message: 'Переданы некорректные данные о пользователе' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};
