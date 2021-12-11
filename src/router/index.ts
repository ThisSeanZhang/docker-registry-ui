import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthPage from '../views/AuthPage.vue';
import Search from '../views/Search.vue';
import SearchDefault from '@/components/search/Default.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Search',
    component: Search,
    children: [
      {
        path: '/',
        component: SearchDefault,
      },
    ],
  }, {
    path: '/auth',
    name: 'AuthPage',
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
