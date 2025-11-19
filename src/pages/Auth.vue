<template>
  <div class="max-w-[1440px] h-screen mx-auto flex flex-col lg:flex-row">
    <!-- Левый блок -->
    <div class="lg:w-[68.33%] h-full">
      <img src="/auth/banner.png" alt="Banner" class="w-full h-full object-cover">
    </div>

    <!-- Правый блок -->
    <div class="w-full lg:w-[31.67%] h-screen p-[48px] overflow-y-auto">
      <div class="flex flex-col gap-[48px]">
        <img src="/auth/logo.png" alt="logo" class="h-[48px]">

        <div>
          <!-- Заголовки -->
          <h2 class="font-bold text-[22px]" v-if="currentMode === 'login'">
            Приятно видеть вас снова
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'signup'">
            Создайте аккаунт
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'verify'">
            Подтвердите email
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'forgot'">
            Восстановление пароля
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'reset'">
            Сброс пароля
          </h2>

          <!-- Уведомления -->
          <div v-if="message" :class="['text-sm p-3 rounded-md mb-4', error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
            {{ message }}
          </div>

          <!-- Форма логина -->
          <form v-if="currentMode === 'login'" @submit.prevent="handleLogin" class="mt-[24px] flex flex-col gap-[16px]">
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Email</p>
              <input v-model="formData.email" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="email" placeholder="Введите email" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Пароль</p>
              <input v-model="formData.password" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="password" placeholder="Введите пароль" required>
            </label>

            <div class="flex justify-between mt-[4px]">
              <div class="flex gap-2 items-center">
                <label class="switch">
                  <input type="checkbox" v-model="rememberMe" class="switch-input">
                  <span class="switch-slider"></span>
                </label>
                <p class="text-sm cursor-pointer" @click="rememberMe = !rememberMe">Запомнить меня</p>
              </div>
              <p class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('forgot')">Забыли пароль?</p>
            </div>

            <button type="submit" :disabled="loading" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">
              {{ loading ? 'Вход...' : 'Войти' }}
            </button>

            <div class="w-full h-[0.5px] my-4 bg-[#E5E5E5]"></div>

            <button type="button" @click="handleGoogleSignIn" class="h-[40px] flex items-center justify-center gap-2 rounded-md bg-[#333] text-white text-[12px] font-normal">
              <img src="/icons/google.svg" alt="google">
              <p>Войти через Google</p>
            </button>

            <div class="flex items-center justify-center gap-2">
              <p class="text-sm">Нет аккаунта?</p>
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('signup')">Зарегистрироваться</span>
            </div>
          </form>

          <!-- Форма регистрации -->
          <form v-else-if="currentMode === 'signup'" @submit.prevent="handleSignup" class="mt-[24px] flex flex-col gap-[16px]">
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Имя</p>
              <input v-model="formData.firstName" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="text" placeholder="Иван" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Фамилия</p>
              <input v-model="formData.lastName" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="text" placeholder="Иванов" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Отчество (при наличии)</p>
              <input v-model="formData.patronymic" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="text" placeholder="Иванович">
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Email</p>
              <input v-model="formData.email" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="email" placeholder="example@mail.com" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Телефон</p>
              <input 
                v-model="formData.phoneNumber" 
                @input="formatPhoneNumber"
                @blur="validatePhoneNumber"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                :class="{ 'border border-red-500': phoneError }"
              >
              <p v-if="phoneError" class="text-red-500 text-xs mt-1 px-[16px]">{{ phoneError }}</p>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Пароль</p>
              <input v-model="formData.password" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="password" placeholder="Минимум 6 символов" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Подтвердите пароль</p>
              <input v-model="formData.confirmPassword" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="password" required>
            </label>

            <button 
              type="submit" 
              :disabled="loading || phoneError" 
              class="h-[40px] mt-4 rounded-md bg-[#007AFF] text-white text-[15px] font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
            </button>

            <div class="flex items-center justify-center gap-2 mt-4">
              <p class="text-sm">Уже есть аккаунт?</p>
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Войти</span>
            </div>
          </form>

          <!-- Подтверждение email -->
          <form v-else-if="currentMode === 'verify'" @submit.prevent="handleVerifyEmail" class="mt-[24px] flex flex-col gap-[16px]">
            <p class="text-sm text-gray-600">Мы отправили 6-значный код на <strong>{{ formData.email }}</strong></p>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Код подтверждения</p>
              <input v-model="formData.verificationCode" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md text-center text-lg tracking-widest" type="text" maxlength="6" placeholder="000000" required>
            </label>
            <button type="submit" :disabled="loading" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">
              {{ loading ? 'Проверка...' : 'Подтвердить' }}
            </button>
            <p class="text-sm text-center">
              Не пришло письмо?
              <span class="text-[#007AFF] cursor-pointer" @click="resendCode">Отправить снова</span>
            </p>
          </form>

          <!-- Восстановление пароля -->
          <form v-else-if="currentMode === 'forgot'" @submit.prevent="handleForgot" class="mt-[24px] flex flex-col gap-[16px]">
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Email</p>
              <input v-model="formData.email" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="email" placeholder="Введите email" required>
            </label>
            <button type="submit" :disabled="loading" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">
              {{ loading ? 'Отправка...' : 'Отправить код' }}
            </button>
            <div class="text-center">
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Вернуться ко входу</span>
            </div>
          </form>

          <!-- Сброс пароля -->
          <form v-else-if="currentMode === 'reset'" @submit.prevent="handleReset" class="mt-[24px] flex flex-col gap-[16px]">
            <p class="text-sm text-gray-600">Код отправлен на <strong>{{ formData.email }}</strong></p>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Код сброса</p>
              <input v-model="formData.resetCode" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md text-center text-lg tracking-widest" type="text" maxlength="6" placeholder="000000" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Новый пароль</p>
              <input v-model="formData.password" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="password" placeholder="Минимум 6 символов" required>
            </label>
            <label>
              <p class="px-[16px] text-sm mb-[6px]">Подтвердите пароль</p>
              <input v-model="formData.confirmPassword" class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" type="password" required>
            </label>
            <button type="submit" :disabled="loading" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">
              {{ loading ? 'Сброс...' : 'Сбросить пароль' }}
            </button>
            <div class="text-center">
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Вернуться ко входу</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
axios.defaults.withCredentials = true
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


const switchTo = (mode) => {
  currentMode.value = mode
  message.value = ''
  error.value = false

  const preservedEmail = formData.email

  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })

  if (mode === 'verify' || mode === 'reset') {
    formData.email = preservedEmail
  }
}


const setToken = (token) => {
  if (rememberMe.value) {
    localStorage.setItem('token', token)
  } else {
    sessionStorage.setItem('token', token)
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
    setToken(res.data.token)
    message.value = 'Вход успешен!'
    error.value = false
    setTimeout(() => router.push('/dashboard'), 1000)
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
    await axios.post(`${API_URL}/registration`, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      patronymic: formData.patronymic,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password
    })
    message.value = 'Код отправлен на email!'
    error.value = false
    switchTo('verify')
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка регистрации'
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
    setToken(res.data.token)
    message.value = 'Email подтверждён!'
    error.value = false
    setTimeout(() => router.push('/dashboard'), 1000)
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

const validatePhoneNumber = () => {
  if (!formData.phoneNumber) {
    phoneError.value = ''
    return true
  }

  // Очищаем номер от всего, кроме цифр
  const cleanPhone = formData.phoneNumber.replace(/\D/g, '')
  
  // Проверяем российские номера (начинаются с 7 или 8, длина 11 цифр)
  if (cleanPhone.startsWith('7') || cleanPhone.startsWith('8')) {
    if (cleanPhone.length === 11) {
      phoneError.value = ''
      return true
    } else {
      phoneError.value = 'Номер должен содержать 11 цифр'
      return false
    }
  }
  
  // Для международных номеров - минимальная длина 10 цифр
  if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
    phoneError.value = ''
    return true
  } else {
    phoneError.value = 'Номер должен содержать от 10 до 15 цифр'
    return false
  }
}

// Форматирование номера телефона
const formatPhoneNumber = () => {
  if (!formData.phoneNumber) return
  
  // Удаляем все нецифровые символы
  let numbers = formData.phoneNumber.replace(/\D/g, '')
  
  // Ограничиваем длину
  numbers = numbers.substring(0, 11)
  
  // Форматируем номер в российском формате
  let formatted = ''
  if (numbers.startsWith('7') || numbers.startsWith('8')) {
    if (numbers.length >= 1) formatted = `+7`
    if (numbers.length >= 2) formatted += ` (${numbers.substring(1, 4)}`
    if (numbers.length >= 5) formatted += `) ${numbers.substring(4, 7)}`
    if (numbers.length >= 8) formatted += `-${numbers.substring(7, 9)}`
    if (numbers.length >= 10) formatted += `-${numbers.substring(9, 11)}`
  } else {
    // Для других форматов просто используем цифры
    formatted = numbers
  }
  
  formData.phoneNumber = formatted
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
    setToken(res.data.token)
    message.value = 'Пароль сброшен!'
    error.value = false
    setTimeout(() => router.push('/dashboard'), 1000)
  } catch (err) {
    message.value = err.response?.data?.message || 'Ошибка сброса'
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = () => {
  alert('Google Sign-In не настроен')
}
</script>

<style scoped>
.switch { @apply relative inline-block w-9 h-5; }
.switch-input { @apply opacity-0 w-0 h-0; }
.switch-slider {
  @apply absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition;
}
.switch-slider:before {
  @apply absolute content-[''] h-4 w-4 left-0.5 bottom-0.5 bg-white rounded-full transition;
}
.switch-input:checked + .switch-slider { @apply bg-[#007AFF]; }
.switch-input:checked + .switch-slider:before { @apply translate-x-4; }
</style>
