const router = require('express').Router();
const { comments } = require('../../controllers');

router.get('/', comments.getAllComments);
router.post('/', comments.addComment);
router.get('/:id', comments.getComment);
router.put('/:id', comments.updateComment);
router.delete('/:id', comments.deleteComment);

module.exports = router;
