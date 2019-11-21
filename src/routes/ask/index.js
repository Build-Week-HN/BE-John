const router = require('express').Router();
const { ask } = require('../../controllers');
const { unauthorized, forbidden } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', ask.getAllAsks);
router.post('/', unauthorized, validator(schemas.ask, 'body'), ask.addAsk);
router.get('/:id', validator(schemas.itemId, 'params'), ask.getAsk);
router.put('/:id',
  [unauthorized,
    validator(schemas.ask, 'body'),
    forbidden],
  ask.updateAsk);
router.delete('/:id',
  [unauthorized,
    validator(schemas.itemId, 'params'),
    forbidden],
  ask.deleteAsk);

router.get('/:id/comments',
  validator(schemas.itemId, 'params'),
  ask.getAllAskComments);
router.post('/:id/comments',
  [unauthorized,
    validator(schemas.itemId, 'params'),
    validator(schemas.comment, 'body'),
    forbidden],
  ask.addCommentToAsk);
router.get('/:id/comments/:commentId', ask.getAskComment);
router.put('/:id/comments/:commentId',
  [unauthorized,
    validator(schemas.comment, 'body'),
    forbidden],
  ask.updateAskComment);
router.delete('/:id/comments/:commentId',
  [unauthorized, forbidden],
  ask.deleteAskComment);


module.exports = router;
