import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import Resume from './pages/Resume.vue'
import Auth from './pages/Auth.vue'
import Profile from './pages/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: '/resume'
  },
  {
    path: '/resume',
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