const io = require('socket.io')();

const server = require('./server');
var user = require('./user');
var Event = require('./Event');
io.listen(server);


// 用户名 - middleware
io.use((socket, next) => {
  let username = socket.handshake.query.username;
  let roomName = socket.handshake.query.roomName;
  if (username || username.length <= 20) {
    user.add(username, socket.id);
    user.comeinRoom(socket, roomName, username);
    return next();
  } else if (username && username.length > 20) {
    return next(new Error('username maxlength > 20'));
  }
  return next(new Error('authentication error'));
});




module.exports = io;