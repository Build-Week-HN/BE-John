const router = require('express').Router();

const authRouter = require('../routes/auth');

// auth router
router.use('/auth', authRouter);

// comments router
// stories router
// ask/questions router
// show router
// jobs router
//


router.get('/', (req, res) => {
  res.json({ api: 'API is live!' });
});

module.exports = router;
