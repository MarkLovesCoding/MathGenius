const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes");
const passportConfig = require("./config/passport-config");
const flash = require("connect-flash");
// const db = require('./db/db');
// const MongoStore = require('connect-mongo')(session);
require("dotenv").config({ path: "../environmental/mg/.env" });

const helmet = require("helmet");
const app = express();
const { db, store } = require("./db/db");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./dist/views"));
// set up the logger middleware
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set up Helmet.js configurations
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.disable("x-powered-by");

app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);
app.use("/", routes);

// serve static files from the public directory
app.use(express.static(path.join(__dirname, "dist")));

// start the servernpm run
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
