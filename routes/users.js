const router = require('express').Router();
const { validationGetUser, validatePatchUser } = require('../middlewares/validatons');

const {
  getUsers,
  getMe,
  getUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', validatePatchUser, patchUserInfo);
router.patch('/me/avatar', validatePatchUser, patchUserAvatar);
router.get('/:userId', validationGetUser, getUser);
module.exports = router;
