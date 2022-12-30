const jwt = require('jsonwebtoken');

const { LOGIN_ERR_STATUS } = require('../utils/constants');

const handleAuthError = (res) => {
  res
    .status(LOGIN_ERR_STATUS)
    .send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  next();
};
