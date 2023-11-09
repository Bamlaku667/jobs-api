require("dotenv").config();
const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No Token");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = {userId: decoded.userId, name: decoded.name};
    next();
  } catch (error) {
    throw new UnauthorizedError("Not authorized for this route");
  }
};

module.exports = verifyToken;
