const db = require('../db/db-config.js');

function findAll() {
  return db('users');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .first();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function update(data, id) {
  const updateFields = Object.keys(data);
  return db('users')
    .where({ id })
    .update(data, updateFields);
}

module.exports = {
  findAll,
  findBy,
  add,
  remove,
  update,
};
