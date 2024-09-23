import ProductView from '@/components/ProductView.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about'
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
  ]
})

router.beforeEach(() => {
  const store = useAuthStore();

  if (localStorage.getItem("id") && store.user.id == "") {
    store.user.id = localStorage.getItem("id");
    store.user.email = localStorage.getItem("email");
    store.user.role = localStorage.getItem("role");
    store.user.isAuthenticated = localStorage.getItem("isAuthenticated") == "true" ? true : false;
    store.user.access_token = localStorage.getItem("access_token");
    store.user.refresh_token = localStorage.getItem("refresh_token");
  }

});

export default router
