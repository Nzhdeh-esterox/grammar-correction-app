import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import GrammarCheckerView from '../views/GrammarCheckerView.vue';

import { authGuard } from './guards.js'

const routes = [
  {
    path: '/',
    redirect: '/signup'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: RegisterView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: GrammarCheckerView,
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
