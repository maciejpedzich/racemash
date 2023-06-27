import { createRouter, createWebHistory } from 'vue-router';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    beforeEnter: (_to: unknown, _from: unknown, next: () => void) => {
      if (userSubmittedAllVotes.value) {
        return next();
      } else {
        return false;
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
