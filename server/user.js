
var user = {
  nickNames: {}, // 用户名 {username: socket.id}
  uuids: {}, // 所有用户的uuid
  currentRoom: {}, // socket.id: username
  guestNumber: 0
}
module.exports = user;