/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory
} from 'vue-router';

import Home from '@/views/Home.vue';
import { useVote } from '@/composables/useVote';

const { userSubmittedAllVotes } = useVote();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vote',
    name: 'Vote',
    component: () => import('../views/Vote.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue'),
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (userSubmittedAllVotes.value) {
        return next();
      } else {
        return next('/');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash
      };
    }
  }
});

export default router;
