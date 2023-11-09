const  BadRequestError  = require("./badRequest");
const UnauthorizedError  = require("./unauthorized");
const CustomError  = require("./customError");
const NotFoundError = require('./notFoundError');
module.exports = {
  BadRequestError,
  UnauthorizedError,
  CustomError,
  NotFoundError
};
