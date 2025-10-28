<template>
    <section class="max-w-4xl mx-auto my-16 p-6 bg-white rounded-2xl shadow-xl animate-fadeIn">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold text-gray-800">Опыт работы</h2>
        <button @click="showInput = !showInput" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
          Добавить опыт
        </button>
      </div>
  
      <!-- Форма добавления опыта -->
      <div v-if="showInput" class="flex flex-col gap-2 mb-6">
        <input v-model="newJob.position" type="text" placeholder="Должность" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newJob.company" type="text" placeholder="Компания" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newJob.period" type="text" placeholder="Период" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea v-model="newJob.description" placeholder="Описание" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
        <button @click="addJob" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Сохранить</button>
      </div>
  
      <!-- Список опыта -->
      <div class="space-y-4">
        <div v-for="(job, index) in jobs" :key="index" class="p-4 bg-indigo-50 rounded-xl shadow hover:shadow-2xl transition relative group">
          <h3 class="font-semibold text-indigo-700 text-lg">{{ job.position }}</h3>
          <p class="text-gray-700">{{ job.company }}</p>
          <p class="text-gray-500 text-sm">{{ job.period }}</p>
          <p class="mt-2 text-gray-600">{{ job.description }}</p>
          <!-- Удаление -->
          <button @click="removeJob(index)" class="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition">✕</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showInput = ref(false)
  const newJob = ref({ position: '', company: '', period: '', description: '' })
  const jobs = ref([
    { position: 'Frontend Developer', company: 'Tech Company', period: '2022 — 2025', description: 'Разработка SPA на Vue.js, улучшение UI и оптимизация производительности.' },
    { position: 'Junior Developer', company: 'Startup XYZ', period: '2020 — 2022', description: 'Создание интерактивных компонентов и поддержка веб-приложений.' },
  ])
  
  function addJob() {
    if (newJob.value.position && newJob.value.company) {
      jobs.value.push({ ...newJob.value })
      newJob.value = { position: '', company: '', period: '', description: '' }
      showInput.value = false
    }
  }
  
  function removeJob(index) {
    jobs.value.splice(index, 1)
  }
  </script>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 0.8s ease forwards;
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  </style>
  