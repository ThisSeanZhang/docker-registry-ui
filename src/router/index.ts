import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthPage from '../views/AuthPage.vue';
import SearchDefault from '@/components/image/Default.vue';
import ImageTag from '@/components/image/Tag.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'SearchDefault',
    component: SearchDefault,
  }, {
    path: '/images/:name(.*)/tags',
    name: 'ImageTag',
    component: ImageTag,
  }, {
  //   path: '/images/:name(.*)/aaa',
  //   name: 'AuthPage2',
  //   component: AuthPage,
  // }, {
    path: '/auth',
    name: 'AuthPage',
    component: AuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const defaultTitle = 'Docker Registry UI';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title as string : defaultTitle;
  next();
});
export default router;
