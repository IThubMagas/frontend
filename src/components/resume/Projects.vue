<template>
    <section class="max-w-4xl mx-auto my-16 p-6 bg-white rounded-2xl shadow-xl animate-fadeIn">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-3xl font-bold text-gray-800">Проекты</h2>
        <button @click="showInput = !showInput" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
          Добавить проект
        </button>
      </div>
  
      <!-- Добавление проекта вручную -->
      <div v-if="showInput" class="flex flex-col gap-2 mb-6">
        <input v-model="newProject.name" type="text" placeholder="Название проекта" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newProject.link" type="text" placeholder="Ссылка" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input v-model="newProject.image" type="text" placeholder="Ссылка на изображение" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea v-model="newProject.description" placeholder="Описание проекта" class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
        <button @click="addProject" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Сохранить</button>
      </div>
  
      <!-- Список проектов -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="(project, index) in projects" :key="index" class="p-4 bg-yellow-50 rounded-xl shadow hover:shadow-2xl transition relative group">
          <img :src="project.image" alt="Project screenshot" class="w-full h-40 object-cover rounded-md mb-3">
          <h3 class="font-semibold text-yellow-700">{{ project.name }}</h3>
          <p class="text-gray-600 mt-1">{{ project.description }}</p>
          <a :href="project.link" target="_blank" class="text-yellow-600 hover:underline mt-2 block">Смотреть проект</a>
          <button @click="removeProject(index)" class="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition">✕</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showInput = ref(false)
  const newProject = ref({ name: '', link: '#', image: 'https://via.placeholder.com/400x200', description: '' })
  
  const projects = ref([
    { name: 'Bento Resume Clone', description: 'SPA резюме на Vue 3 + Tailwind CSS', image: 'https://via.placeholder.com/400x200', link: '#' },
    { name: 'Portfolio Site', description: 'Адаптивный сайт с проектами и контактами', image: 'https://via.placeholder.com/400x200', link: '#' },
  ])
  
  function addProject() {
    if (newProject.value.name) {
      projects.value.push({ ...newProject.value })
      newProject.value = { name: '', link: '#', image: 'https://via.placeholder.com/400x200', description: '' }
      showInput.value = false
    }
  }
  
  function removeProject(index) {
    projects.value.splice(index, 1)
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
  