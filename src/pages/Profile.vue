<template>
    <div class="flex justify-center">
        <div class="mainProfile w-[1026px] flex p-4 mt-[100px] gap-[130px]">
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
                            <div class="gap-4 flex ">
                                <button class="py-3 px-6 min-w-[115px] bg-[#5E61FF] rounded-lg text-white font-semibold">Загрузить фото</button>
                                <button class="py-3 px-6 min-w-[173px] bg-white rounded-lg font-semibold">Удалить</button>
                            </div>
                    </div>
            </div>

            <div class="flex gap-3 mt-[60px]">
                <div class="data-lastname max-h-[76px]">
                        <p class="font-semibold">Фамилия</p>
                        <input v-model="UserData.lastName" class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите фамилию">
                </div>
                <div class="data-name max-h-[76px]">
                        <p class="font-semibold">Имя</p>
                        <input v-model="UserData.firstName" class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите имя">
                </div>
                <div class="data-surname max-h-[76px]">
                        <p class="font-semibold">Отчество</p>
                        <input v-model="UserData.patronymic" class="max-w-[212px] max-h-12 mt-1 p-3 rounded-lg" type="text" placeholder="Введите отчество">
                </div>
            </div>
            <div class="flex gap-3 mt-8">
                <div class="max-h-[76px]">
                        <p class="font-semibold">Возраст</p>
                        <input v-model="UserData.age" class="min-w-[325px] max-h-12 mt-1 p-3 rounded-lg" type="number" placeholder="Введите возраст">
                </div>
                <div class="max-h-[76px]">
                        <p class="font-semibold">Населнный пункт</p>
                        <input v-model="UserData.city" class="min-w-[325px] max-h-12 c p-3 rounded-lg" type="text" placeholder="Введите город">
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
                    <textarea v-model="UserData.about" class="w-full h-[100px] p-3 mt-3 rounded-lg" placeholder="Введите информацию"></textarea>
                </div>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Образование</p>

                <div class="max-h-[76px]">
                        <p class="font-semibold mt-4">Уровень образования</p>
                            <select class="min-w-full max-h-12 mt-2 p-3 rounded-lg" v-model="selected">
                                <option  v-for="education in educations" :value="education.value">
                                    {{ education.text }}
                                </option>
                            </select>
                </div>
                
                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Учебное заведение</p>
                    <input v-model="UserData.educationalInstitution" class="min-w-full max-h-12 mt-2 p-3 rounded-lg" type="text" placeholder="Колледж IThub Magas">
                </div>

                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Факультет</p>
                    <input v-model="UserData.faculty" class="min-w-full max-h-12 mt-2 p-3 rounded-lg" type="text" placeholder="Колледж IThub Magas">
                </div>

                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Год окончания</p>
                    <input v-model="UserData.yearOfGraduation" class="max-w-[103px] max-h-12 mt-2 p-3 rounded-lg text-black" type="text" placeholder="дд.мм.гг.">
                </div>
            </div>
            
            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Навыки</p>
                    <textarea v-model="UserData.skills" name="skill" class="w-full h-[100px] p-3 mt-3 rounded-lg" placeholder="Текст"></textarea>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Достижения</p>
                    <textarea v-model="UserData.achievements" class="w-full h-[100px] p-3 mt-3 rounded-lg" placeholder="Текст"></textarea>
            </div>
            <div class="gap-3 flex mt-3">
                        <button class="py-3 px-6 min-w-[150px] bg-[#5E61FF] rounded-lg text-white font-semibold">Загрузить</button>
                        <button class="py-3 px-6 min-w-[107px] bg-white rounded-lg font-semibold">Удалить</button>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Проекты</p>

                <div class="max-h-[76px]">
                        <p class="font-semibold mt-4">Ссылка</p>
                            <input v-model="UserData.linkProject" class="min-w-full max-h-12 mt-2 p-3 rounded-lg" type="text" placeholder="Введите ссылку">
                </div>

                <div>
                    <p class="font-semibold mt-4">Описание</p>
                    <textarea 
                        name="descript-project" 
                        class="w-full h-[123px] min-h-[100px] max-h-[300px] p-3 mt-3 rounded-lg resize-y"
                        v-model="UserData.description" 
                        placeholder="Введите описание"
                    ></textarea>
                </div>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Ссылки на соцсети</p>

                    <div class="flex gap-3">
                        <div>
                            <p class="font-semibold mt-4">Соцсеть или сайт</p>
                                <input class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите название">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Ссылка</p>
                                <input class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите ссылку">
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div>
                            <p class="font-semibold mt-4">Соцсеть или сайт</p>
                                <input v-model="UserData.social" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите название">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Ссылка</p>
                                <input v-model="UserData.linkSocial" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите ссылку">
                        </div>
                    </div>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Контакты и безопасность</p>

                    <div class="flex gap-3">
                        <div>
                            <p class="font-semibold mt-4">Номер</p>
                                <input v-model="UserData.phoneNumber" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="+7 (928) 321 22 22">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Почта</p>
                                <input v-model="UserData.email" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="name@mail.ru">
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div>
                            <p class="font-semibold mt-4">Старый пароль</p>
                                <input v-model="UserData.password" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="********">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Новый пароль</p>
                                <input class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="********">
                        </div>
                    </div>
            </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Уведомления</p>

                <div class="flex justify-between mt-4">
                    <p>Уведомление за оценки</p>
                    <input type="radio">
                </div>
                <div class="flex justify-between mt-4">
                    <p>Уведомлять за посещения</p>
                    <input type="radio">
                </div>
            </div>

            <div class="gap-3 flex mt-[60px]">
                        <button class="py-3 px-6 min-w-[150px] bg-[#5E61FF] rounded-lg text-white font-semibold" @click="updateUser">Сохранить</button>
                        <button class="py-3 px-6 min-w-[107px] bg-white rounded-lg font-semibold" @click="resetProfile">Отмена</button>
            </div>  
        </div>
    </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
 
async function updateUser(){
    const BEARER_TOKEN = localStorage.getItem("token")
    const res = await axios.put("http://localhost:5000/auth/profile", {userData: UserData.value},{
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`
  }
})
    console.log(res);
}

async function resetProfile() {
    UserData.value = originalUserData.value;

}

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

const educations = ref([
  { text: 'Среднее', value: 'Среднее' },
  { text: 'Высшее', value: 'Высшее' },
  { text: 'Три', value: 'C' }
])

const UserData = ref({})
const originalUserData = ref({})

onMounted(async () => {
  console.log('Компонент смонтирован в DOM!');

  const BEARER_TOKEN = localStorage.getItem("token")
  const res = await axios.get("http://localhost:5000/auth/profile", {
  headers: {
    'Authorization': `Bearer ${BEARER_TOKEN}`
  }
})
console.log(res);
UserData.value = res.data
originalUserData.value = res.data
});


</script>
