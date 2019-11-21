// Ask controller

const Items = require('../models/item-model');

const getAllAsks = async (req, res) => {
  const stories = await Items.findBy({ type: 'ask' });
  res.status(200).json({ status: 200, data: stories });
};

const getAsk = (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then(async (item) => {
      if (item.type === 'ask') {
        res.status(200).json({ status: 200, data: [item] });
      } else {
        res.status(404).json({ status: 404, error: 'Ask not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting ask: ${error.message}` });
    });
};

const addAsk = (req, res) => {
  let { title, text } = req.body;
  const { username } = req.decodedToken;
  title = `Ask HN: ${title}`;
  const newAsk = {
    title, text, by: username, type: 'ask',
  };

  Items.add(newAsk)
    .then((ask) => {
      res.status(201).json({ status: 200, data: ask });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error adding ask: ${error}` });
    });
};


const deleteAsk = (req, res) => {
  const { id } = req.params;
  Items.remove(id)
    .then(() => {
      res.status(200).json({ status: 200, data: [{ message: 'Ask has been deleted', id }] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error deleting ask: ${error.message}`,
      });
    });
};

const updateAsk = (req, res) => {
  const { id } = req.params;

  Items.update(req.body, id)
    .then(async () => {
      const comment = await Items.findById(Number(id));
      res.status(200).json({ status: 200, data: [comment] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error updating ask: ${error.message}`,
      });
    });
};

const addCommentToAsk = (req, res) => {
  const comment = req.body;
  const { id } = req.params;

  Items.findById(id)
    .then(async (item) => {
      if (item.type === 'ask') {
        comment.parent = Number(id);
        comment.type = 'comment';
        const commentId = await Items.addComment(comment, id);
        res.status(200).json({ status: 200, data: [{ id: commentId, message: 'comment successfully added' }] });
      } else {
        res.status(404).json({ status: 404, error: 'The ask does not exist' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error: ${error.message}` });
    });
};

const getAllAskComments = (req, res) => {
  const { id } = req.params;
  Items.findBy({ type: 'comment', parent: id })
    .then((comments) => {
      if (comments) {
        res.status(200).json({ status: 200, data: comments });
      } else {
        res.status(404).json({ status: 404, message: 'No comments for this ask' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting comments from db: ${error.message}` });
    });
};

const getAskComment = (req, res) => {
  const { id, commentId } = req.params;

  Items.findBy({ type: 'comment', parent: id, id: commentId })
    .then((comment) => {
      if (comment) {
        res.status(200).json({ status: 200, data: comment });
      } else {
        res.status(404).json({ status: 404, message: 'Comment not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting comment from db: ${error.message}` });
    });
};


const updateAskComment = (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body;

  Items.update(updatedComment, commentId)
    .then(async () => {
      const comment = await Items.findById(Number(commentId));
      res.status(200).json({ status: 200, data: comment });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting comment from db: ${error.message}` });
    });
};


const deleteAskComment = (req, res) => {
  const { id, commentId } = req.params;

  Items.findBy({ type: 'comment', parent: id, id: commentId })
    .then(async (comment) => {
      if (comment) {
        try {
          await Items.removeComment(commentId);
          res.status(200).json({ status: 200, data: [{ message: 'Comment has been deleted', commentId }] });
        } catch (err) {
          res.status(500).json({
            status: 500,
            error: `Error deleting ask: ${err.message}`,
          });
        }
      } else {
        res.status(404).json({ status: 404, message: 'Comment not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting comment from db: ${error.message}` });
    });
};


module.exports = {
  getAllAsks,
  addAsk,
  getAsk,
  updateAsk,
  deleteAsk,
  addCommentToAsk,
  getAllAskComments,
  getAskComment,
  updateAskComment,
  deleteAskComment,
};
