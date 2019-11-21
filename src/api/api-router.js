const router = require('express').Router();

const authRouter = require('../routes/auth');
const commentsRouter = require('../routes/comments');
const storiesRouter = require('../routes/stories');
const jobsRouter = require('../routes/jobs');


// auth router
router.use('/auth', authRouter);

// comments router
router.use('/comments', commentsRouter);

// stories router
router.use('/stories', storiesRouter);
// ask/questions router
// show router
// jobs router
router.use('/jobs', jobsRouter);

router.get('/', (req, res) => {
  res.json({ api: 'API is live!' });
});

module.exports = router;
