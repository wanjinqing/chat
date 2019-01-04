<template>
  <div class="page" v-title="'房间'">
    <div class="header">{{roomName}}</div>
    <div class="ul">
      <div v-for="(item, index) in message" :key="index">

       <div class="li fl left clear" v-if="item.type === 'others'">
          <div class="fl userimg"><img src="@/assets/img/user.jpg" alt=""></div>
          <div class="fl text">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.message}}</div>
          </div>
        </div>
        <div class="li center" v-if="item.type === 'connect_notice'">
          {{item.message}}
        </div>
        <div class="li fr right" v-if="item.type === 'self'">
          <div class="fr userimg"><img src="@/assets/img/user.jpg" alt=""></div>
          <div class="fr text">
            <div class="desc">{{item.message}}</div>
          </div>
        </div>

      </div>
    </div>
    <div class="footer">
      <div class="clear cell">
        <textarea ref="textarea" class="fl" @input="input" v-model="value" :rows="1"></textarea>
        <button v-wave class="fr" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>
<script>

import io from 'socket.io-client';
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      username: Cookies.get('username'),
      roomName: this.$route.query.roomName,
      socket: '',
      //
      value: '',
      message: [],
      rememberH: ''
    }
  },
  created () {
    this.socket = io(process.env.VUE_APP_BASE_URL + '?username=' + this.username + '&roomName=' + this.roomName, {
      // forceNew: false,
      // path: '/'
    });
    this.socket.on('connect', () => {
      this.socket.on('joinRoom', this.joinRoom);
      this.socket.on('connect_notice', this.connectNotice);
      this.socket.on('receive', this.receive);
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect')
    });
    this.socket.on('connect_error', () => {
      console.log('connect_error')
    });
    this.socket.on('connect_timeout', () => {
      console.log('connect_timeout')
    });
    this.socket.on('error', () => {
      console.log('error')
    });
    this.socket.on('reconnect', () => {
      console.log('reconnect')
    });
    this.socket.on('reconnect_attempt', () => {
      console.log('reconnect_attempt')
    });
    this.socket.on('reconnecting', () => {
      console.log('reconnecting')
    });
    this.socket.on('reconnect_error', () => {
      console.log('reconnect_error')
    });
    this.socket.on('reconnect_failed', () => {
      console.log('reconnect_failed')
    });
    this.socket.on('ping', () => {
      // console.log('ping')
    });
    this.socket.on('pong', () => {
      // console.log('pong')
    });
  },
  mounted() {
    
  },
  methods: {
    // socket
    joinRoom (d) {
      this.roomName = d.roomName;
    },
    connectNotice (d) {
      this.message.push({
        type: 'connect_notice',
        message: d.text
      })
    },
    // 重置文本框
    resetTextarea () {
      this.value = '';
      this.$refs['textarea'].style.height = 'auto';
    },
    // 输入
    input (e) {
      e.target.style.height = 'auto';
      let scrollHeight = e.target.scrollHeight;
      if (scrollHeight < 100) {
        e.target.style.overflowY = 'hidden';
        e.target.style.height = scrollHeight + 'px';
        this.rememberH = scrollHeight;
      } else {
        e.target.style.overflowY = 'auto';
        e.target.style.height = this.rememberH + 'px';
      }
    },
    // 发送
    send () {
      if ((this.value + '').length) {
        this.message.push({
          type: 'self',
          message: this.value,
          name: this.username
        });
        this.socket.emit('send', {
          type: 'text',
          message: this.value,
          name: this.username
        }, (d) => {
          console.log(d)
        })
        this.resetTextarea();
      }
    },
    // 接收
    receive (d) {
      if (d.type === 'text') {
        this.message.push({
          type: 'others',
          message: d.message,
          name: d.name
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.page{
  background: rgb(235, 235, 235);
  padding-top: 0.2rem;
  height: 100%;
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


.ul{
  background: rgb(235, 235, 235);
  clear: both;
  overflow: hidden;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  .li{
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
      margin: 0;
    }
    &.left{
      
      .userimg{
        width: 0.5rem;
        height: 0.5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        padding-left: 0.1rem;
        .name{
          
          font-size: 0.26rem;
          color: #888;
          line-height: 0.28rem;
          padding-bottom: 0.1rem;
        }
        .desc{
          background-color: #fff;
          max-width: 5rem;
          padding: 0.1rem;
        }
      }
    }
    &.right{
      .userimg{
        width: 0.5rem;
        height: 0.5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        padding-right: 0.1rem;
        .name{
          text-align: right;
          font-size: 0.26rem;
          color: #888;
          line-height: 0.28rem;
          padding-bottom: 0.1rem;
        }
        .desc{
          background-color: #fff;
          max-width: 5rem;
          padding: 0.1rem;
        }
      }
    }
  }
}

.footer{
  background-color: rgb(243,243,243);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #e3e3e3;
  padding: 0.1rem;

  .cell{
    width: 100%;
    position: relative;
    textarea{
      padding: 0.09rem;
      width: 75%;
      resize:none;
      border: none;
      border-radius: 0.04rem;
      height: 0.6rem;
      line-height: 0.42rem;
      font-size: 0.3rem;
      outline: none;
      word-break: break-all;
    }
    button{
      position: absolute;
      bottom: 0;
      right: 0;
      outline: none;
      border: none;
      width: 20%;
      height: 0.6rem;
      border-radius: 0.04rem;
      text-align: center;
      font-size: 0.28rem;
      color: #fff;
      background-color: #999;
    }
  }
}
</style>
