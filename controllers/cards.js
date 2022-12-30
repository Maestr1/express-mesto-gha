const Card = require('../models/card');
const {
  SERVER_ERR_STATUS,
  VALIDATION_ERR_STATUS,
  NOT_FOUND_ERR_STATUS,
  BAD_PERMISSION_ERR_STATUS,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(SERVER_ERR_STATUS)
      .send({ message: `На сервере произошла ошибка ${err.name}` }));
};

module.exports.createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERR_STATUS)
          .send({ message: 'Переданы некорректные данные о карточке' });
        return;
      }
      res.status(SERVER_ERR_STATUS)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('notFoundId'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new Error('BadPermission'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(NOT_FOUND_ERR_STATUS)
          .send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (err.message === 'BadPermission') {
        res.status(BAD_PERMISSION_ERR_STATUS)
          .send({ message: 'Нет прав на удаление этой карточки' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERR_STATUS)
          .send({ message: 'Переданы некорректные данные о карточке' });
        return;
      }
      res.status(SERVER_ERR_STATUS)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('notFoundId'))
    .populate('owner')
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(NOT_FOUND_ERR_STATUS)
          .send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERR_STATUS)
          .send({ message: 'Переданы некорректные данные о карточке' });
        return;
      }
      res.status(SERVER_ERR_STATUS)
        .send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('notFoundId'))
    .populate('owner')
    .populate('likes')
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notFoundId') {
        res.status(NOT_FOUND_ERR_STATUS)
          .send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERR_STATUS)
          .send({ message: 'Переданы некорректные данные о карточке' });
        return;
      }
      res.status(SERVER_ERR_STATUS)
        .send({ message: 'На сервере произошла ошибка' });
    });
};
