
var user = {
  nickNames: {}, // 用户名 {username: socket.id}, 唯一
  uuids: {}, // 所有用户的uuid
  currentRoom: {}, // socket.id: username
  guestNumber: 0
}
module.exports = user;