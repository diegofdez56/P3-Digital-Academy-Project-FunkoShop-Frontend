import ProductView from './../views/ProductView.vue';
import { useAuthStore } from '@/stores/auth';
import AboutView from '@/views/AboutView.vue';
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
      name: 'about',
      component: AboutView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      // TODO uncomment later when login works
      // meta: { requiresAdmin: true },
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('@/views/admin/ProductsView.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('@/views/admin/OrdersView.vue'),
        },
        {
          path: 'sales-billing',
          name: 'admin-sales-billing',
          component: () => import('@/views/admin/SalesBillingView.vue'),
        },
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (localStorage.getItem("id") && store.user.id == "") {
    store.user.id = localStorage.getItem("id");
    store.user.email = localStorage.getItem("email");
    store.user.role = localStorage.getItem("role");
    store.user.isAuthenticated = localStorage.getItem("isAuthenticated") == "true" ? true : false;
    store.user.access_token = localStorage.getItem("access_token");
    store.user.refresh_token = localStorage.getItem("refresh_token");
  }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (store.user.isAuthenticated && store.user.role === 'ROLE_ADMIN') {
        next();
      } else {
        next({ path: '/', query: { redirect: to.fullPath } });
      }
    } else {
      next();
    }

});

export default router
