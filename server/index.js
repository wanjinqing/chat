// supervisor --inspect index.js


const socketio = require('./socketio');

var user = require('./user');



socketio.on('connection', (socket) => {

  let roomName = '码农聊天室';
  let username = socket.handshake.query.username;

  socket.join(roomName);
  socket.emit('joinRoom', {
    roomName: roomName
  });
  // 通知其他用户
  socket.broadcast.to(roomName).emit('connect_notice', {
    text: '用户 ' + username + ' 进入 ' + roomName + '.'
  });

  // 客户端发送过来的消息
  socket.on('send', (msg) => {
    if (msg) {
      if (msg.type === 'text') {
        socket.broadcast.to(roomName).emit('receive', msg);
      }
    }
  })
  // 在该房间里的所有用户
  // console.log(socket.adapter.rooms[roomName].sockets);
  // 用户断开连接
  socket.on('disconnect', () => {
    var username = user.currentRoom[socket.id];
    delete user.currentRoom[socket.id];
    delete user.nickNames[username];
  })


});