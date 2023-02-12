require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const followRoute = require("./routes/follow-route")
const likeRoute = require("./routes/like-route");
const postRoute = require("./routes/post-route");
const searchRoute = require("./routes/search-route");
const authRoute = require("./routes/auth-route");

const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

app.use(cors());

app.use(express.json());

app.use("/auth", authenticate, authRoute);
app.use("/user", authenticate);
app.use("/search", authenticate, searchRoute);
app.use("/follow", authenticate, followRoute)
app.use("/post", authenticate, postRoute);
app.use("/like", authenticate, likeRoute);

app.use(error);

app.use(notFound);

module.exports = server;
