import { createRouter, createWebHistory } from 'vue-router';

import { authGuard } from '@/guards/auth';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/vote',
    name: 'Vote',
    meta: { authRequired: true },
    component: () => import('../views/Vote.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(authGuard);

export default router;
