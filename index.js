require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const winston = require("./config/winston");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app_url = process.env.APP_URL || "http://localhost";
const network_path = app_url.split("://")[1];
const port = process.env.PORT || 3000;
const allowedOrigins = [`${app_url}:${port}`];

const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; // root file where the route starts.

/* uncomment during deployment */
// swaggerAutogen(outputFile, endpointsFiles, { host: `${network_path}` });

/* uncomment during development */
swaggerAutogen(outputFile, endpointsFiles, { host: `${network_path}:${port}` });

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true);
  },
};

app.use(cors(corsOptions)); 
app.use(express.urlencoded({ extended: true, limit: '50000kb'}));
app.use(express.json( {limit: '50000kb'} ));
app.use(morgan("tiny", { stream: winston.stream }));

/* app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
); */

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Server running at ${app_url}:${port}`);
});

require("./routes/index")(app);