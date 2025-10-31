<template>
  <div class="max-w-[1440px] h-screen mx-auto flex flex-col lg:flex-row">
    <!-- Левый блок -->
    <div class="hidden lg:block lg:w-[68.33%] h-full">
      <img 
        src="/auth/banner.png" 
        alt="Banner"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Правый блок -->
    <div class="w-full lg:w-[31.67%] h-screen p-[48px]">
     <div class="flex flex-col gap-[48px]">
        <img src="/auth/logo.png" alt="logo" class="h-[48px]">
        
        <div>
          <h2 class="font-bold text-[22px]" v-if="currentMode === 'login'">
            Приятно видеть вас снова
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'signup'">
            Создайте аккаунт
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'forgot'">
            Восстановление пароля
          </h2>
          <h2 class="font-bold text-[22px]" v-else-if="currentMode === 'reset'">
            Сброс пароля
          </h2>

          <!-- Форма логина -->
          <form v-if="currentMode === 'login'" @submit.prevent="handleLogin" class="mt-[24px] flex flex-col gap-[16px]">
            <label for="login-input">
              <p class="px-[16px] text-sm mb-[6px]">Логин</p>
              <input 
                id="login-input"
                v-model="formData.email"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="text" 
                placeholder="Email или номер телефона"
                required
              >
            </label>
            <label for="password-input">
              <p class="px-[16px] text-sm mb-[6px]">Пароль</p>
              <input 
                id="password-input"
                v-model="formData.password"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="password" 
                placeholder="Введите пароль"
                required
              >
            </label>
            <div class="flex justify-between mt-[4px]">
              <div class="flex gap-2 items-center">
                <!-- Switch переключатель -->
                <label class="switch">
                  <input 
                    type="checkbox" 
                    v-model="rememberMe"
                    class="switch-input"
                  >
                  <span class="switch-slider"></span>
                </label>
                <p class="text-sm cursor-pointer" @click="rememberMe = !rememberMe">Запомнить меня</p>
              </div>
              <p class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('forgot')">Забыли пароль?</p>
            </div>

            <button type="submit" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">Войти</button>

            <div class="w-full h-[0.5px] my-4 bg-[#E5E5E5]"></div>

            <button type="button" @click="handleGoogleSignIn" class="h-[40px] flex items-center justify-center gap-2 rounded-md bg-[#333] text-white text-[12px] font-normal"> 
              <img src="/icons/google.svg" alt="google">
              <p>Или войти через Google</p>
            </button>

            <div class="flex items-center justify-center gap-2">
              <p class="text-sm">Нет аккаунта?</p>
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('signup')">Зарегистрироваться</span>
            </div>
          </form>

          <!-- Форма регистрации -->
          <form v-else-if="currentMode === 'signup'" @submit.prevent="handleSignup" class="mt-[24px] flex flex-col gap-[16px]">
            <label for="signup-name">
              <p class="px-[16px] text-sm mb-[6px]">Имя</p>
              <input 
                id="signup-name"
                v-model="formData.name"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="text" 
                placeholder="Введите ваше имя"
                required
              >
            </label>
            <label for="signup-email">
              <p class="px-[16px] text-sm mb-[6px]">Email</p>
              <input 
                id="signup-email"
                v-model="formData.email"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="email" 
                placeholder="Введите email"
                required
              >
            </label>
            <label for="signup-password">
              <p class="px-[16px] text-sm mb-[6px]">Пароль</p>
              <input 
                id="signup-password"
                v-model="formData.password"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="password" 
                placeholder="Введите пароль"
                required
              >
            </label>
            <label for="signup-confirm-password">
              <p class="px-[16px] text-sm mb-[6px]">Подтвердите пароль</p>
              <input 
                id="signup-confirm-password"
                v-model="formData.confirmPassword"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="password" 
                placeholder="Подтвердите пароль"
                required
              >
            </label>
            <button type="submit" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">Зарегистрироваться</button>

            <div class="flex items-center justify-center gap-2 mt-4">
              <p class="text-sm">Уже есть аккаунт?</p>
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Войти</span>
            </div>
          </form>

          <!-- Форма восстановления пароля (forgot) -->
          <form v-else-if="currentMode === 'forgot'" @submit.prevent="handleForgot" class="mt-[24px] flex flex-col gap-[16px]">
            <label for="forgot-email">
              <p class="px-[16px] text-sm mb-[6px]">Email</p>
              <input 
                id="forgot-email"
                v-model="formData.email"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="email" 
                placeholder="Введите email для восстановления"
                required
              >
            </label>
            <button type="submit" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">Отправить ссылку на сброс</button>

            <div class="flex items-center justify-center gap-2 mt-4">
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Вернуться к входу</span>
            </div>
          </form>

          <!-- Форма сброса пароля (reset) -->
          <form v-else-if="currentMode === 'reset'" @submit.prevent="handleReset" class="mt-[24px] flex flex-col gap-[16px]">
            <label for="reset-password">
              <p class="px-[16px] text-sm mb-[6px]">Новый пароль</p>
              <input 
                id="reset-password"
                v-model="formData.password"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="password" 
                placeholder="Введите новый пароль"
                required
              >
            </label>
            <label for="reset-confirm-password">
              <p class="px-[16px] text-sm mb-[6px]">Подтвердите новый пароль</p>
              <input 
                id="reset-confirm-password"
                v-model="formData.confirmPassword"
                class="h-[48px] w-full px-[16px] bg-[#F2F2F2] rounded-md" 
                type="password" 
                placeholder="Подтвердите новый пароль"
                required
              >
            </label>
            <button type="submit" class="h-[40px] rounded-md bg-[#007AFF] text-white text-[15px] font-bold">Сбросить пароль</button>

            <div class="flex items-center justify-center gap-2 mt-4">
              <span class="text-[#007AFF] cursor-pointer text-sm" @click="switchTo('login')">Вернуться к входу</span>
            </div>
          </form>
        </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentMode = ref('login') // 'login', 'signup', 'forgot', 'reset'
const rememberMe = ref(false)

// Реактивная форма для общих полей
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
})

// Функция переключения режимов
const switchTo = (mode) => {
  currentMode.value = mode
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const handleLogin = () => {
  console.log('Login:', formData.email, formData.password, rememberMe.value)
}

const handleSignup = () => {
  if (formData.password !== formData.confirmPassword) {
    alert('Пароли не совпадают')
    return
  }
  console.log('Signup:', formData)
}

const handleForgot = () => {
  console.log('Forgot:', formData.email)
  switchTo('reset')
}

const handleReset = () => {
  if (formData.password !== formData.confirmPassword) {
    alert('Пароли не совпадают')
    return
  }
  console.log('Reset:', formData.password)
}

const handleGoogleSignIn = () => {
  console.log('Google sign in')
}
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}

.switch-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .3s;
  border-radius: 20px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

.switch-input:checked + .switch-slider {
  background-color: #007AFF;
}

.switch-input:checked + .switch-slider:before {
  transform: translateX(16px);
}
</style>