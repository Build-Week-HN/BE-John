const router = require('express').Router();
const { stories } = require('../../controllers');

router.get('/', stories.getAllStories);
router.post('/', stories.addStory);
router.get('/:id', stories.getStory);
router.put('/:id', stories.updateStory);
router.delete('/:id', stories.deleteStory);

module.exports = router;
