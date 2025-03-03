import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import CalendarView from '../views/CalendarView.vue'
import PropertiesView from '../views/PropertiesView.vue'
import NotFoundView from '../views/NotFoundView.vue' // Importa el componente 404
import HomeView from '../views/HomeView.vue'

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
      redirect: { name: 'calendar' },
      meta: { layout: 'default' }, // layout con header y footer
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: { layout: 'default' }, // layout con header y footer
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { layout: 'default' }, // layout con header y footer
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertiesView,
      meta: { layout: 'default' }, // layout con header y footer
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: { layout: 'auth' }, // layout sin header ni footer
    },
  ],
})

export default router
