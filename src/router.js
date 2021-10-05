import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: null
    },
    {
      path: '/coaches',
      component: null,
      children: [
        {
          path: ':coachId',
          component: null,
          children: [
            {
              path: 'contact',
              component: null
            }
          ]
        }
      ]
    },
    {
      path: 'register',
      component: null
    },
    {
      path: '/requests'
    },
    {
      path: '/:notFound(.*)',
      component: null
    }
  ],
  history: createWebHistory()
});

export default router;
