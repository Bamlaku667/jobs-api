const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = () => {
  const dbURI = process.env.dbURI;

  return mongoose.connect(dbURI);
};


module.exports = connectToDB;