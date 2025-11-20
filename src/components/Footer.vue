<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="logo">HRhub</div>

        <p class="description">
          HRHub — всё для HR в одной платформе. Автоматизируем подбор,
          онбординг и управние талантами. Экономьте время, растите команду.
        </p>

        <div class="toggle-wrapper">
          <div class="toggle" @click="toggleTheme" :class="{ 'dark-mode': isDarkMode }">
            <div class="track">
              <div class="thumb" :class="{ active: isDarkMode }">
                <div class="glass-effect"></div>
              </div>
              <div class="icons">
                <svg class="icon sun" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="icon moon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88299 19.5345 5.67422 18.3258C4.46545 17.117 3.62593 15.589 3.2539 13.9205C2.88187 12.252 2.9927 10.5121 3.57345 8.9043C4.1542 7.29651 5.18085 5.88737 6.53323 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73385 6.00945 9.85854 7.68141C9.98323 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6517 13.7866 21 12.79Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-section">
        <h3 class="section-title">Сервисы</h3>
        <ul class="footer-links">
          <li><a href="#">Travel Booking</a></li>
          <li><a href="#">Flight Booking</a></li>
          <li><a href="#">Car Booking</a></li>
          <li><a href="#">Fivestar Hotel</a></li>
          <li><a href="#">Traveling</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3 class="section-title">Помощь</h3>
        <ul class="footer-links">
          <li><a href="#">Account</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Terms & Condition</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3 class="section-title">Проекты</h3>
        <ul class="footer-links">
          <li><a href="#">Success</a></li>
          <li><a href="#">About Locato</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Information</a></li>
          <li><a href="#">Travel Guide</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  // Здесь должна быть логика смены темы для всего сайта
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap");

.footer {
  background-color: #f4f5f6;
  padding: 60px 0 40px;
  font-family: "Unbounded", sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 50px;
  padding: 0 20px;
}

.logo {
    font-family: "Unbounded", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 32px;
    font-weight: 600;
    color: #5E61FF;
    letter-spacing: -0.5px;
}

.description {
  color: #888787;
  line-height: 1.6;
  font-size: 14px;
  max-width: 300px;
}

.toggle-wrapper {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle {
  width: 128px;
  height: 38px;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.track {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.toggle:not(.dark-mode) .track {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  box-shadow: 
    inset 0 0px 0px rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle.dark-mode .track {
  background: linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%);
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.05),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
}

.thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 31px;
  height: 31px;
  opacity: 50%;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 2;
  overflow: hidden;
}

.toggle:not(.dark-mode) .thumb {
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle.dark-mode .thumb {
  background: linear-gradient(135deg, #3a3a3c 0%, #2c2c2e 100%);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.2);
}

.thumb.active {
  transform: translateX(91px);
}

.glass-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 14px 14px 0 0;
}

.icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 1;
}

.icon {
  transition: all 0.3s ease;
}

.toggle:not(.dark-mode) .icon {
  color: #8e8e93;
}

.toggle:not(.dark-mode) .sun {
  color: #ff9f0a;
}

.toggle.dark-mode .icon {
  color: #8e8e93;
}

.toggle.dark-mode .moon {
  color: #64d2ff;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #2d3748;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #000;
  transform: translateX(5px);
}

</style>