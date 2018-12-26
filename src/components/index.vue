<template>
  <div class="page" v-title="roomName">
    <div class="header">{{username}}</div>
    <ul>
      <li :class="{'fl': item.type === 'others', 'center': item.type === 'notice', 'fr': item.type === 'self'}" v-for="(item, index) in message" :key="index">
        {{item.msg}}
      </li>
    </ul>
  </div>
</template>
<script>

import io from 'socket.io-client';
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      username: Cookies.get('username'),
      socket: '',
      //
      roomName: '',
      message: []
    }
  },
  created () {
    this.socket = io('http://localhost:3000?username=' + this.username, {
      // forceNew: false,
      // path: '/'
    });
    this.socket.on('joinRoom', this.joinRoom);
    this.socket.on('notice', this.notice);
  },
  mounted() {
    
  },
  methods: {
    joinRoom (res) {
      this.roomName = res.roomName;
    },
    notice (res) {
      this.message.push({
        type: 'notice',
        msg: res.text
      })
      console.log(res)
    }
  }
}
</script>
<style lang="scss" scoped>

.page{
  background: rgb(235, 235, 235);
  padding-top: 0.2rem;
}
.header{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #333;
  font-size: 0.32rem;
  background: #fff;
  border-bottom: 1px solid #e3e3e3;
}
.fl{
  float: left;
  background-color: #fff;
}
.fr{
  float: right;
  background-color: rgb(149, 243, 81);
}

ul{
  clear: both;
  overflow: hidden;
  padding-top: 0.8rem;
  li{
    max-width: 5rem;
    padding: 0.1rem;
    word-break: break-all;
    line-height: 0.34rem;
    margin-bottom: 0.2rem;
    clear: both;
    &.center{
      text-align: center;
      max-width: none;
      width: 100%;
      color: #999;
      padding: 0.1rem 1.6rem;
    }
  }
}
</style>
