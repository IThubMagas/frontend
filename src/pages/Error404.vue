<template>
  <div class="not-found">
    <div class="error-container">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Чё-то не то</h2>
      <p class="error-text">Страница, которую ты ищешь, куда-то подевалась. Иди поищи её.</p>
      
      <div class="action-buttons">
        <button @click="goBack" class="btn btn-back">
          ← Назад
        </button>
        <button @click="goHome" class="btn btn-home">
          На главную
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  data() {
    return {
      randomNumber: Math.floor(Math.random() * 1000)
    }
  },
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    goHome() {
      this.$router.push('/')
    },
  },
  mounted() {
    console.warn('404 - страница не найдена:', this.$route.path)
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.error-container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 120px;
  font-weight: bold;
  margin: 0;
  color: #667eea;
  line-height: 1;
}

.error-title {
  font-size: 28px;
  margin: 10px 0;
  color: #333;
}

.error-text {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-back {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.btn-back:hover {
  background: #e9ecef;
}

.btn-home {
  background: #667eea;
  color: white;
}

.btn-home:hover {
  background: #667eea;
  transform: translateY(-2px);
}
</style>