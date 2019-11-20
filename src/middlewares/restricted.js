const jwt = require('jsonwebtoken');
const secrets = require('../../config');

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      secrets.jwtSecret,
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      },
    );
  } else {
    res.status(400).json({ message: 'Provide credentials' });
  }
}

module.exports = restricted;
