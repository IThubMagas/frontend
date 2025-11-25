<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="card-header">
        <div class="mode-tabs">
          <button class="tab-btn" :class="{ active: currentMode === 'login' }" @click="switchTo('login')">
            Вход
          </button>
          <button class="tab-btn" :class="{ active: currentMode === 'signup' }" @click="switchTo('signup')">
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
                  <input v-model="formData.email" type="email" placeholder="Email" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.password" type="password" placeholder="Пароль" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="form-options">
                <label class="checkbox">
                  <input type="checkbox" v-model="rememberMe" class="checkbox-input">
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
                    <input v-model="formData.firstName" type="text" placeholder="Имя" class="form-input" required>
                    <div class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                          stroke="currentColor" stroke-width="2" />
                        <path
                          d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                          stroke="currentColor" stroke-width="2" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="input-group">
                  <div class="input-wrapper">
                    <input v-model="formData.lastName" type="text" placeholder="Фамилия" class="form-input" required>
                    <div class="input-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                          stroke="currentColor" stroke-width="2" />
                        <path
                          d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                          stroke="currentColor" stroke-width="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.patronymic" type="text" placeholder="Отчество" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                        stroke="currentColor" stroke-width="2" />
                      <path
                        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                        stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.email" type="email" placeholder="Email" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.phoneNumber" type="tel" placeholder="Телефон" class="form-input">
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.password" type="password" placeholder="Пароль" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.confirmPassword" type="password" placeholder="Подтвердите пароль"
                    class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
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
                  <input v-model="formData.verificationCode" type="text" placeholder="Код подтверждения"
                    class="form-input text-center" maxlength="6" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12"
                        stroke="currentColor" stroke-width="2" />
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
                  <input v-model="formData.email" type="email" placeholder="Email" class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
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
                  <input v-model="formData.resetCode" type="text" placeholder="Код сброса"
                    class="form-input text-center" maxlength="6" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12"
                        stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.password" type="password" placeholder="Новый пароль" class="form-input"
                    required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.confirmPassword" type="password" placeholder="Подтвердите пароль"
                    class="form-input" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
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
  background-color: #F2F2F4;
  position: relative;
  overflow: hidden;
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
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: #4ecdc4;
  bottom: 10%;
  right: 5%;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: #45b7d1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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


.input-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #cbd5e0;
  width: 20px;
  height: 20px;
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
  width: 18px;
  height: 18px;
  border-radius: 4px;
  position: relative;
  accent-color: #667eea;
}


.checkbox-input:checked+.checkmark::after {
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
  background-color: #5E61FF;
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
  to {
    transform: rotate(360deg);
  }
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
</style>