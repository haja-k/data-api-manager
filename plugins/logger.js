const winston = require("winston");

let logFileName = new Date().toLocaleDateString().replace(/\D/g, "");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  let env = (process.env.NODE_ENV || "dev").trim();
  let isDevelopment = env == "dev";
  return isDevelopment ? "debug" : "info";
};

var timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
  });
};

const format = winston.format.combine(
  winston.format.timestamp({ format: timezoned }),
  winston.format.printf((info) => {
    return ` ${info.timestamp} - ${info.level}: ${info.message}`;
  })
);

var logError = new winston.transports.File({
  filename: "logs/error/" + logFileName + ".log",
  level: "error",
});

var logCombined = new winston.transports.File({
  filename: "logs/all/" + logFileName + ".log",
});

var debugging = new winston.transports.Console();

var logger = function () {
  return winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: [debugging, logError, logCombined],
  });
};

module.exports = logger;
