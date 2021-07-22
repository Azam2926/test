import { createRouter, createWebHistory } from 'vue-router'
import Main from '../layouts/Main.vue'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'test',
        component: Test,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router