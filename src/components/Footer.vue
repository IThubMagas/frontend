<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="logo">HRhub</div>

        <p class="description">
          HRHub — всё для HR в одной платформе. Автоматизируем подбор, онбординг
          и управние талантами. Экономьте время, растите команду.
        </p>

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
import { ref } from "vue";

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap");

.footer {
  background-color: #f4f5f6;
  padding: 60px 0 40px;
  font-family: "Unbounded", sans-serif;
}

.footer-content {
  width: 1260px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.logo {
  font-family: "Unbounded", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 32px;
  font-weight: 600;
  color: #5e61ff;
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
  box-shadow: inset 0 0px 0px rgba(255, 255, 255, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle.dark-mode .track {
  background: linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%);
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.05),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1);
}

.toggle.dark-mode .thumb {
  background: linear-gradient(135deg, #3a3a3c 0%, #2c2c2e 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2);
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
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
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
