const router = require('express').Router();
const {
  getCards, createCard, removeCard, putLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
