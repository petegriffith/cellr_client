import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'PreAuth Layout',
    component: () => import('layouts/PreAuth.vue'),
    children: [
      { alias:'', path: '/splash', name: 'Splash', component: () => import('src/pages/Splash.vue')},
      { path: '/login', component: () => import('src/pages/Login.vue')},
      { path: '/register', component: () => import('src/pages/Register.vue')}
    ],
    meta: { authRequired: false }
  },
  {
    path: '/userCellr',
    name: 'userCellr',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { alias:'', path: '/wineList', component: () => import('src/pages/WineList.vue') },
      { path: '/addWine', component: () => import('src/pages/AddWine.vue') },
      { path: '/wineEncounters', component: () => import('src/pages/WineEncounters.vue') },
    ],
    meta: { authRequired: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
