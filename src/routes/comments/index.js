const router = require('express').Router();
const { comments } = require('../../controllers');
const { restricted } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', comments.getAllComments);
router.get('/:id', comments.getComment);
router.put('/:id', restricted, validator(schemas.comment, 'body'), comments.updateComment);
router.delete('/:id', restricted, comments.deleteComment);

module.exports = router;
