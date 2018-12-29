<template>
  <div :class="{'isClose': !isShow}" class="loader" @touchstart.prevent>
    <div class="circle-spin">
      <div class="loader-placeholder"></div>
      <div class="desc">加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
$size: 0.64rem;
$border: 0.07rem;


.loader {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.isClose{
    display: none;
  }
}

.circle-spin {
  border-radius: 0.06rem;
  width: 1.8rem;
  height: 1.8rem;
  background: rgba(0,0,0,0.7);
  text-align: center;
  color: #fff;
  padding-top: 0.3rem;
  .loader-placeholder {
    margin: 0 auto;
    border-radius: 50%;
    border: $border solid transparent;
    border-top: $border solid #fff;
    border-left: $border solid #fff;
    width: $size;
    height: $size;
    -webkit-animation: circle-spin 1s ease infinite;
    animation: circle-spin 1s ease infinite;
  }
  .desc{
    margin-top:0.32rem;
    font-size: 0.28rem;
  }
}




@keyframes circle-spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes circle-spin {
  0% {
    -webkit-transform: rotate(0);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
