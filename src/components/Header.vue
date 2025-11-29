<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__logo">
        HRhub
      </router-link>

      <nav class="header__nav">
        <div class="nav__links">
          <router-link to="/" class="nav__link">Главная</router-link>
          <router-link to="/services" class="nav__link">Специалисты</router-link>
          <router-link to="/about" class="nav__link">О нас</router-link>
        </div>
        
        <div v-if="isAuthenticated" class="user-menu">
          <router-link to="/profile" class="user-profile-link">
            <div class="user-avatar">
              <div v-if="user.avatar" class="avatar-img" :style="{ backgroundImage: `url(${user.avatar})` }"></div>
              <div v-else class="avatar-placeholder">{{ userInitials }}</div>
            </div>
            <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
          </router-link>
          <button class="logout-btn" @click="handleLogout">
            Выйти
          </button>
        </div>
        
        <router-link v-else to="/auth" class="login-btn">
          Вход
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isAuthenticated = ref(false)
const user = ref({
  firstName: '',
  lastName: '',
  avatar: null
})

const API_URL = 'http://localhost:3000'

const userInitials = computed(() => {
  const { firstName, lastName } = user.value
  return firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : 'U'
})

onMounted(() => {
  checkAuth()
})

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) return null
    
    const res = await axios.get(`${API_URL}/users/profile/me`)
    
    const userData = {
      firstName: res.data.students?.firstName || 'Пользователь',
      lastName: res.data.students?.lastName || '',
      avatar: res.data.students?.avatar || null
    }
    
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  } catch (error) {
    console.error('Ошибка получения профиля:', error)
    return null
  }
}

const checkAuth = async () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const userData = localStorage.getItem('user')
  
  if (token && token !== 'undefined' && token !== 'null') {
    if (userData) {
      user.value = JSON.parse(userData)
      isAuthenticated.value = true
    } else {
      const profile = await fetchUserProfile()
      if (profile) {
        user.value = profile
        isAuthenticated.value = true
      }
    }
  }
}

const clearAuthData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
}

const handleLogout = () => {
  clearAuthData()
  isAuthenticated.value = false
  user.value = { firstName: '', lastName: '', avatar: null }
  router.push('/')
}
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
}

.header__container {
  max-width: 1260px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.header__logo {
  font-family: "Unbounded", sans-serif;
  font-size: 28px;
  font-weight: 700;
  background-color: #5E61FF;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav__links {
  display: flex;
  gap: 24px;
}

.nav__link {
  color: #4B5563;
  font-weight: 500;
  font-size: 15px;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav__link:hover {
  color: #5E61FF;
  background: rgba(94, 97, 255, 0.05);
}

.nav__link.router-link-active {
  color: #5E61FF;
  font-weight: 600;
}

.login-btn {
  background: linear-gradient(135deg, #5E61FF, #8B5CF6);
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(94, 97, 255, 0.25);
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(94, 97, 255, 0.35);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-profile-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #5E61FF;
}

.avatar-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 13px;
}

.user-name {
  font-weight: 600;
  color: #1F2937;
  font-size: 14px;
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logout-btn {
  background: #EF4444;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #DC2626;
  transform: translateY(-1px);
}
</style>