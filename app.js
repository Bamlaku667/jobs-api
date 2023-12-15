require("express-async-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const authRouter = require("./routes/authRoute");
const jobRouter = require("./routes/jobsRoute");
const authenticateUser = require("./middlewares/auth");

//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
var app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// use securities
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(limiter);
// swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.get("/", (req, res) => {
  app.get("/", (req, res) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MY JOBS API DOCUMENTATION</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          a {
            display: inline-block;
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #4285f4;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>MY JOBS API DOCUMENTATION</h1>
        <a href="/api-docs">Go To Documentation</a>
      </body>
      </html>
    `;

    res.send(htmlContent);
  });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
