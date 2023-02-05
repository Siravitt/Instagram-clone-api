require("dotenv").config();

const chalk = require("chalk");
const cors = require("cors");

const express = require("express");
const error = require("./middlewares/error");
const app = express();

const postRoute = require("./routes/postRoute");
const searchRoute = require("./routes/searchRoute");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const notFound = require("./middlewares/notFound");
const authenticate = require("./middlewares/authenticate");

app.use(cors());

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", authenticate);
app.use("/profile", authenticate, profileRoute);
app.use("/search", authenticate, searchRoute);
app.use("/post", authenticate, postRoute);

app.use(error);

app.use(notFound);

app.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold("Server run on port 8000"))
);
