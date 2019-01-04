<template>
  <div
    class="scroll"
    ref="scroll"
  >
    <slot />

    <div v-if="!noData">
      <div
        class="loading"
        v-if="loading"
      >加载中...</div>
      <div v-else>
        <div
          class="footer"
          v-if="footer"
        >
          <div
            class="item-text"
            :class="loadcolor"
          >
            <span class="text">已经到底了</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="noData"
      v-else
    >
      <img src="@/assets/img/noData.png">
      <p>{{noDataText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    distance: {
      type: Number,
      default: 100 // px
    },
    loading: {
      type: Boolean,
      default: true
    },
    noData: {
      type: Boolean,
      default: false
    },
    loadcolor: {
      type: String,
      default: ""
    },
    footer: {
      type: Boolean,
      default: true
    },
    noDataText: {
      type: String,
      default: "暂无数据"
    }
  },
  data() {
    return {
      fn: ""
    };
  },
  mounted() {
    // 去抖
    this.$nextTick(() => {
      this.fn = this.debounce(this.scroll, 200);
      window.addEventListener("scroll", this.fn, false);
    });
  },
  methods: {
    scroll() {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      let scrollHeight =
        document.body.scrollHeight === 0
          ? document.documentElement.scrollHeight
          : document.body.scrollHeight;
      let clientHeight = document.body.clientHeight;
      if (scrollTop + clientHeight + this.distance >= scrollHeight) {
        this.$emit("load");
      }
    },
    debounce(method, delay) {
      var timer = null;
      return function() {
        var context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          method.apply(context, args);
        }, delay);
      };
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.fn);
  }
};
</script>
<style lang="scss" scoped>
.footer {
  text-align: center;
  padding-top: 0.38rem;
  line-height: 0.7rem;
  padding-bottom: 0.2rem;
}
.scroll {
  position: relative;
  // min-height: 100%;
}
.item-text {
  color: #cacaca;
  position: relative;
  display: inline-block;
  span {
    font-size: 0.26rem;
    position: relative;
    z-index: 2;
    &:after,
    &:before {
      content: " ";
      width: 0.8rem;
      height: 1px;
      position: absolute;
      z-index: 1;
      top: 50%;
      background-color: #ddd;
    }
    &:before {
      left: -1rem;
    }
    &:after {
      right: -1rem;
    }
  }

  p {
    margin-top: 0.2rem;
  }
}
.share {
  color: rgb(227, 101, 45);
  span {
    &:after,
    &:before {
      background-color: rgb(227, 101, 45);
    }
  }
}
.desc {
  text-align: center;
  line-height: 0.6rem;
  color: #cacaca;
}
.loading {
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.28rem;
  color: #999;
}
.noData {
  width: 100%;
  display: block;
  min-height: 5rem;
  padding-top: 2rem;
  img {
    width: 2.04rem;
    display: block;
    margin:0 auto;
  }
  p {
    font-size: 0.32rem;
    text-align: center;
    color: rgb(191, 191, 191);
    margin-top: 0.5rem;
  }
}
</style>
