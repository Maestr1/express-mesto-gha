const router = require('express').Router();
const {
  getUsers, getUser, patchUserInfo, patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchUserAvatar);
module.exports = router;
