const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

// 백엔드는 이 파일밖에 없습니다.
io.on("connection", socket => {
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

server.listen(port, () => console.log("server running on port:" + port));