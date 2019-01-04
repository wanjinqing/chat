

function User () {
  this.nickNames = {}; // 用户名 {username: socket.id}, 唯一 <所有用户>
  this.socketIds = {}; // socket.id: username <所有用户>
  this.uuids = {}; // 所有用户的uuid
  this.currentRoom = {} // 房间对应的 roomname : { usernames: [], createTime, person}
}

User.prototype.add = function (username, socketid) {
  this.nickNames[username] = socketid;
  this.socketIds[socketid] = username;
}

User.prototype.remove = function (socketid) {
  var username = user.socketIds[socketid];
  delete user.socketIds[socketid];
  delete user.nickNames[username];
}
User.prototype.createRoom = function (roomName) {
  this.currentRoom[roomName] = {
    usernames: [],
    createTime: new Date().getTime(),
    person: 0
  }
}

User.prototype.comeinRoom = function (roomName, username) {
  if (this.currentRoom[roomName]) {
    // 已经加入的不能重复
    if (this.currentRoom[roomName].usernames.indexOf(username) > -1) {
      return;
    }
    this.currentRoom[roomName].usernames.push(username);
    this.currentRoom[roomName].person++;
  } else {
    console.log('没有这个房间');
  }
}

User.prototype.getRooms = function () {
  var arr = []
  Object.keys(this.currentRoom).forEach(key => {
    arr.push({ ...this.currentRoom[key], roomName: key});
  })
  return arr;
}

var user = new User();

module.exports = user;