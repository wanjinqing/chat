<template>
  <div class="page" v-title="'房间列表'">
    <div class="box">
      <loadmore noDataText="暂无房间" @load="load" :loading="loading" :noData="list.length==0">
        <div class="item clear" v-for="(item, index) in list" :key="index">
          <div class="fl left">
            <div>房间名：{{item.roomName}}</div>
            <div>人数：{{item.person}}</div>
          </div>
          <div class="fr right">创建时间：{{item.createTime | parseTime('{y}-{m}-{d}')}}</div>
        </div>
      </loadmore>
    </div>
    

    <div class="buttonbox">
      <div class="button" v-wave @click="show">
        创建房间
      </div>
      
    </div>
    <div class="mask" @click="isshow=false;" v-if="isshow">
      <div class="content" @click.stop>
        <input type="text" v-model="roomName" maxlength="20" placeholder="请输入房间名称">
        <button v-wave  @click.stop="createRoom">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import loadmore from '@/common/loadmore.vue';
import Cookies from 'js-cookie'
export default {
  components: {
    loadmore
  },
  data() {
    return {
      isshow: false,
      //
      loading: true,
      pageNumber: 1,
      pageSize: 20,
      totalPages: 0,
      list: [],
      //
      roomName: '',
      username: Cookies.get('username')
    };
  },
  created () {
    if (!this.username) {
      this.$router.push({path: '/login'});
      return;
    }
    this.getData();
  },
  methods: {
    show () {
      this.isshow = true;
    },
    createRoom() {
      if (!this.roomName) {
        EventVue.$emit('showtoast', '请输入房间名称');
        return;
      }
      this.$ajax.post("/create-room", { username: this.username, roomName: this.roomName }).then(res => {
        if (res.code === '000000') {
          this.isshow = false;
          this.$router.push({path: '/', query: {roomName: this.roomName}});
        } else {
          EventVue.$emit('showtoast', res.message);
        }
      });
    },
    getData() {
      let request = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      this.$ajax.post('/get-rooms', request).then(res => {
        if (!res.data.content.length) {
          this.loading = false;
          return;
        }
        this.list = [...this.list, ...res.data.content];
        this.totalPages = res.data.totalPages;

        if (this.pageNumber === this.totalPages) {
          this.loading = false;
        }
      });
    },
    load() {
      if (this.pageNumber < this.totalPages) {
        this.pageNumber++;
        this.getData();
      } else {
        this.loading = false;
      }
    }
  },
  filters: {
    
  }
};
</script>
<style lang="scss" scoped>
.page{
  height: 100%;
  background-color: #f5f5f5;
}
.box{
  padding-bottom: 0.88rem;
}
.item{
  background: #fff;
  padding: 0.2rem 0.3rem;
  border-bottom: 1px solid #e3e3e3;
  .left{
    > div{
      font-size: 0.28rem;
      line-height: 0.36rem;
    }
  }
  .right{
    font-size: 0.28rem;
    line-height: 0.72rem;
    color: #999;
  }
}
.buttonbox{
  position: fixed;
  z-index: 3;
  bottom: 0;
  text-align: center;
  background-color: #734;
  width: 100%;
  .button{
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.32rem;
    color: #fff;
  }
}
.mask{
  position: fixed;
  z-index: 3;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  background: rgba(0,0,0,0.6);
  .content{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 80%;
    height: 2.88rem;
    background: #fff;
    border-radius: 0.06rem;
    padding: 0.3rem;
    input{
      width: 100%;
      height: 0.68rem;
      line-height: 0.68rem;
      border: 1px solid #734;      
      outline: none;
      font-size: 0.32rem;
      padding: 0 0.1rem;
      border-radius: 0.06rem;
    }
    button{
      width: 100%;
      height: 0.68rem;
      outline: none;
      border: none;
      border-radius: 0.06rem;
      margin-top: 0.7rem;
      background-color: #734;
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.32rem;
      color: #fff;
      
    }
  }
}
</style>
