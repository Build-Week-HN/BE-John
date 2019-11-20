const router = require('express').Router();

// authenticate middleware to protect routes

// auth router
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
