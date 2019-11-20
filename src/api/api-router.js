const router = require('express').Router();

const { restricted } = require('../middlewares');
const authRouter = require('../routes/auth');
const commentsRouter = require('../routes/comments');

// auth router
router.use('/auth', authRouter);

// comments router
router.use('/comments', commentsRouter);
// stories router
// ask/questions router
// show router
// jobs router
//


router.get('/', (req, res) => {
  res.json({ api: 'API is live!' });
});

module.exports = router;
