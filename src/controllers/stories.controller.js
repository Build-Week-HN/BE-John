// stories controller

const Items = require('../models/item-model');

const getAllStories = async (req, res) => {
  const stories = await Items.findBy({ type: 'story' });
  res.status(200).json({ status: 200, data: stories });
};

const getStory = (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then(async (item) => {
      if (item.type === 'story') {
        res.status(200).json({ status: 200, data: [item] });
      } else {
        res.status(404).json({ status: 404, error: 'Story not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting story: ${error.message}` });
    });
};

const addStory = (req, res) => {
  const { title, url } = req.body;
  const { username } = req.decodedToken;
  const newStory = {
    title, url, by: username, type: 'story',
  };

  Items.add(newStory)
    .then((story) => {
      res.status(201).json({ status: 200, data: story });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error adding story: ${error}` });
    });
};


const deleteStory = (req, res) => {
  const { id } = req.params;
  Items.remove(id)
    .then(() => {
      res.status(200).json({ status: 200, data: [{ message: 'Story has been deleted', id }] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error deleting story: ${error.message}`,
      });
    });
};

const updateStory = (req, res) => {
  const { id } = req.params;

  Items.update(req.body, id)
    .then(async () => {
      const comment = await Items.findById(Number(id));
      res.status(200).json({ status: 200, data: [comment] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error updating story: ${error.message}`,
      });
    });
};

const addCommentToStory = (req, res) => {
  const comment = req.body;
  const { id } = req.params;
	const user = req.decodedToken;

  Items.findById(id)
    .then(async (item) => {
      if (item.type === 'story') {
        comment.parent = Number(id);
        comment.type = 'comment';
				comment.by = user.username;
        const commentId = await Items.addComment(comment, id);
        res.status(200).json({ status: 200, data: [{ id: commentId, message: 'comment successfully added' }] });
      } else {
        res.status(404).json({ status: 404, error: 'The story does not exist' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error: ${error.message}` });
    });
};

const getAllStoryComments = (req, res) => {
  const { id } = req.params;
  Items.findBy({ type: 'comment', parent: id })
    .then((comments) => {
      if (comments) {
        res.status(200).json({ status: 200, data: comments });
      } else {
        res.status(404).json({ status: 404, message: 'No comments for this story' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting comments from db: ${error.message}` });
    });
};

const getStoryComment = (req, res) => {
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


const updateStoryComment = (req, res) => {
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


const deleteStoryComment = (req, res) => {
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
            error: `Error deleting story: ${err.message}`,
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
  getAllStories,
  addStory,
  getStory,
  updateStory,
  deleteStory,
  addCommentToStory,
  getAllStoryComments,
  getStoryComment,
  updateStoryComment,
  deleteStoryComment,
};
