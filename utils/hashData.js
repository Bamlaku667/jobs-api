
const bcrypt = require('bcryptjs');

const hashData = async function (data)  {
    const salt = await bcrypt.genSalt(10);
    const hashedData = bcrypt.hash(data, salt);
    return hashedData;

}

const verifyData = async function(UnHashedData, hashedData) {
    const isMatch = await bcrypt.compare(UnHashedData, hashedData);
    return isMatch;
}
module.exports = {
    hashData, 
    verifyData
};