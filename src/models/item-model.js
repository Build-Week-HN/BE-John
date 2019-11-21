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
  const story = await db('items').insert(item).returning('*');
  return story;
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

async function addComment(comment, itemId) {
  const [commentId] = await db('items').insert(comment).returning('id');
  const query = `update items set comments = comments || ${commentId} where id=${itemId} returning comments;`;
  const result = await db.raw(query);
  const commentCount = result.rows[0].comments.length;
  await db.raw(`update items set comment_count = ${commentCount} where id=${itemId}`);
  return commentId;
}


module.exports = {
  getAll,
  findBy,
  findById,
  add,
  remove,
  update,
  addComment,
};
