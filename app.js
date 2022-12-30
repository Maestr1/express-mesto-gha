const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND_ERR_STATUS } = require('./utils/constants');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.set('runValidators', true);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '639df52371e4e7db00bdd531',
  };
  next();
});

app.use('/signin', login);
app.use('/signup', createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  res.status(NOT_FOUND_ERR_STATUS).send({ message: 'Не правильный путь' });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
