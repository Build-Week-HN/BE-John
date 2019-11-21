const router = require('express').Router();
const { jobs } = require('../../controllers');
const { unauthorized, forbidden } = require('../../middlewares');
const { validator } = require('../../middlewares');
const schemas = require('../../validators/schema');

router.get('/', jobs.getAllJobs);
router.post('/', [unauthorized, validator(schemas.job, 'body')], jobs.addJob);
router.get('/:id', validator(schemas.itemId, 'params'), jobs.getJob);
router.put('/:id',
  [unauthorized,
    validator(schemas.job, 'body'),
    forbidden],
  jobs.updateJob);
router.delete('/:id',
  [unauthorized,
    validator(schemas.itemId, 'params'),
    forbidden],
  jobs.deleteJob);

module.exports = router;
