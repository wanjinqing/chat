<template>
  <div class="page" v-title="'房间列表'">
    <div class="item clear" v-for="(item, index) in list" :key="index">
      <div class="fl left">
        <div>房间名：{{item.name}}</div>
        <div>人数：{{item.person}}</div>
      </div>
      <div class="fr right">创建时间：{{item.createTime | parseTime('{y}-{m}-{d}')}}</div>
    </div>

    <div class="buttonbox">
      <div class="button" v-wave>
        创建房间
      </div>
      
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      list: [
        {
          name: 'rooms',
          createTime: new Date().getTime(),
          person: 23
        },
        {
          name: 'rooms',
          createTime: new Date().getTime(),
          person: 23
        },
        {
          name: 'rooms',
          createTime: new Date().getTime(),
          person: 23
        }
      ]
    };
  },
  mounted() {},
  methods: {
    login() {
      if (!this.username) {
        EventVue.$emit('showtoast', '用户名不能为空');
        return;
      }
      this.$ajax.post("/login", { username: this.username }).then(res => {
        if (res.code === '000000') {
          Cookies.set("username", res.data);
          this.$router.push("/rooms");
        }
      });
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
</style>
