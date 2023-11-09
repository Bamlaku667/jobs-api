const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKEN_KEY } = process.env;
const { BadRequestError, UnauthorizedError } = require("../errors");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError('No Token');
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    throw new UnauthorizedError("Unauthorized access to this route")
  }
  next();    
};

module.exports = verifyToken;
