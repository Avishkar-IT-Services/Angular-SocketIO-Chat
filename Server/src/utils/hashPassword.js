const { hashSync } = require("bcrypt");
const hash = (password) => hashSync(password, 10);
module.exports = hash