<template>
    <div class="w-[1026px] ml-[90px] mt-[100px] bg-red-300 flex gap-[130px]">

        <div class="min-w-[234px] p-20px">
            <ul class="flex gap-2 flex-col">
                <li v-for="item in menuProfile" :key="item.menu" class="py-5 pl-5 bg gap-y-1 bg-white text-sm font-semibold">
                    <a href="#">{{ item.menu }}</a>
                </li>
            </ul>
        </div>

        <div class="profile-main min-w-[662px]">
            <div class="profile-header">
                <h2 class="text-[32px] font-semibold">Мой профиль</h2>
                    <div class="profile-avatar flex mt-8 items-center gap-6 ">
                        <div class="w-[84px] h-[84px] rounded-full"><img class="w-[84px] h-[84px] rounded-full" src="../../public/default-profile.png" alt="#"></div>
                            <div class="uploadFoto-btn gap-4 flex ">
                                <button class="py-3 px-6 min-w-[115px] bg-[#5E61FF] rounded-lg text-white font-semibold">Загрузить фото</button>
                                <button class="py-3 px-6 min-w-[173px] bg-white rounded-lg font-semibold">Удалить</button>
                            </div>
                    </div>
            </div>

            <div class="flex gap-3 mt-[60px]">
                <div class="data-lastname max-h-[76px]">
                        <p class="font-semibold">Фамилия</p>
                        <input class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите фамилию">
                </div>
                <div class="data-name max-h-[76px]">
                        <p class="font-semibold">Имя</p>
                        <input class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите имя">
                </div>
                <div class="data-surname max-h-[76px]">
                        <p class="font-semibold">Отчество</p>
                        <input class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите отчество">
                </div>
            </div>
            <div class="flex gap-3 mt-8">
                <div class="max-h-[76px]">
                        <p class="font-semibold">Возраст</p>
                        <input class="min-w-[325px] max-h-12 mt-1 p-3 rounded-lg" type="number" placeholder="Введите возраст">
                </div>
                <div class="max-h-[76px]">
                        <p class="font-semibold">Населнный пункт</p>
                        <input class="min-w-[325px] max-h-12 c p-3 rounded-lg" type="text" placeholder="Введите город">
                </div>
            </div>
            
            <div>
                <p class="font-semibold text-[20px] mt-[60px]">О себе</p>

                <div class="max-h-[76px]">
                        <p class="font-semibold mt-4">Статус</p>
                            <select class="min-w-[278px] max-h-12 mt-2 p-3 rounded-lg" v-model="selected">
                                <option  v-for="option in options" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                </div>

                <div>
                    <p class="font-semibold mt-4">Кратко о себе</p>
                    <textarea class="w-full p-3 mt-3 rounded-lg" v-model="about" placeholder="Введите информацию"></textarea>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';

const menuProfile = ref([
    { menu: "Общее" },
    { menu: "О себе" },
    { menu: "Образование" },
    { menu: "Навыки" },
    { menu: "Достижения" },
    { menu: "Проекты" },
    { menu: "Ссылки на соцсети" },
    { menu: "Контакты и безопасность" },
    { menu: "Уведомления" },
]);

const selected = ref('A')

const options = ref([
  { text: 'Ищу работу', value: 'A' },
  { text: 'Два', value: 'B' },
  { text: 'Три', value: 'C' }
])
</script>