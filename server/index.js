// supervisor --inspect index.js


const socketio = require('./socketio');

var user = require('./user');
var Event = require('./Event');



socketio.on('connection', (socket) => {

  let username = socket.handshake.query.username;
  let roomName = socket.handshake.query.roomName;
  console.log(user)

  Event.joinRoom(socket, roomName);

  Event.connectNotice(socket, roomName, username);
  
  Event.listen(socket, roomName);

  Event.leaveRoom(socket, user)

});