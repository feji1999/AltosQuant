import { useAuthStore } from 'src/stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/signup',
    component: () => import('pages/SignupPage.vue')
  },
  {
    path: '/dashboard',
    component: () => import('pages/Dashboard.vue'),
    meta: { requiresAuth: true }
  }
];

// Add Navigation Guard
export default routes.map(route => {
  return {
    ...route,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();
      if (to.meta.requiresAuth && !auth.user) {
        next('/login');
      } else {
        next();
      }
    }
  };
});
