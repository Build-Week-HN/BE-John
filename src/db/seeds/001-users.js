const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users').truncate()
    .then(() => knex('users').insert([
      { username: 'john', password: bcrypt.hashSync('1234abcd', 11) },
      { username: 'nero', password: bcrypt.hashSync('1234abcd', 11) },
      { username: 'abba', password: bcrypt.hashSync('1234abcd', 11) },
    ]));
};
