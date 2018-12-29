<template>
  <div id="app">
    <router-view/>
    <loading :isShow="isShow"></loading>
    <toast :message="message" :isShow="showtoast" @closetoast="closetoast"></toast>
  </div>
  

</template>
<script>
import loading from "@/common/loading";
import toast from "@/common/toast";
export default {
  components: {
    loading,
    toast
  },
  data() {
    return {
      isShow: false,
      //
      message: '',
      showtoast: false
    };
  },
  created() {
    EventVue.$on("loading", isShow => {
      this.isShow = isShow;
    });
    EventVue.$on("showtoast", (message) => {
      this.message = message;
      this.showtoast = true;
    });
  },
  mounted() {
  },
  methods:{
    closetoast () {
      this.message = '';
      this.showtoast = false;
    }
  }
}
</script>
<style>
#app {
  max-width: 750px;
  margin: 0 auto;
  background-color: #fff;
  height: 100%;
  position: relative;
}
</style>
