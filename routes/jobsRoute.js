const express = require('express');
const { updateJob, deleteJob, getAllJobs, createJob, getJob } = require('../controllers/jobs');
const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;