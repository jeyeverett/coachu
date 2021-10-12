import { createRouter, createWebHistory } from 'vue-router';
const CoachList = () => import('./pages/coaches/CoachList');
const CoachDetails = () => import('./pages/coaches/CoachDetails');
const CoachContact = () => import('./pages/coaches/CoachContact');
const CoachReg = () => import('./pages/coaches/CoachReg');
const ReqReceived = () => import('./pages/requests/ReqReceived');
import NotFound from './pages/NotFound';
const UserAuth = () => import('./pages/auth/UserAuth');

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
