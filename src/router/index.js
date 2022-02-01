import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import NotFoundPage from '@/pages/404';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
