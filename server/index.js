// supervisor --inspect index.js


const socketio = require('./socketio');

var user = require('./user');



socketio.on('connection', (socket) => {

  let roomName = '码农聊天室';

  let username = socket.handshake.query.username;

  if (user.nickNames[username]) {
    console.log(username, socket.id)
  }
  
  socket.join(roomName);
  socket.emit('joinRoom', {
    roomName: roomName,
  })
  // 通知其他用户
  socket.broadcast.to(roomName).emit('notice', {
    text: '用户 ' + username + ' 加入 ' + roomName + '.'
  })
  // 在该房间里的所有用户
  console.log(socket.adapter.rooms[roomName].sockets);
  console.log(user);
  console.log(socket.id)

  // // 处理用户的消息，更名，以及聊天室的创建和变更
  // handleMessageBroadcasting(socket, nickNames);
  // handleNameChangeAttempts(socket, nickNames, namesUsed);
  // handleRoomJoining(socket);
  // // 用户发送请求时，向其提供已经被占用的聊天室的列表
  // socket.on('rooms', function () {
  //   socket.emit('rooms', io.sockets.manager.rooms);
  // })
  // 用户断开连接后的清楚逻辑
  socket.on('disconnect', () => {
    var username = user.currentRoom[socket.id];
    console.log('disconnect: ', socket.id)
    delete user.currentRoom[socket.id];
    delete user.nickNames[username];
  })

  

});




// 用户加入房间
function joinRoom(socket, roomName) {
  
  
}

// 更换房间名
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function (name) {
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      })
    } else {
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now known as ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        });
      }
    }
  })
}

// 监听客户端发送过来的消息，并且广播给其他的客户端
function handleMessageBroadcasting(socket, nickNames) {
  socket.on('message', function (message) {
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  })
}

// 用户切换房间
function handleRoomJoining(socket) {
  socket.on('join', function (room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}

// 用户离开房间
function handleClientDisconnection(socket) {
  
}