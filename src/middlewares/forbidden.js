const Items = require('../models/item-model');

const forbidden = (req, res, next) => {
  const user = req.decodedToken;
  const { id } = req.params;

  Items.findById(Number(id))
    .then((item) => {
      if (item) {
        if (item.by === user.username) {
          next();
        } else {
          res.status(403).json({ status: 403, error: 'Forbidden: You cant access this endpoint' });
        }
      } else {
        res.status(404).json({ status: 404, message: 'Item not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error accessing DB: ${error}` });
    });
};

module.exports = forbidden;
