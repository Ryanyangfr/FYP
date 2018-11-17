import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/passwordChange',
      name: 'ChangePassword',
      component: () => import('@/views/login/changePassword'),
      hidden: true
    },
    {
      path: '/generateInstanceID',
      name: 'generateInstanceID',
      component: () => import('@/views/instance/instanceGenerator'),
      hidden: true
    },
    {
      path: '/uploadMultimedia',
      name: 'uploadMultimedia',
      component: ()=> import('@/views/Multimedia/upload'),
      hidden: true
    }
  ]
})
