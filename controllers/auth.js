const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const BadRequestError = require("../errors/badRequest");
const UnauthorizedError = require("../errors/unauthorized");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = await user.createJWT()
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token});
};

const login = async (req, res) => {
    let {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('please provide email and password');
    }
    email = email.trim();
    const user = await User.findOne({email});
    if(!user) {
        throw new UnauthorizedError('invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid credentials');
    }
    
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
};

module.exports = {
  register,
  login,
};
