// Jobs controller

const Items = require('../models/item-model');

const getAllJobs = async (req, res) => {
  const jobs = await Items.findBy({ type: 'job' });
  res.status(200).json({ status: 200, data: jobs });
};

const getJob = (req, res) => {
  const { id } = req.params;

  Items.findById(id)
    .then(async (item) => {
      if (item.type === 'job') {
        res.status(200).json({ status: 200, data: [item] });
      } else {
        res.status(404).json({ status: 404, error: 'Job not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error getting job: ${error.message}` });
    });
};

const addJob = (req, res) => {
  const { title, url } = req.body;
  const { username } = req.decodedToken;
  const newJob = {
    title, url, by: username, type: 'job',
  };

  Items.add(newJob)
    .then((job) => {
      res.status(201).json({ status: 200, data: job });
    })
    .catch((error) => {
      res.status(500).json({ status: 500, error: `Error adding job: ${error}` });
    });
};


const deleteJob = (req, res) => {
  const { id } = req.params;
  Items.remove(id)
    .then(() => {
      res.status(200).json({ status: 200, data: [{ message: 'Job has been deleted', id }] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error deleting job: ${error.message}`,
      });
    });
};

const updateJob = (req, res) => {
  const { id } = req.params;

  Items.update(req.body, id)
    .then(async () => {
      const comment = await Items.findById(Number(id));
      res.status(200).json({ status: 200, data: [comment] });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        error: `Error updating job: ${error.message}`,
      });
    });
};


module.exports = {
  getAllJobs,
  addJob,
  getJob,
  updateJob,
  deleteJob,
};
