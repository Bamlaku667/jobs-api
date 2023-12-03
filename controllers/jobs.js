<<<<<<< HEAD
const getAllJobs = async (req, res ) => {
    res.send('get all jobs');
}

const getJob = async (req, res) => {
    res.send('get a single job')
}

const createJob = async (req, res) => {
    res.json(req.user);
}
const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete job');
}

module.exports = {
    getJob, getAllJobs,updateJob, deleteJob , createJob
}
=======
const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors");
const { default: mongoose } = require("mongoose");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ jobs });
};

const deleteAllJobs = async (req, res) => {
  const { userId } = req.user;
  const result = await Job.deleteMany({ createdBy: userId });
  if (result.deletedCount === 0) {
    throw new NotFoundError("No jobs found for the user");
  }

  res.status(StatusCodes.OK).json({ msg: "All jobs deleted successfully" });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError("job can not be found");
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job, user: req.user });
};
const updateJob = async (req, res) => {
  let {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!(company && position)) {
    throw new BadRequestError("company or position can not be empty");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError("job could not be found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`no job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "deleted successfully!" });
};

module.exports = {
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
  createJob,
  deleteAllJobs,
};
>>>>>>> 6b709c3 (handling validation mongoose and cast errors for the api)
