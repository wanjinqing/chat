const io = require('socket.io')();

const server = require('./server');
var user = require('./user');

io.listen(server);

// 用户名 - middleware
io.use((socket, next) => {
  let username = socket.handshake.query.username;
  if (username || username.length <= 20) {
    user.nickNames[username] = socket.id;
    user.currentRoom[socket.id] = username;
    return next();
  } else if (username && username.length > 20) {
    return next(new Error('username maxlength > 20'));
  }
  return next(new Error('authentication error'));
});




module.exports = io;