import { createRouter, createWebHistory } from 'vue-router';
import CoachList from './pages/coaches/CoachList';
import CoachDetails from './pages/coaches/CoachDetails';
import CoachContact from './pages/coaches/CoachContact';
import CoachReg from './pages/coaches/CoachReg';
import ReqReceived from './pages/requests/ReqReceived';
import NotFound from './pages/NotFound';

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
      component: CoachReg
    },
    {
      path: '/requests',
      component: ReqReceived
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

export default router;
