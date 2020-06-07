import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/',
    children: [
      {
        path: '/markdown-edit',
        name: 'MarkdownEdit',
        component: () => import('../pages/markdown/markdown.vue')
      },
      {
        path: '/',
        name: 'Default',
        component: () => import('../pages/markdown/markdown-list.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
