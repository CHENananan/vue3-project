import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue'),
        },
        {
          path: '/category/:id',
          component: () => import('@/views/Category/index.vue'),
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/Category/SubCategory/index.vue'),
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/Category/Detail/index.vue'),
        },
        {
          path: '/cart',
          component: () => import('@/views/Cart/index.vue'),
        },
        {
          path: '/checkout',
          component: () => import('@/views/Checkout/index.vue'),
        },
        {
          path: '/pay/:id',
          component: () => import('@/views/Pay/index.vue'),
        },
        {
          path: '/paycallback',
          component: () => import('@/views/PayBack/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
