import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/pages/index'
import logo from '@/pages/logo'
import indexcontent  from '@/components/indexcontent'
import management  from '@/components/management'
import user  from '@/components/user'
import xiugai  from '@/components/xiugai'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'logo',
      component: logo
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
     {
      path: '/indexcontent',
      name: 'indexcontent',
      component: indexcontent
    },
    {
      path: '/management',
      name: 'management',
      component: management,
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path:'/xiugai',
      name:'xiugai',
      component:xiugai
    },
  ]
})
