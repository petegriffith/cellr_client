import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/PreAuth.vue'),
    children: [
      { alias:'', path: 'Splash', name: 'Splash', component: () => import('src/pages/Splash.vue')},
      { path: 'Login', component: () => import('src/pages/Login.vue')},
      { path: 'Register', component: () => import('src/pages/Register.vue')}
    ]
  },
  {
    path: '/yourCellr',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'WineList', component: () => import('src/pages/WineList.vue') },
      { path: 'AddWine', component: () => import('src/pages/AddWine.vue') },
      { path: 'WineEncounters', component: () => import('src/pages/WineEncounters.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
