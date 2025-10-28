<template>
  <section class="max-w-4xl mx-auto my-16 p-6 bg-white rounded-2xl shadow-xl animate-fadeIn">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-3xl font-bold text-gray-800">Навыки</h2>
      <button @click="showInput = !showInput" class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
        Добавить навык
      </button>
    </div>

    <!-- Ввод нового навыка -->
    <div v-if="showInput" class="flex gap-2 mb-6">
      <input
        v-model="newSkill.name"
        type="text"
        placeholder="Название навыка"
        class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        v-model.number="newSkill.level"
        type="number"
        placeholder="Уровень %"
        class="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button @click="addSkill" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Сохранить</button>
    </div>

    <!-- Список навыков -->
    <div class="grid sm:grid-cols-2 gap-4">
      <div v-for="(skill, index) in skills" :key="index" class="p-4 bg-indigo-50 rounded-xl shadow-lg hover:shadow-2xl transition group relative">
        <h3 class="font-semibold text-indigo-700">{{ skill.name }}</h3>
        <div class="w-full h-3 bg-indigo-200 rounded-full mt-2 overflow-hidden">
          <div :style="{ width: skill.level + '%' }" class="h-3 bg-indigo-500 rounded-full transition-all duration-1000"></div>
        </div>
        <!-- Кнопка удаления на hover -->
        <button @click="removeSkill(index)" class="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition">
          ✕
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showInput = ref(false)
const newSkill = ref({ name: '', level: 50 })

const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'Tailwind CSS', level: 85 },
])

function addSkill() {
  if (newSkill.value.name && newSkill.value.level >= 0 && newSkill.value.level <= 100) {
    skills.value.push({ ...newSkill.value })
    newSkill.value = { name: '', level: 50 }
    showInput.value = false
  }
}

function removeSkill(index) {
  skills.value.splice(index, 1)
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
