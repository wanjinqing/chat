const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const uuid = require('uuid');
// uuid.v1()

const app = express();
const config = require('./config');

var user = require('./user');

app.use(bodyparser.urlencoded({extende:true}));
app.use(bodyparser.json())

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.origin);
  res.header('Access-Control-Allow-Headers', config.headers);
  res.header('Access-Control-Allow-Methods', config.methods);
  // 如果你需要通过跨域AJAX发送cookie，需要打开withCredentials
  // res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
})

const resData = {
  '000000': {
    data: '',
    message: '成功',
    code: '000000'
  },
  '000001': {
    data: '',
    message: '用户名已存在',
    code: '000001'
  },
}

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/login', (req, res, next) => {
  let username = req.body.username;
  if (user.nickNames[username]) {
    res.send(resData['000001']);
    return;
  }
  resData['000000'].data = username;
  res.send(resData['000000']);
});

var server = http.createServer(app).listen(3000);

console.log('server.js');

module.exports = server;