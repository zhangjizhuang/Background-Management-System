// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/reset.css'
import store from './store/state'

Vue.config.productionTip = false
Vue.prototype.bus=new Vue();
// 时间过滤器
Vue.filter('getTime',function(time){
	var date = new Date(time);
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+"\xa0\xa0\xa0"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
})

import axios from 'axios'
// request拦截器，实现loading加载
axios.interceptors.request.use(config => {
  store.commit('setLoading',true); //在请求发出之前进行一些操作
  return config
})

axios.interceptors.response.use(data => {
  store.commit('setLoading',false); //在请求发出之前进行一些操作
  return data
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
