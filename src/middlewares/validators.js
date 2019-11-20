// custom middleware
const Items = require('../models/item-model');

function validateItemId(req, res, next) {
  const { id } = req.params;

  Items.findById(id)
    .then((item) => {
      if (item) {
        req.item = item;
        next();
      } else {
        res.status(400).json({ status: 400, error: 'Invalid ID' });
      }
    });
}

function validateItem(req, res, next) {
  if (Object.keys(req.body).length) {
    if ('name' in req.body && 'description' in req.body) {
      next();
    } else {
      res.status(400).json({ message: 'missing or empty required name field' });
    }
  } else {
    res.status(400).json({ message: 'missing project data' });
  }
}
