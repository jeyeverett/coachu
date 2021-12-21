import { createRouter, createWebHistory } from 'vue-router';
const CoachList = () => import('./pages/coaches/CoachList');
const CoachDetails = () => import('./pages/coaches/CoachDetails');
const CoachContact = () => import('./pages/coaches/CoachContact');
const CoachReg = () => import('./pages/coaches/CoachReg');
const MessageReceived = () => import('./pages/messages/MessageReceived');
const UserAuth = () =>
  import(/* webpackChunkName: "user-auth" */ './pages/auth/UserAuth');
import NotFound from './pages/NotFound';

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
      path: '/messages',
      component: MessageReceived,
      meta: {
        auth: true
      }
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404ResourceNotFound',
      props: true,
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
