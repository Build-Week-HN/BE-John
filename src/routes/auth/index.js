const router = require('express').Router();
const { auth } = require('../../controllers');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.post('/login', validator(schemas.userLogin, 'body'), auth.login);
router.post('/register', validator(schemas.userReg, 'body'), auth.register);

module.exports = router;
