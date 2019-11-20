const Items = require('../models/item-model');

const getAllComments = async (req, res) => {
  const comments = await Items.findBy({ type: 'comment' });
  res.status(200).json({ status: 200, data: comments });
};

const getComment = (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then((item) => {
      if (item.type === 'comment') {
        res.status(200).json({ data: [item] });
      } else {
        res.status(404).json({ status: 404, error: 'Item not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: `Error getting project actions: ${error.message}` });
    });
};

const addComment = (req, res) => {
  const comment = req.body;
  Items.add(comment)
    .then((newComment) => {
      res.status(201).json({ status: 200, data: [{ ...newComment }] });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error adding comment: ${error.message}` });
    });
};


const deleteComment = (req, res) => {
  const { id } = req.params;
  Items.remove(id)
    .then(() => {
      res.status(200).json({ status: 200, data: [{ message: 'Comment has been deleted', id }] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error deleting comment: ${error.message}`,
      });
    });
};

const updateComment = (req, res) => {
  const { id } = req.params;

  Items.update(req.body, id)
    .then(async () => {
      const comment = await Items.findById(Number(id));
      res.status(200).json({ status: 200, data: [comment] });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error updating the project: ${error.message}`,
      });
    });
};

module.exports = {
  getAllComments,
  addComment,
  getComment,
  updateComment,
  deleteComment,
};
