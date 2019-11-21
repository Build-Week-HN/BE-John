const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => knex('users').insert([
      { username: 'nero', password: bcrypt.hashSync('1234abcd', 11) },
      { username: 'abba', password: bcrypt.hashSync('1234abcd', 11) },
    ]));
};
