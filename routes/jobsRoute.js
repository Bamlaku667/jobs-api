const express = require('express');
<<<<<<< HEAD
const { updateJob, deleteJob, getAllJobs, createJob, getJob } = require('../controllers/jobs');
const router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
=======
const { updateJob, deleteJob, getAllJobs, createJob, getJob, deleteAllJobs } = require('../controllers/jobs');
const router = express.Router();

router.route('/').get(getAllJobs).post(createJob).delete(deleteAllJobs);
>>>>>>> 6b709c3 (handling validation mongoose and cast errors for the api)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;