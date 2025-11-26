import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Resume from './pages/Resume.vue'
import Auth from './pages/Auth.vue'
import List from './pages/Spisok.vue'
import Profile from './pages/Profile.vue'
import Error404 from './pages/Error404.vue'

const routes = [
  {
    path: '/',
    redirect: '/list'
  },
   {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404
  },
  {
    path: '/resume/:id',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(createPinia()) 

app.mount('#app')