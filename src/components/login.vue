<template>
  <div class="page" v-title="'登录'">
    <input type="text" v-model="username" maxlength="20" placeholder="请输入用户名">
    <button v-wave @click="login">聊吧</button>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      username: ""
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
          this.$router.push({path: '/rooms'});
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  padding: 0.4rem 0.5rem;
  width: 100%;
  height: 100%;
  background: #fff;
}
input {
  width: 100%;
  height: 0.68rem;
  padding: 0 0.2rem;
  color: #333;
  line-height: 0.68rem;
  border: 1px solid #234;
  border-radius: 0.06rem;
  font-size: 0.28rem;
}
button {
  width: 100%;
  height: 0.68rem;
  background: #734;
  background-repeat: repeat;
  margin-top: 0.3rem;
  border: none;
  outline: none;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  color: #fff;
}
</style>
