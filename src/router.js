import Vue      from 'vue'
import Router   from 'vue-router'
import Home     from './views/Home.vue'
import Tree     from './views/Tree.vue'
import Unknown  from './views/Unknown.vue'
import Everyone from './views/Everyone.vue'
import Timeline from './views/Timeline.vue'

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
      path: '/timeline',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/unknown',
      name: 'unknown',
      component: Unknown
    },
    {
      path: '/everyone',
      name: 'everyone',
      component: Everyone
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
