<template>
  <div class="auth-container">
    <div class="auth-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
      <div class="glowing-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>

    <div class="auth-card">
      <div class="card-header">
        <div class="mode-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: currentMode === 'login' }"
            @click="switchTo('login')"
          >
            Вход
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: currentMode === 'signup' }"
            @click="switchTo('signup')"
          >
            Регистрация
          </button>
        </div>
      </div>

      <div class="card-body">
        <transition name="form-slide" mode="out-in">
          <div v-if="currentMode === 'login'" class="form-wrapper">
            <h2 class="form-title">Добро пожаловать!</h2>
            <p class="form-subtitle">Войдите в свой аккаунт</p>

            <form @submit.prevent="handleLogin" class="auth-form">
              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.email" 
                    type="email" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Email</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.password" 
                    type="password" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Пароль</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="form-options">
                <label class="checkbox">
                  <input type="checkbox" v-model="rememberMe" class="checkbox-input">
                  <span class="checkmark"></span>
                  Запомнить меня
                </label>
                <button type="button" class="text-link" @click="switchTo('forgot')">
                  Забыли пароль?
                </button>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="btn-loading">
                  <div class="spinner"></div>
                  Вход...
                </span>
                <span v-else>Войти</span>
              </button>

              <div class="divider">
                <span>или</span>
              </div>

              <button type="button" class="social-btn google-btn" @click="handleGoogleSignIn">
                <div class="social-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                Войти через Google
              </button>

              <div class="form-footer">
                <p>Нет аккаунта? 
                  <button type="button" class="text-link" @click="switchTo('signup')">
                    Зарегистрироваться
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div v-else-if="currentMode === 'signup'" class="form-wrapper">
            <h2 class="form-title">Создайте аккаунт</h2>
            <p class="form-subtitle">Присоединяйтесь к нашему сообществу</p>

            <form @submit.prevent="handleSignup" class="auth-form">
              <div class="name-grid">
                <div class="input-group">
                  <div class="input-wrapper">
                    <input 
                      v-model="formData.firstName" 
                      type="text" 
                      placeholder=" "
                      class="form-input"
                      required
                    >
                    <label class="input-label">Имя</label>
                    <div class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="input-group">
                  <div class="input-wrapper">
                    <input 
                      v-model="formData.lastName" 
                      type="text" 
                      placeholder=" "
                      class="form-input"
                      required
                    >
                    <label class="input-label">Фамилия</label>
                    <div class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.patronymic" 
                    type="text" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Отчество</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.email" 
                    type="email" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Email</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.phoneNumber" 
                    type="tel" 
                    placeholder=" "
                    class="form-input"
                  >
                  <label class="input-label">Телефон (необязательно)</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.password" 
                    type="password" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Пароль</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.confirmPassword" 
                    type="password" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Подтвердите пароль</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="btn-loading">
                  <div class="spinner"></div>
                  Регистрация...
                </span>
                <span v-else>Создать аккаунт</span>
              </button>

              <div class="form-footer">
                <p>Уже есть аккаунт? 
                  <button type="button" class="text-link" @click="switchTo('login')">
                    Войти
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div v-else-if="currentMode === 'verify'" class="form-wrapper">
            <h2 class="form-title">Подтверждение email</h2>
            <p class="form-subtitle">Введите код из письма</p>

            <form @submit.prevent="handleVerifyEmail" class="auth-form">
              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.verificationCode" 
                    type="text" 
                    placeholder=" "
                    class="form-input text-center"
                    maxlength="6"
                    required
                  >
                  <label class="input-label">Код подтверждения</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="btn-loading">
                  <div class="spinner"></div>
                  Проверка...
                </span>
                <span v-else>Подтвердить</span>
              </button>

              <div class="form-footer">
                <p>Не пришло письмо? 
                  <button type="button" class="text-link" @click="resendCode">
                    Отправить снова
                  </button>
                </p>
              </div>
            </form>
          </div>

          <div v-else-if="currentMode === 'forgot'" class="form-wrapper">
            <h2 class="form-title">Восстановление пароля</h2>
            <p class="form-subtitle">Введите email для сброса пароля</p>

            <form @submit.prevent="handleForgot" class="auth-form">
              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.email" 
                    type="email" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Email</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="btn-loading">
                  <div class="spinner"></div>
                  Отправка...
                </span>
                <span v-else>Отправить код</span>
              </button>

              <div class="form-footer">
                <button type="button" class="text-link" @click="switchTo('login')">
                  Вернуться ко входу
                </button>
              </div>
            </form>
          </div>

          <div v-else-if="currentMode === 'reset'" class="form-wrapper">
            <h2 class="form-title">Сброс пароля</h2>
            <p class="form-subtitle">Введите код и новый пароль</p>

            <form @submit.prevent="handleReset" class="auth-form">
              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.resetCode" 
                    type="text" 
                    placeholder=" "
                    class="form-input text-center"
                    maxlength="6"
                    required
                  >
                  <label class="input-label">Код сброса</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.password" 
                    type="password" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Новый пароль</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input 
                    v-model="formData.confirmPassword" 
                    type="password" 
                    placeholder=" "
                    class="form-input"
                    required
                  >
                  <label class="input-label">Подтвердите пароль</label>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" stroke-width="2"/>
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading">
                <span v-if="loading" class="btn-loading">
                  <div class="spinner"></div>
                  Сброс...
                </span>
                <span v-else>Сбросить пароль</span>
              </button>

              <div class="form-footer">
                <button type="button" class="text-link" @click="switchTo('login')">
                  Вернуться ко входу
                </button>
              </div>
            </form>
          </div>
        </transition>

        <transition name="notification">
          <div v-if="message" :class="['notification', error ? 'error' : 'success']">
            <div class="notification-content">
              <div class="notification-icon">
                <svg v-if="error" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M15 9L9 15" stroke="currentColor" stroke-width="2"/>
                  <path d="M9 9L15 15" stroke="currentColor" stroke-width="2"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" stroke-width="2"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <span>{{ message }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentMode = ref('login')
const rememberMe = ref(false)
const loading = ref(false)
const message = ref('')
const error = ref(false)

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  patronymic: '',
  phoneNumber: '',
  verificationCode: '',
  resetCode: ''
})

const API_URL = 'http://localhost:3000/auth'

onMounted(() => {
  animateBackground()
})

const animateBackground = () => {
  const shapes = document.querySelectorAll('.shape')
  shapes.forEach((shape, index) => {
    shape.style.animation = `float ${6 + index * 2}s ease-in-out infinite ${index * 0.5}s`
  })
}

const switchTo = (mode) => {
  currentMode.value = mode
  message.value = ''
  error.value = false
}

const setToken = (token) => {
  if (token) {
    if (rememberMe.value) {
      localStorage.setItem('token', token)
    } else {
      sessionStorage.setItem('token', token)
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

const handleLogin = async () => {
  if (!formData.email || !formData.password) return
  loading.value = true
  message.value = ''
  
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email: formData.email,
      password: formData.password
    })
    
    if (res.data.token) {
      setToken(res.data.token)
      message.value = 'Вход успешен!'
      error.value = false
      setTimeout(() => router.push('/profile'), 1000)
    } else {
      message.value = 'Токен не получен от сервера'
      error.value = true
    }
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка входа'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleSignup = async () => {
  if (formData.password !== formData.confirmPassword) {
    message.value = 'Пароли не совпадают'
    error.value = true
    return
  }
  loading.value = true
  
  try {
    const res = await axios.post(`${API_URL}/registration`, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      patronymic: formData.patronymic,
      email: formData.email,
      phoneNumber: formData.phoneNumber || '',
      password: formData.password
    })
    
    message.value = 'Код отправлен на email!'
    error.value = false
    switchTo('verify')
  } catch (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors
      message.value = errors.map(e => e.msg).join(', ')
    } else {
      message.value = err.response?.data?.message || 'Ошибка регистрации'
    }
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleVerifyEmail = async () => {
  loading.value = true
  try {
    const res = await axios.post(`${API_URL}/verify-email`, {
      email: formData.email,
      code: formData.verificationCode
    })
    
    if (res.data.token) {
      setToken(res.data.token)
      message.value = 'Email подтверждён!'
      error.value = false
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      message.value = 'Токен не получен после подтверждения'
      error.value = true
    }
  } catch (err) {
    message.value = err.response?.data?.message || 'Неверный код'
    error.value = true
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  loading.value = true
  try {
    await axios.post(`${API_URL}/resend-verify`, { email: formData.email })
    message.value = 'Новый код отправлен!'
    error.value = false
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleForgot = async () => {
  loading.value = true
  try {
    await axios.post(`${API_URL}/forgot-password`, { email: formData.email })
    message.value = 'Код отправлен на email!'
    error.value = false
    switchTo('reset')
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleReset = async () => {
  if (formData.password !== formData.confirmPassword) {
    message.value = 'Пароли не совпадают'
    error.value = true
    return
  }
  loading.value = true
  try {
    const res = await axios.post(`${API_URL}/reset-password`, {
      email: formData.email,
      resetCode: formData.resetCode,
      newPassword: formData.password
    })
    
    if (res.data.token) {
      setToken(res.data.token)
      message.value = 'Пароль сброшен!'
      error.value = false
      setTimeout(() => router.push('/dashboard'), 1000)
    } else {
      message.value = 'Токен не получен после сброса пароля'
      error.value = true
    }
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка сброса'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = () => {
  message.value = 'Google Sign-In будет доступен скоро'
  error.value = false
}
</script>
<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.shape-1 { width: 80px; height: 80px; top: 10%; left: 10%; }
.shape-2 { width: 120px; height: 120px; top: 60%; right: 10%; }
.shape-3 { width: 60px; height: 60px; bottom: 20%; left: 20%; }
.shape-4 { width: 100px; height: 100px; top: 30%; right: 20%; }
.shape-5 { width: 70px; height: 70px; bottom: 10%; right: 30%; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.glowing-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: #ff6b6b;
  top: 10%;
  left: 5%;
  animation: pulse 4s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: #4ecdc4;
  bottom: 10%;
  right: 5%;
  animation: pulse 6s ease-in-out infinite 1s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: #45b7d1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 5s ease-in-out infinite 2s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 10;
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
}

.mode-tabs {
  display: flex;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  padding: 4px;
}

.tab-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
  text-align: center;
}

.form-subtitle {
  color: #718096;
  text-align: center;
  margin-bottom: 32px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.name-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  position: relative;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px 48px 16px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: all 0.3s ease;
}

.form-input.text-center {
  text-align: center;
  letter-spacing: 8px;
  font-size: 18px;
  font-weight: 600;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:focus + .input-label,
.form-input:not(:placeholder-shown) + .input-label {
  transform: translateY(-24px) scale(0.875);
  color: #667eea;
}

.input-label {
  position: absolute;
  left: 16px;
  top: 16px;
  color: #a0aec0;
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
  background: white;
  padding: 0 4px;
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e0;
  width: 20px;
  height: 20px;
}

.form-input:focus ~ .input-icon {
  color: #667eea;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.text-link {
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

.text-link:hover {
  color: #5a67d8;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #a0aec0;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider::before {
  margin-right: 16px;
}

.divider::after {
  margin-left: 16px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: #667eea;
  transform: translateY(-1px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.google-btn {
  color: #4a5568;
}

.form-footer {
  text-align: center;
  color: #718096;
  font-size: 14px;
}

.form-footer p {
  margin: 0;
}

.form-slide-enter-active {
  transition: all 0.3s ease-out;
}

.form-slide-leave-active {
  transition: all 0.2s ease-in;
}

.form-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.form-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.2s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 20px;
  border-radius: 12px;
  font-weight: 500;
  z-index: 1000;
  max-width: 320px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.notification.success {
  background: #48bb78;
  color: white;
}

.notification.error {
  background: #f56565;
  color: white;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.notification-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .auth-card {
    margin: 20px;
    padding: 24px;
  }
  
  .name-grid {
    grid-template-columns: 1fr;
  }
}
</style>