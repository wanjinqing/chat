
var user = {
  nickNames: {}, // 用户名 {username: socket.id}, 唯一
  currentRoom: {}, // socket.id: username
  uuids: {}, // 所有用户的uuid
  guestNumber: 0
}
module.exports = user;