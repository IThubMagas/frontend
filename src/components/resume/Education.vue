<template>
    <section class="max-w-4xl mx-auto my-16 p-6 bg-white rounded-2xl shadow-xl animate-fadeIn">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold text-gray-800">Образование</h2>
        <button @click="showInput = !showInput" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">Добавить образование</button>
      </div>
  
      <div v-if="showInput" class="flex flex-col gap-2 mb-6">
        <input v-model="newEdu.degree" type="text" placeholder="Степень / Курс" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newEdu.institution" type="text" placeholder="Учебное заведение" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newEdu.period" type="text" placeholder="Период" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button @click="addEdu" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Сохранить</button>
      </div>
  
      <div class="space-y-4">
        <div v-for="(edu, index) in education" :key="index" class="p-4 bg-green-50 rounded-xl shadow hover:shadow-2xl transition relative group">
          <h3 class="font-semibold text-green-700 text-lg">{{ edu.degree }}</h3>
          <p class="text-gray-700">{{ edu.institution }}</p>
          <p class="text-gray-500 text-sm">{{ edu.period }}</p>
          <button @click="removeEdu(index)" class="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition">✕</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showInput = ref(false)
  const newEdu = ref({ degree: '', institution: '', period: '' })
  const education = ref([
    { degree: 'Бакалавр в области ИТ', institution: 'Национальный университет', period: '2016 — 2020' },
    { degree: 'Курс Frontend-разработки', institution: 'Skillbox', period: '2020 — 2021' },
  ])
  
  function addEdu() {
    if (newEdu.value.degree && newEdu.value.institution) {
      education.value.push({ ...newEdu.value })
      newEdu.value = { degree: '', institution: '', period: '' }
      showInput.value = false
    }
  }
  
  function removeEdu(index) {
    education.value.splice(index, 1)
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
  