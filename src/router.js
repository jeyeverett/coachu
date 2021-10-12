import { createRouter, createWebHistory } from 'vue-router';
import CoachList from './pages/coaches/CoachList';
import CoachDetails from './pages/coaches/CoachDetails';
import CoachContact from './pages/coaches/CoachContact';
import CoachReg from './pages/coaches/CoachReg';
import ReqReceived from './pages/requests/ReqReceived';
import NotFound from './pages/NotFound';
import UserAuth from './pages/auth/UserAuth';

import store from './store/store';

const router = createRouter({
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      component: CoachList,
      children: [
        {
          name: 'coach',
          path: ':coachId',
          component: CoachDetails,
          props: true,
          children: [
            {
              name: 'contact',
              path: 'contact',
              component: CoachContact,
              props: true
            }
          ]
        }
      ]
    },
    {
      path: '/register',
      component: CoachReg,
      meta: {
        auth: true
      }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        noAuth: true
      }
    },
    {
      path: '/requests',
      component: ReqReceived,
      meta: {
        auth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    savedPosition ? savedPosition : { top: 0, left: 0 };
  }
});

router.beforeEach((to, _, next) => {
  if (to.meta.auth && !store.getters.isLoggedIn) {
    next('/auth');
  } else if (to.meta.noAuth && store.getters.isLoggedIn) {
    next('/coaches');
  } else {
    next();
  }
});

router.afterEach(() => {
  store.dispatch('loadingError', null);
});

export default router;
