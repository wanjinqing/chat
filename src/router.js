import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index';
import login from '@/components/login';

import Cookies from 'js-cookie';


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Cookies.get('username') === undefined) {
      next({ path: '/login' });
    }
  }
  
  next();
});
export default router;
