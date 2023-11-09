const jwt = require('jsonwebtoken');
require('dotenv').config();
const{TOKEN_KEY, TOKEN_LIFETIME} = process.env;
const generateToken = async(data) => {
    try {
        const token = jwt.sign(data, TOKEN_KEY, {expiresIn: TOKEN_LIFETIME});
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = generateToken;