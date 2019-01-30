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
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: ()=> import('@/views/leaderboard/index'),
      hidden: true
    },
    {
      path: '/viewSubmissions',
      name: 'viewSubmissions',
      component: ()=> import('@/views/Multimedia/view'),
      hidden: true
    },
    {
      path: '/addHotspot',
      name: 'addHotspot',
      component: ()=> import('@/views/hotspot/index'),
      hidden: true
    },
    {
      path: '/addNarrative',
      name: 'addNarrative',
      component: ()=> import('@/views/narrative/index'),
      hidden: true
    },
    {
      path: '/mission',
      name: 'mission',
      component: ()=> import('@/views/mission/index'),
      hidden: true
    },
    {
      path: '/addMission',
      name: 'addMission',
      component: ()=> import('@/views/mission/add'),
      hidden: true
    },
    {
      path: '/viewQuiz',
      name: 'viewQuiz',
      component: ()=> import('@/views/mission/viewQuiz'),
      hidden: true
    },
    {
      path: '/editQuiz',
      name: 'editQuiz',
      component: ()=> import('@/views/mission/editQuiz'),
      hidden: true
    },
    {
      path: '/editWefie',
      name: 'editWefie',
      component: ()=> import('@/views/mission/editWefie'),
      hidden: true
    },
    {
      path: '/participant',
      name: 'participant',
      component: ()=> import('@/views/participant/index'),
      hidden: true
    },
    {
      path: '/trail',
      name: 'trail',
      component: ()=> import('@/views/trail/index'),
      hidden: true
    },
    {
      path: '/addTrail',
      name: 'addTrail',
      component: ()=> import('@/views/trail/addTrail'),
      hidden: true
    },
    {
      path: '/viewTrail',
      name: 'viewTrail',
      component: ()=> import('@/views/trail/view'),
      hidden: true
    },
    {
      path: '/editTrail',
      name: 'editTrail',
      component: ()=> import('@/views/trail/editTrail'),
      hidden: true
    }
  ]
})
