const server = require("./app");
const { Server } = require("socket.io");
const chalk = require("chalk");

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUser = {};

io.use((socket, next) => {
  const userId = socket.handshake.auth.id;
  //   socket.userId = userId;
  onlineUser[userId] = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log(onlineUser);
  socket.on("send_like", ({ to, from, postId }) => {
    // console.log(to, from);
    socket
      .to(onlineUser[to])
      .emit("receive_like", { text: `Liked by ${from}`, postId: postId });
  });
  socket.on("send_follow", ({ to, from }) => {
    socket.to(onlineUser[to]).emit("receive_follow", {
      text: `${from} starting follow you`,
    });
  });
});

server.listen(process.env.PORT, () =>
  console.log(chalk.bgGreen.bold(`Server run on ${process.env.PORT}`))
);
