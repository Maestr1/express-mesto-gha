const router = require('express').Router();

const { validateCardBody } = require('../middlewares/validatons');
const {
  getCards, createCard, removeCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
