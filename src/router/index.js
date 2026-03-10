import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import SigninView from '../views/SigninView.vue'
import HomepageView from '../views/HomepageView.vue'
import ProfileView from '../views/ProfileView.vue'
import HistoryView from '@/views/HistoryView.vue'
import authApi from '../api/authApi'

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
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  const token = localStorage.getItem('token')
  if (!token) {
    return next({ name: 'signin' })
  }

  try {
    // ✅ ใช้ endpoint จริง
    const res = await authApi.getUserByToken()

    if (res.data.success) {
      // (optional) เก็บ user ไว้ใช้
      // localStorage.setItem('user', JSON.stringify(res.data.data))
      return next()
    }

    throw new Error('Invalid token')
  } catch (err) {
    console.error('Auth check failed', err)
    localStorage.removeItem('token')
    return next({ name: 'signin' })
  }
})

export default router
