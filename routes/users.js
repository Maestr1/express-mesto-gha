const router = require('express')
  .Router();
const {
  getUsers,
  getMe,
  getUser,
  patchUserInfo,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.patch('/me', patchUserInfo);
router.patch('/me/avatar', patchUserAvatar);
router.get('/:userId', getUser);
module.exports = router;
