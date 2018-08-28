import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import backStage from '@/components/backStage'
import articleManage from '@/components/articleManage'
import articleEdit from '@/components/articleEdit'
import articleRelease from '@/components/articleRelease'
import tagsManage from '@/components/tagsManage'
import messageManage from '@/components/messageManage'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/backStage',
      name:'backStage',
      component:backStage,
      redirect:'/backStage/articleManage',
      children:[
        {
          path:'articleManage',
          component:articleManage
        },
        {
          path:'articleEdit/:postId',
          name:'articleEdit',
          component:articleEdit
        },
        {
          path:'articleRelease',
          component:articleRelease
        },
        {
          path:'tagsManage',
          component:tagsManage
        },
        {
          path:'messageManage',
          component:messageManage
        }
      ]
    }
  ]
})
