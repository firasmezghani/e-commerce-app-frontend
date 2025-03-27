import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ProductsPage from './views/ProductsPage.vue';
import CartPage from './views/CartPage.vue';
import AddProduct from './views/AddProduct.vue'; 
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ProductDetails from './views/ProductDetails.vue';
import OrderHistory from './views/OrderHistory.vue';
import CheckoutPage from './views/Checkout.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/products', component: ProductsPage },
  { path: '/cart', component: CartPage },
  { path: '/add-product', component: AddProduct },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/product/:id', component: ProductDetails },
  { path: '/orders', component: OrderHistory },
  { path: '/checkout', component: CheckoutPage }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
