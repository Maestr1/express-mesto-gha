const Card = require('../models/card');
const { SERVER_ERR_STATUS, VALIDATION_ERR_STATUS, NOT_FOUND_ERR_STATUS } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERR_STATUS).send({ message: 'Переданы некорректные данные о карточке' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      res.status(SERVER_ERR_STATUS).send({ message: 'На сервере произошла ошибка' });
    });
};
