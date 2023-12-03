const { StatusCodes } = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Some thing went wrong on the server",
  };
  //   if (err instanceof CustomError) {
  //     return res.status(err.statusCode).json({ msg: err.message });
  //   }

  // handle validation errors
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  // handle duplicate email registration error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value.`;
    customError.statusCode = 400;
  }

  // handle cast error
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
//   return res.status(customError.statusCode).json({ msg: err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
