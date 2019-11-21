const router = require('express').Router();
const { comments } = require('../../controllers');
const { restricted } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', comments.getAllComments);
router.get('/:id', comments.getComment);

module.exports = router;
