require("dotenv").config();

const config = {
  MONGOURI: process.env.MONGOURI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRESIN: process.env.TOKEN_EXPIRESIN
};

module.exports = config;
