import { route } from 'quasar/wrappers';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';
import { fetchAndSetCurrentUser } from 'src/global/store/setters';
import { getCurrentCellr } from 'src/global/store/getters';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const auth = getAuth();

    const user = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
          void fetchAndSetCurrentUser(user.email, getCurrentCellr().id as number);
        }
        resolve(user);
      });
    });

    if (!user && to.meta.authRequired !== false) {
      alert('for some reason you have been logged out!');
      next({ name: 'Splash' });
    } else {
      next();
    }
  });

  return Router;
});
