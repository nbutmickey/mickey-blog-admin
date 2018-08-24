// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局注册mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);
import  emoji from 'markdown-it-emoji'
mavonEditor.markdownIt.set(emoji);

import axios from 'axios'
Vue.prototype.$http=axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

router.beforeEach((to,from,next)=>{
  NProgress.start();
  if(sessionStorage.getItem('Token')){
    next();
    NProgress.done();
  }else{
    if(to.path==='/login'){
      next();
    }else{
      alert('您没有Token权限,即将跳转到登录页面!');
      next('/login');
    }
    NProgress.done();
  }
});

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
