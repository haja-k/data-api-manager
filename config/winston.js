var appRoot = require("app-root-path");
var winston = require("winston");

var timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
  });
};

require("winston-daily-rotate-file");

var transport = new winston.transports.DailyRotateFile({
  filename: `${appRoot}/logs/requests/%DATE%.log`,
  datePattern: "YYYY-MM-DD-HH",
  handleExceptions: true,
  zippedArchive: false,
  maxSize: "1g",
  level: "info",
  colorize: true,
});

var options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: timezoned }),
    winston.format.printf((info) => {
      return `${info.level}: ${info.timestamp} - message: ${info.message}`;
    })
  ),
  transports: [transport, new winston.transports.Console(options.console)],
  exitOnError: false,
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
