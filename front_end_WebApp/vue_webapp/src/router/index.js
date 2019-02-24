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
      path: '/landing',
      name: 'Home',
      component: () => import('@/views/landing/index'),
      hidden: true
    },
    {
      path: '/generateInstanceID',
      name: 'Generate Instance ID',
      component: () => import('@/views/instance/instanceGenerator'),
      hidden: true
    },
    {
      path: '/map',
      name: 'Live Map',
      component: () => import('@/views/LiveMap/index'),
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
      name: 'Leaderboard',
      component: ()=> import('@/views/leaderboard/index'),
      hidden: true
    },
    {
      path: '/viewSubmissions',
      name: 'View Submissions',
      component: ()=> import('@/views/Multimedia/view'),
      hidden: true
    },
    {
      path: '/viewHotspots',
      name: 'All Locations',
      component: ()=> import('@/views/hotspot/index'),
      hidden: true
    },
    {
      path: '/addHotspot',
      name: 'Add New Hotspot',
      component: ()=> import('@/views/hotspot/addHotspot'),
      hidden: true
    },
    {
      path: '/editHotspot',
      name: 'Edit Hotspot',
      component: ()=> import('@/views/hotspot/editHotspot'),
      hidden: true
    },
    {
      path: '/viewNarrative',
      name: 'All Narratives',
      component: ()=> import('@/views/narrative/index'),
      hidden: true
    },
    {
      path: '/addNarrative',
      name: 'Add Narrative',
      component: ()=> import('@/views/narrative/addNarrative'),
      hidden: true
    },
    {
      path: '/editNarrative',
      name: 'Edit Narrative',
      component: ()=> import('@/views/narrative/editNarrative'),
      hidden: true
    },
    {
      path: '/mission',
      name: 'All Missions',
      component: ()=> import('@/views/mission/index'),
      hidden: true
    },
    {
      path: '/addMission',
      name: 'Add Mission',
      component: ()=> import('@/views/mission/add'),
      hidden: true
    },
    {
      path: '/viewQuiz',
      name: 'View Quiz',
      component: ()=> import('@/views/mission/viewQuiz'),
      hidden: true
    },
    {
      path: '/editQuiz',
      name: 'Edit Quiz',
      component: ()=> import('@/views/mission/editQuiz'),
      hidden: true
    },
    {
      path: '/editWefie',
      name: 'Edit Wefie',
      component: ()=> import('@/views/mission/editWefie'),
      hidden: true
    },
    {
      path: '/editDrawing',
      name: 'Edit Drawing',
      component: ()=> import('@/views/mission/editDrawing'),
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
      name: 'View All Trails',
      component: ()=> import('@/views/trail/index'),
      hidden: true
    },
    {
      path: '/addTrail',
      name: 'Add Trail',
      component: ()=> import('@/views/trail/addTrail'),
      hidden: true
    },
    {
      path: '/viewTrail',
      name: 'View Trail Details',
      component: ()=> import('@/views/trail/view'),
      hidden: true
    },
    {
      path: '/editTrail',
      name: 'Edit Trail',
      component: ()=> import('@/views/trail/editTrail'),
      hidden: true
    },
    {
      path: '/editDragAndDrop',
      name: 'Edit Drag And Drop',
      component: ()=> import('@/views/mission/editDragAndDrop'),
      hidden: true
    },
    {
      path: '/notification',
      name: 'Notification',
      component: ()=> import('@/views/notification/notification'),
      hidden: true
    }
  ],

  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
