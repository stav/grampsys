import Vue      from 'vue'
import Router   from 'vue-router'
import Home     from '@/views/Home.vue'
import Tree     from '@/views/Tree.vue'
import Timeline from '@/views/Timeline.vue'
import Database from '@/views/Database.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    },
    {
      path: '/database',
      name: 'database',
      component: Database
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/timeline/:tab',
      props: true,
      component: Timeline
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
