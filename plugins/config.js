const path = require("path");
const dotenv = require("dotenv");
const result = dotenv.config({ path: path.resolve(".env." + process.env.NODE_ENV.trim()) });
if (result.error) {
  throw result.error;
}

const { parsed: envs } = result;
module.exports = envs;
