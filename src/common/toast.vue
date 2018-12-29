<template>
  <div class="toast" v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timer: ''
    };
  },
  created () {
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$emit('closetoast', false);
        }, 3000)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70%;
  > div{
    margin: 0 auto;
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.06rem;
    font-size: 0.28rem;
    line-height: 0.32rem;
  }
}
</style>
