import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import CalendarView from '../views/CalendarView.vue'
import PropertiesView from '../views/PropertiesView.vue'
import NotFoundView from '../views/NotFoundView.vue' // Importa el componente 404
import HomeView from '../views/HomeView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'auth' }, // layout sin header ni footer
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      /* redirect: { name: 'calendar' }, */
      meta: { layout: 'default' }, // layout con header y footer
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: { layout: 'default', requiresAuth: true }, // layout con header y footer
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { layout: 'default', requiresAuth: true }, // layout con header y footer
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertiesView,
      meta: { layout: 'default', requiresAuth: true }, // layout con header y footer
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
      meta: { layout: 'auth' }, // pantalla pre-login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { layout: 'auth' }, // layout sin header ni footer
    },
  ],
})

function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expMs = payload.exp * 1000
    return Date.now() < expMs
  } catch {
    return false
  }
}

router.beforeEach((to) => {
  // permitir siempre reset-password (no requiere sesión)
  if (to.name === 'reset-password') return true

  const token = localStorage.getItem('access_token')
  const authed = token && isTokenValid(token)

  if (to.path === '/') {
    return authed ? { name: 'calendar' } : { name: 'login' }
  }

  if (to.meta.requiresAuth && !authed) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    return { name: 'login' }
  }

  if (to.name === 'login' && authed) {
    return { name: 'calendar' }
  }
})

export default router
