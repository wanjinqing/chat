
var Event = function () {}
Event.prototype.joinRoom = function (socket, roomName) {
  socket.join(roomName);
  socket.emit('joinRoom', {
    roomName: roomName
  });
}

Event.prototype.connectNotice = function (socket, roomName, username) {
  // 通知其他用户
  socket.broadcast.to(roomName).emit('connect_notice', {
    text: '用户 ' + username + ' 进入 ' + roomName + '.'
  });
}

Event.prototype.listen = function (socket, roomName) {
  // 客户端发送过来的消息
  socket.on('send', (msg) => {
    if (msg) {
      if (msg.type === 'text') {
        socket.broadcast.to(roomName).emit('receive', msg);
      }
    }
  })

}

Event.prototype.leaveRoom = function (socket, user) {
  // 在该房间里的所有用户
  // console.log(socket.adapter.rooms[roomName].sockets);
  // 用户断开连接
  socket.on('disconnect', () => {
    console.log('disconnect: ', user)
    var roomName = socket.handshake.query.roomName;
    var username = socket.handshake.query.username;
    user.leaveRoom(roomName, username);
    user.remove(socket.id);
  })
}

module.exports = new Event();