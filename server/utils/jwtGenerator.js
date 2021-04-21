require("dotenv").config();
const jwt = require("jsonwebtoken");

function jwtGenerator(login_id) {
  const payload = {
    user: login_id,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
