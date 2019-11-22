const router = require('express').Router();
const { stories } = require('../../controllers');
const { unauthorized, forbidden } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', stories.getAllStories);
router.post('/', [unauthorized, validator(schemas.story, 'body')], stories.addStory);
router.get('/:id', validator(schemas.itemId, 'params'), stories.getStory);
router.put('/:id',
  [unauthorized,
    validator(schemas.story, 'body'),
    forbidden],
  stories.updateStory);
router.delete('/:id',
  [unauthorized,
    validator(schemas.itemId, 'params'),
    forbidden],
  stories.deleteStory);

router.get('/:id/comments',
  validator(schemas.itemId, 'params'),
  stories.getAllStoryComments);
router.post('/:id/comments',
  [unauthorized,
    validator(schemas.itemId, 'params'),
    validator(schemas.comment, 'body'),
    forbidden],
  stories.addCommentToStory);
router.get('/:id/comments/:commentId', stories.getStoryComment);
router.put('/:id/comments/:commentId',
  [unauthorized,
    validator(schemas.comment, 'body'),
    forbidden],
  stories.updateStoryComment);
router.delete('/:id/comments/:commentId',
  [unauthorized, forbidden],
  stories.deleteStoryComment);


module.exports = router;
