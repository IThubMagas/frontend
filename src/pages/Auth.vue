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

      <div v-if="message" class="message" :class="{ error: error, success: !error }">
        {{ message }}
      </div>

      <div class="card-body">
        <transition name="form-slide" mode="out-in">
          <div v-if="currentMode === 'login'" class="form-wrapper">
            <h2 class="form-title">Добро пожаловать!</h2>
            <p class="form-subtitle">Войдите в свой аккаунт</p>

            <form @submit.prevent="handleLogin" class="auth-form">
              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.email" type="email" placeholder="Email" class="form-input"
                    :class="{ 'error': errors.email }" @blur="validateField('email')" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" placeholder="Пароль"
                    class="form-input" :class="{ 'error': errors.password }" @blur="validateField('password')" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                    <svg v-if="showPassword" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor" stroke-width="2" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>
                </div>
                <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
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

              <button type="submit" class="submit-btn" :disabled="loading || !isFormValid">
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
                    <input v-model="formData.firstName" type="text" placeholder="Имя" class="form-input"
                      :class="{ 'error': errors.firstName }" @blur="validateField('firstName')" required>
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
                  <div v-if="errors.firstName" class="error-message">{{ errors.firstName }}</div>
                </div>

                <div class="input-group">
                  <div class="input-wrapper">
                    <input v-model="formData.lastName" type="text" placeholder="Фамилия" class="form-input"
                      :class="{ 'error': errors.lastName }" @blur="validateField('lastName')" required>
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
                  <div v-if="errors.lastName" class="error-message">{{ errors.lastName }}</div>
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.patronymic" type="text" placeholder="Отчество" class="form-input"
                    @blur="validateField('patronymic')">
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
                <div v-if="errors.patronymic" class="error-message">{{ errors.patronymic }}</div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.email" type="email" placeholder="Email" class="form-input"
                    :class="{ 'error': errors.email }" @blur="validateField('email')" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
                <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.phoneNumber" type="tel" placeholder="+7 (999) 999-99-99" class="form-input"
                    :class="{ 'error': errors.phoneNumber }" @input="handlePhoneInput" @keydown="handlePhoneKeyDown"
                    @blur="validateField('phoneNumber')">
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                </div>
                <div v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" placeholder="Пароль"
                    class="form-input" :class="{ 'error': errors.password }" @blur="validateField('password')" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                    <svg v-if="showPassword" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor" stroke-width="2" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>
                </div>
                <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
                <div v-if="passwordStrength" class="password-strength" :class="passwordStrength">
                  Сложность пароля: {{ passwordStrengthText }}
                </div>
              </div>

              <div class="input-group">
                <div class="input-wrapper">
                  <input v-model="formData.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Подтвердите пароль" class="form-input" :class="{ 'error': errors.confirmPassword }"
                    @blur="validateField('confirmPassword')" required>
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                        stroke="currentColor" stroke-width="2" />
                      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </div>
                  <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                    <svg v-if="showConfirmPassword" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                        stroke="currentColor" stroke-width="2" />
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>
                </div>
                <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading || !isFormValid">
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
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const currentMode = ref('login')
const rememberMe = ref(false)
const loading = ref(false)
const message = ref('')
const error = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

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

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  patronymic: '',
  phoneNumber: ''
})

const validateField = (field) => {
  const value = formData[field]
  
  switch (field) {
    case 'email':
      if (!value) {
        errors.email = 'Email обязателен'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = 'Введите корректный email'
      } else {
        errors.email = ''
      }
      break
      
    case 'password':
      if (!value) {
        errors.password = 'Пароль обязателен'
      } else if (value.length < 6) {
        errors.password = 'Пароль должен быть не менее 6 символов'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        errors.password = 'Пароль должен содержать заглавные, строчные буквы и цифры'
      } else {
        errors.password = ''
      }
      break
      
    case 'confirmPassword':
      if (!value) {
        errors.confirmPassword = 'Подтверждение пароля обязательно'
      } else if (value !== formData.password) {
        errors.confirmPassword = 'Пароли не совпадают'
      } else {
        errors.confirmPassword = ''
      }
      break
      
    case 'firstName':
      if (!value) {
        errors.firstName = 'Имя обязательно'
      } else if (value.length < 2) {
        errors.firstName = 'Имя должно быть не менее 2 символов'
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        errors.firstName = 'Имя может содержать только буквы, пробелы и дефисы'
      } else {
        errors.firstName = ''
      }
      break
      
    case 'lastName':
      if (!value) {
        errors.lastName = 'Фамилия обязательна'
      } else if (value.length < 2) {
        errors.lastName = 'Фамилия должна быть не менее 2 символов'
      } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        errors.lastName = 'Фамилия может содержать только буквы, пробелы и дефисы'
      } else {
        errors.lastName = ''
      }
      break
      
    case 'patronymic':
      if (value && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        errors.patronymic = 'Отчество может содержать только буквы, пробелы и дефисы'
      } else {
        errors.patronymic = ''
      }
      break
      
    case 'phoneNumber':
      if (value) {
        const cleanPhone = value.replace(/\D/g, '')
        if ((cleanPhone.startsWith('7') || cleanPhone.startsWith('8')) && cleanPhone.length !== 11) {
          errors.phoneNumber = 'Номер должен содержать 11 цифр'
        } else if (cleanPhone.length > 0 && (cleanPhone.length < 10 || cleanPhone.length > 15)) {
          errors.phoneNumber = 'Номер должен содержать от 10 до 15 цифр'
        } else {
          errors.phoneNumber = ''
        }
      } else {
        errors.phoneNumber = ''
      }
      break
  }
}

const formatPhoneNumber = () => {
  let numbers = formData.phoneNumber.replace(/\D/g, '')
  
  if (numbers.startsWith('7') || numbers.startsWith('8')) {
    numbers = numbers.substring(1)
  }
  
  numbers = numbers.substring(0, 10)
  
  let formatted = '+7'
  
  if (numbers.length > 0) {
    formatted += ' (' + numbers.substring(0, 3)
  }
  if (numbers.length > 3) {
    formatted += ') ' + numbers.substring(3, 6)
  }
  if (numbers.length > 6) {
    formatted += '-' + numbers.substring(6, 8)
  }
  if (numbers.length > 8) {
    formatted += '-' + numbers.substring(8, 10)
  }
  
  formData.phoneNumber = formatted
}

const handlePhoneInput = () => {
  formatPhoneNumber()
}

const isFormValid = computed(() => {
  switch (currentMode.value) {
    case 'login':
      return formData.email && formData.password && !errors.email && !errors.password
    case 'signup':
      return formData.email && 
             formData.password && 
             formData.confirmPassword && 
             formData.firstName && 
             formData.lastName &&
             !errors.email && 
             !errors.password && 
             !errors.confirmPassword && 
             !errors.firstName && 
             !errors.lastName
    case 'verify':
      return formData.verificationCode && formData.verificationCode.length === 6
    case 'forgot':
      return formData.email && !errors.email
    case 'reset':
      return formData.resetCode && formData.password && formData.confirmPassword && 
             !errors.password && !errors.confirmPassword
    default:
      return true
  }
})

watch(currentMode, () => {
  Object.keys(errors).forEach(key => errors[key] = '')
  message.value = ''
  error.value = false
  showPassword.value = false
  showConfirmPassword.value = false
})

const switchTo = (mode) => {
  currentMode.value = mode
  message.value = ''
  error.value = false
}

const handleLogin = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  message.value = ''
  
  try {
    console.log('Отправка запроса на вход...')

    const response = await axios.post('http://localhost:3000/auth/login', {
      email: formData.email,
      password: formData.password
    })

    console.log('Успешный ответ сервера:', response.data)

    if (response.data.token) {
      const token = response.data.token
      if (rememberMe.value) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      message.value = response.data.message || 'Вход успешен!'
      error.value = false
      
      console.log('Токен сохранен, загружаем профиль...')
      
      try {
        await authStore.loadUserProfile()
        console.log('Профиль загружен, переходим...')
        
        setTimeout(() => {
          router.push('/profile')
        }, 1000)
      } catch (profileError) {
        console.error('Ошибка загрузки профиля:', profileError)
        setTimeout(() => {
          router.push('/profile')
        }, 1000)
      }
    } else {
      message.value = 'Токен не получен от сервера'
      error.value = true
    }
  } catch (err) {
    console.error('Login error:', err)
    
    if (err.response?.data?.token) {
      const token = err.response.data.token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      message.value = err.response.data.message || 'Вход успешен!'
      error.value = false
      
      setTimeout(() => {
        router.push('/profile')
      }, 1000)
    } else {
      message.value = err.response?.data?.message || 'Ошибка входа. Проверьте email и пароль.'
      error.value = true
    }
  } finally {
    loading.value = false
  }
}

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  
  try {
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      patronymic: formData.patronymic,
      email: formData.email,
      password: formData.password
    }

    if (formData.phoneNumber && !errors.phoneNumber) {
      registrationData.phoneNumber = formData.phoneNumber.replace(/\D/g, '')
    }

    const response = await axios.post('http://localhost:3000/auth/registration', registrationData)
    
    if (response.data.message) {
      message.value = response.data.message || 'Регистрация успешна! Код подтверждения отправлен на email.'
      error.value = false
      switchTo('verify')
    } else {
      message.value = 'Ошибка при регистрации'
      error.value = true
    }
  } catch (err) {
    console.error('Registration error:', err)
    
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
  if (!isFormValid.value) return
  
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/auth/verify-email', {
      email: formData.email,
      code: formData.verificationCode
    })

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      message.value = 'Email подтверждён!'
      error.value = false
      
      authStore.setToken(response.data.token)
      authStore.setUser(response.data.user)
      
      setTimeout(() => router.push('/profile'), 1000)
    } else {
      message.value = 'Токен не получен после подтверждения'
      error.value = true
    }
  } catch (err) {
    console.error('Verify email error:', err)
    message.value = err.response?.data?.message || 'Неверный код подтверждения'
    error.value = true
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/auth/resend-verify', { 
      email: formData.email 
    })
    
    message.value = response.data.message || 'Новый код отправлен!'
    error.value = false
  } catch (err) {
    console.error('Resend code error:', err)
    message.value = err.response?.data?.message || 'Ошибка отправки кода'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleForgot = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/auth/forgot-password', { 
      email: formData.email 
    })
    
    message.value = response.data.message || 'Код восстановления отправлен на email!'
    error.value = false
    switchTo('reset')
  } catch (err) {
    console.error('Forgot password error:', err)
    message.value = err.response?.data?.message || 'Ошибка восстановления пароля'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleReset = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  try {
    const response = await axios.post('http://localhost:3000/auth/reset-password', {
      email: formData.email,
      resetCode: formData.resetCode,
      newPassword: formData.password
    })

    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      message.value = 'Пароль успешно сброшен!'
      error.value = false
      
      authStore.setToken(response.data.token)
      authStore.setUser(response.data.user)
      
      setTimeout(() => router.push('/profile'), 1000)
    } else {
      message.value = 'Токен не получен после сброса пароля'
      error.value = true
    }
  } catch (err) {
    console.error('Reset password error:', err)
    message.value = err.response?.data?.message || 'Ошибка сброса пароля'
    error.value = true
  } finally {
    loading.value = false
  }
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

.message {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
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

.form-input.error {
  border-color: #e53e3e;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
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

.password-toggle {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #cbd5e0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
  z-index: 2;
}

.password-toggle:hover {
  color: #667eea;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

.error-message {
  color: #e53e3e;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
}

.password-strength {
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
}

.password-strength.weak {
  color: #e53e3e;
}

.password-strength.medium {
  color: #d69e2e;
}

.password-strength.strong {
  color: #38a169;
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
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid #cbd5e0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-input:checked {
  background-color: #667eea;
  border-color: #667eea;
}

.text-link {
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;
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
  background-color: #4a4dff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(94, 97, 255, 0.3);
}

.submit-btn:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

@media (max-width: 480px) {
  .auth-card {
    padding: 24px;
    margin: 16px;
  }

  .name-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-title {
    font-size: 24px;
  }

  .form-subtitle {
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .auth-card {
    padding: 20px;
  }

  .form-options {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>