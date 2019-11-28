import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
// 解决vue-router3.1之后相同路由跳转错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/index.vue'),
    children: [{
      path: 'subjectList',
      name: 'subjectList',
      component: () => import('../views/subjectList.vue'),
      children:[{
        path: 'addPaper',
        name: 'addPaper',
        component: () => import('../views/addPaper.vue')
      }]
    },{
      path: 'subjectType',
      name: 'subjectType',
      component: () => import('../views/subjectType.vue')
    }, {
      path: 'userType',
      name: 'userType',
      component: () => import('../views/userType.vue')
    }, {
      path: 'subject',
      name: 'subject',
      component: () => import('../views/subject.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
