const db = require('../db/db-config.js');

function getAll() {
  return db('items');
}

function findBy(filter) {
  return db('items')
    .where(filter);
}

function findById(id) {
  return db('items')
    .where({ id })
    .first();
}

async function add(item) {
  const [id] = await db('items').insert(item);
  return findById(id);
}

function remove(id) {
  return db('items')
    .where({ id })
    .del();
}

function update(data, id) {
  const updateFields = Object.keys(data);
  return db('items')
    .where({ id })
    .update(data, updateFields);
}

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  remove,
  update,
};
