import Vue from 'vue'
import App from './App.vue'

// import VueSocketio from 'vue-socket.io';

import router from './router';
import store from './store';

import directives from '@/directives';
import filters from '@/filters';
import ajax from '@/api/ajax';

import '@/assets/sass/base.scss';

directives(Vue);

// Vue.use(new VueSocketio({
//   debug: true,
//   connection: 'http://localhost:3000',
//   vuex: {
//     store,
//     actionPrefix: 'socket_',
//     mutationPrefix: 'socket_'
//   }
// }));


ajax.install = function (Vue) {
  Vue.prototype.$ajax = ajax;
}
Vue.use(ajax);

Vue.config.productionTip = false


window.EventVue = new Vue();

filters(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
