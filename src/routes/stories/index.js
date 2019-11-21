const router = require('express').Router();
const { stories } = require('../../controllers');
const { restricted } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', stories.getAllStories);
router.post('/', restricted, validator(schemas.story, 'body'), stories.addStory);
router.get('/:id', validator(schemas.itemId, 'params'), stories.getStory);
router.put('/:id', validator(schemas.story, 'body'), restricted, stories.updateStory);
router.delete('/:id', restricted, stories.deleteStory);

router.get('/:id/comments', validator(schemas.itemId, 'params'), stories.getAllStoryComments);
router.post('/:id/comments',
  restricted,
  validator(schemas.itemId, 'params'),
  validator(schemas.comment, 'body'),
  stories.addCommentToStory);
router.get('/:storyId/comments/:commentId', stories.getStoryComment);
router.put('/:storyId/comments/:commentId', restricted, validator(schemas.comment, 'body'), stories.updateStoryComment);
router.delete('/:storyId/comments/:commentId', restricted, stories.deleteStoryComment);


module.exports = router;
