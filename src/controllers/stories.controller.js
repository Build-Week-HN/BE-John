// stories controller

const Items = require('../models/item-model');

const getAllStories = async (req, res) => {
  const stories = await Items.findBy({ type: 'story' });
  res.status(200).json({ status: 200, data: stories });
};

const getStory = (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then((item) => {
      if (item.type === 'story') {
        res.status(200).json({ status: 200, data: [item] });
      } else {
        res.status(404).json({ status: 404, error: 'Story not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting project actions: ${error.message}` });
    });
};

const addStory = (req, res) => {
  const story = req.body;
  Items.add(story)
    .then((newStory) => {
      res.status(201).json({ status: 200, data: [{ ...newStory }] });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error adding comment: ${error.message}` });
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
        error: `Error deleting comment: ${error.message}`,
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
        error: `Error updating the project: ${error.message}`,
      });
    });
};

module.exports = {
  getAllStories,
  addStory,
  getStory,
  updateStory,
  deleteStory,
};
