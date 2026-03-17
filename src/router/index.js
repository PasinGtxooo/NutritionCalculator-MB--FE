import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import SigninView from '../views/SigninView.vue'
import HomepageView from '../views/HomepageView.vue'
import ProfileView from '../views/ProfileView.vue'
import HistoryView from '@/views/HistoryView.vue'

const routes = [
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/signin', name: 'signin', component: SigninView },
  { path: '/profile',name: 'profile',component: ProfileView,meta: { requiresAuth: true },},
  { path: '/homepage',name: 'homepage',component: HomepageView,meta: { requiresAuth: true },},
  { path: '/history',name: 'history',component: HistoryView,meta: { requiresAuth: true },},
  { path: '/:pathMatch(.*)', redirect: '/signin' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  const token = localStorage.getItem('token')
  if (!token) {
    return next({ name: 'signin' })
  }

  return next()
})

export default router
