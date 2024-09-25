import ProductView from './../views/ProductView.vue';
import { useAuthStore } from '@/stores/auth';
import AboutView from '@/views/AboutView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/user/ProfileView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
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

router.beforeEach((to, from) => {
  const store = useAuthStore();

  if (localStorage.getItem("id") && store.user.id == "") {
    store.user.id = localStorage.getItem("id");
    store.user.email = localStorage.getItem("email");
    store.user.role = localStorage.getItem("role");
    store.user.isAuthenticated = localStorage.getItem("isAuthenticated") == "true" ? true : false;
    store.user.access_token = localStorage.getItem("access_token");
    store.user.refresh_token = localStorage.getItem("refresh_token");
  }

  if (to.meta.requiresAdmin && !(store.user.role == "ADMIN")) {
    return {
      path: "/home",
    };
  }

  if (to.meta.requiresAuth && !store.user.isAuthenticated && !(store.user.role == "USER")) {
    return {
      path: "/home",
    };
  }
});

export default router
