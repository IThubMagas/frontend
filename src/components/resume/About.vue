<template>
    <section class="max-w-4xl mx-auto my-16 p-6 bg-white rounded-xl shadow-lg animate-fadeIn">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">О себе</h2>
      <p class="text-gray-700 mb-6">
        Я frontend-разработчик с опытом создания SPA на Vue.js, Angular и React. Люблю писать чистый код, создавать красивые интерфейсы и внедрять современные технологии.
      </p>
      <div class="flex justify-center space-x-4">
        <a href="https://github.com" target="_blank" class="text-gray-700 hover:text-indigo-500 transition">GitHub</a>
        <a href="https://linkedin.com" target="_blank" class="text-gray-700 hover:text-indigo-500 transition">LinkedIn</a>
        <a href="https://t.me" target="_blank" class="text-gray-700 hover:text-indigo-500 transition">Telegram</a>
      </div>
    </section>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 1s ease forwards;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  </style>
  