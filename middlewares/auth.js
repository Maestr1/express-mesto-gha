const jwt = require('jsonwebtoken');

const LoginError = require('../errors/login');

function handleAuthError(next) {
  next(new LoginError('Требуется авторизация'));
}

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return handleAuthError(next);
  }
  req.user = payload;
  next();
};
