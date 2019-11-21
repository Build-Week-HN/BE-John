const bcrypt = require('bcryptjs');

const User = require('../models/user-model.js');
const generateToken = require('../utils');


const login = (req, res) => {
  const { username, password } = req.body;

  User.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const {
          id, username, about, karma, created,
        } = user;
        res.status(200).json({
          status: 200,
          data: [{
            token,
            user: {
              id, username, about, karma, created,
            },
          }],
        });
      } else {
        res.status(400).json({ status: 400, error: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      res.status(500).json({ status: 500, error: `Login failed: ${err.message}` });
    });
};

const register = (req, res) => {
  const user = req.body;
  const { password } = user;

  const hash = bcrypt.hashSync(password, 12);
  user.password = hash;

  User.add(user)
    .then((newUser) => {
      const {
        id, username, about, karma, created,
      } = newUser;
      res.status(201).json({
        status: 201,
        data: [{
          user: {
            id, username, about, karma, created,
          },
        }],
      });
    })
    .catch((err) => {
      res.status(500).json({ status: 500, error: `Registration failed: ${err.message}` });
    });
};

module.exports = {
  login,
  register,
};
