const express = require("express");
const { Server } = require("socket.io");

const app = express(); // server created!!
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

// app.use(express.json());
app.use(express.static("public"));
let userList = [];

io.on("connection", function (socket) {
  // console.log(socket.id + " connected!!!");
  // console.log(socket);

  socket.on("userConnected", function (username) {
    let userObject = { id: socket.id, username: username };
    userList.push(userObject);
    // console.log(userList);

    socket.broadcast.emit("join", userObject);

    socket.emit("online-list", userList);
  })

  socket.on("chat", function (chatObj) {
    socket.broadcast.emit("leftChat", chatObj);
  })

  // when a user disconnect!!!
  socket.on("disconnect", function () {
    let leftUserObj;
    let remainingUsers = userList.filter(function (userObj) {
      if (userObj.id == socket.id) {
        leftUserObj = userObj;
        return false;
      }
      return true;
    })
    userList = remainingUsers;
    socket.broadcast.emit("userDisconnected", leftUserObj);

  })


})


let port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log("server has been started !!!");
})
