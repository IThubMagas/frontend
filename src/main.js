import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css' 
import App from './App.vue'
import ResumeAbout from './components/resume/About.vue'
import ResumeSkills from './components/resume/Skills.vue'
import Auth from './pages/Auth.vue'

const routes = [
  {
    path: '/',
    redirect: '/about' // Перенаправление на /about по умолчанию
  },
  {
    path: '/about',
    name: 'About',
    component: ResumeAbout
  },
  {
    path: '/skills',
    name: 'Skills',
    component: ResumeSkills
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')