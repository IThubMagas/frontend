import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://192.168.198.11:3000'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(!!token.value)

  
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const setToken = (newToken) => {
    token.value = newToken
    isAuthenticated.value = !!newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const setUser = (userData) => {
    user.value = userData
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password })
    setToken(res.data.token)
    
    return res.data
  }

  const verifyEmail = async (email, code) => {
    const res = await axios.post(`${API_URL}/verify-email`, { email, code })
    if (res.data.token) {
      setToken(res.data.token)
      setUser(res.data.user)
    }
    return res.data
  }

  return {
    user,
    token,
    isAuthenticated,
    setToken,
    setUser,
    login,
    verifyEmail,
    logout
  }
})