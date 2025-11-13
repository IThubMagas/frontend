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
                        <div class="w-[84px] h-[84px] rounded-full overflow-hidden">
                            <img 
                                class="w-full h-full object-cover" 
                                :src="avatarUrl" 
                                alt="Аватар профиля"
                                @error="handleImageError"
                            >
                        </div>
                            <div class="gap-4 flex ">
                                <input 
                                    type="file" 
                                    ref="fileInput"
                                    accept="image/*" 
                                    class="hidden" 
                                    @change="handleFileUpload"
                                >
                                <button 
                                    class="py-3 px-6 min-w-[115px] bg-[#5E61FF] rounded-lg text-white font-semibold"
                                    @click="triggerFileInput"
                                >
                                    Загрузить фото
                                </button>
                                <button 
                                    class="py-3 px-6 min-w-[173px] bg-white rounded-lg font-semibold border border-gray-300"
                                    @click="deleteAvatar"
                                    :disabled="!UserData.avatar"
                                >
                                    Удалить
                                </button>
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
                            <select class="min-w-[278px] max-h-12 mt-2 p-3 rounded-lg" v-model="UserData.status">
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
                            <select class="min-w-full max-h-12 mt-2 p-3 rounded-lg" v-model="UserData.educationLevel">
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
                                <input v-model="UserData.social1" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите название">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Ссылка</p>
                                <input v-model="UserData.linkSocial1" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите ссылку">
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div>
                            <p class="font-semibold mt-4">Соцсеть или сайт</p>
                                <input v-model="UserData.social2" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите название">
                        </div>
                        <div>
                            <p class="font-semibold mt-4">Ссылка</p>
                                <input v-model="UserData.linkSocial2" class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg" type="text" placeholder="Введите ссылку">
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
            <div class="relative">
                <p class="font-semibold mt-4">Старый пароль</p>
                <input 
                    v-model="UserData.oldPassword" 
                    class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg pr-10" 
                    :type="showOldPassword ? 'text' : 'password'" 
                    placeholder="********"
                >
                 <button 
                    class="absolute right-3 top-11 transform -translate-y-1/2"
                    @click="showOldPassword = !showOldPassword"
                    type="button"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        v-if="!showOldPassword"
                    >
                        <path d="M11 4C14.529 4 17.59 6.226 19 9.5C17.59 12.774 14.529 15 11 15C7.471 15 4.41 12.774 3 9.5C4.41 6.226 7.471 4 11 4ZM11 5.5C8.607 5.5 6.603 7.058 5.712 9.5C6.603 11.942 8.607 13.5 11 13.5C13.393 13.5 15.397 11.942 16.288 9.5C15.397 7.058 13.393 5.5 11 5.5ZM11 7.5C12.657 7.5 14 8.843 14 10.5C14 12.157 12.657 13.5 11 13.5C9.343 13.5 8 12.157 8 10.5C8 8.843 9.343 7.5 11 7.5ZM11 9C10.448 9 10 9.448 10 10C10 10.552 10.448 11 11 11C11.552 11 12 10.552 12 10C12 9.448 11.552 9 11 9Z" fill="#5C5C5C"/>
                    </svg>
                    <svg 
                        v-else
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.88 9.87988C9.58526 10.1545 9.34885 10.4857 9.18488 10.8537C9.02091 11.2217 8.93274 11.619 8.92564 12.0218C8.91853 12.4246 8.99263 12.8247 9.14351 13.1983C9.2944 13.5718 9.51898 13.9112 9.80385 14.196C10.0887 14.4809 10.4281 14.7055 10.8016 14.8564C11.1752 15.0073 11.5753 15.0814 11.9781 15.0742C12.3809 15.0671 12.7782 14.979 13.1462 14.815C13.5142 14.651 13.8454 14.4146 14.12 14.1199" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.61 6.61011C4.62125 7.96473 3.02987 9.82537 2 12.0001C2 12.0001 5 19.0001 12 19.0001C13.9159 19.0052 15.7908 18.4452 17.39 17.3901" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 2L22 22" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="relative">
                <p class="font-semibold mt-4">Новый пароль</p>
                <input 
                    v-model="UserData.newPassword" 
                    class="min-w-[325px] max-h-12 mt-3 p-3 rounded-lg pr-10" 
                    :type="showNewPassword ? 'text' : 'password'" 
                    placeholder="********"
                >
                <button 
                    class="absolute right-3 top-11 transform -translate-y-1/2"
                    @click="showNewPassword = !showNewPassword"
                    type="button"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        v-if="!showNewPassword"
                    >
                        <path d="M11 4C14.529 4 17.59 6.226 19 9.5C17.59 12.774 14.529 15 11 15C7.471 15 4.41 12.774 3 9.5C4.41 6.226 7.471 4 11 4ZM11 5.5C8.607 5.5 6.603 7.058 5.712 9.5C6.603 11.942 8.607 13.5 11 13.5C13.393 13.5 15.397 11.942 16.288 9.5C15.397 7.058 13.393 5.5 11 5.5ZM11 7.5C12.657 7.5 14 8.843 14 10.5C14 12.157 12.657 13.5 11 13.5C9.343 13.5 8 12.157 8 10.5C8 8.843 9.343 7.5 11 7.5ZM11 9C10.448 9 10 9.448 10 10C10 10.552 10.448 11 11 11C11.552 11 12 10.552 12 10C12 9.448 11.552 9 11 9Z" fill="#5C5C5C"/>
                    </svg>
                    <svg 
                        v-else
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.88 9.87988C9.58526 10.1545 9.34885 10.4857 9.18488 10.8537C9.02091 11.2217 8.93274 11.619 8.92564 12.0218C8.91853 12.4246 8.99263 12.8247 9.14351 13.1983C9.2944 13.5718 9.51898 13.9112 9.80385 14.196C10.0887 14.4809 10.4281 14.7055 10.8016 14.8564C11.1752 15.0073 11.5753 15.0814 11.9781 15.0742C12.3809 15.0671 12.7782 14.979 13.1462 14.815C13.5142 14.651 13.8454 14.4146 14.12 14.1199" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.73 5.08C11.1513 5.02751 11.5754 5.00079 12 5C19 5 22 12 22 12C21.5529 12.9571 20.9922 13.8569 20.33 14.68" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.61 6.61011C4.62125 7.96473 3.02987 9.82537 2 12.0001C2 12.0001 5 19.0001 12 19.0001C13.9159 19.0052 15.7908 18.4452 17.39 17.3901" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 2L22 22" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

            <div>
                <p class="font-semibold text-[20px] mt-[60px]">Уведомления</p>

                <div class="flex justify-between mt-4 items-center">
                    <p>Уведомление за оценки</p>
                    <label class="custom-toggle">
                        <input 
                            type="checkbox" 
                            v-model="notifications.grades" 
                            class="sr-only"
                        >
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="flex justify-between mt-4 items-center">
                    <p>Уведомлять за посещения</p>
                    <label class="custom-toggle">
                        <input 
                            type="checkbox" 
                            v-model="notifications.visits" 
                            class="sr-only"
                        >
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>

            <div class="gap-3 flex mt-[60px]">
                        <button class="py-3 px-6 min-w-[150px] bg-[#5E61FF] rounded-lg text-white font-semibold" @click="updateUser">Сохранить</button>
                        <button class="py-3 px-6 min-w-[107px] bg-white rounded-lg font-semibold border border-gray-300" @click="resetProfile">Отмена</button>
            </div> 

        </div>
    </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

const UserData = ref({})
const originalUserData = ref({})
const showOldPassword = ref(false)
const showNewPassword = ref(false)
const fileInput = ref(null)

const notifications = ref({
    grades: false,
    visits: false
})

const avatarUrl = computed(() => {
    if (UserData.value.avatar) {
        return `http://localhost:5000/uploads/avatars/${UserData.value.avatar}`;
    }
    return '/default-profile.png';
});

function triggerFileInput() {
    fileInput.value?.click();
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('avatar', file);

        const BEARER_TOKEN = localStorage.getItem("token");
        const response = await axios.post('http://localhost:5000/auth/upload-avatar', formData, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.avatar) {
            UserData.value.avatar = response.data.avatar;
            // Обновляем оригинальные данные
            originalUserData.value.avatar = response.data.avatar;
            alert('Фотография успешно загружена!');
        }
    } catch (error) {
        console.error('Ошибка при загрузке аватара:', error);
        alert('Ошибка при загрузке фотографии');
    } finally {
        event.target.value = '';
    }
}

async function deleteAvatar() {
    if (!UserData.value.avatar) return;

    if (!confirm('Вы уверены, что хотите удалить фотографию профиля?')) {
        return;
    }

    try {
        const BEARER_TOKEN = localStorage.getItem("token");
        const response = await axios.delete('http://localhost:5000/auth/delete-avatar', {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });

        if (response.data.success) {
            UserData.value.avatar = '';
            originalUserData.value.avatar = '';
            alert('Фотография успешно удалена!');
        }
    } catch (error) {
        console.error('Ошибка при удалении аватара:', error);
        alert('Ошибка при удалении фотографии');
    }
}

function handleImageError(event) {
    event.target.src = '/default-profile.png';
}

function initializeUserData() {
    return {
        lastName: '',
        firstName: '',
        patronymic: '',
        age: '',
        city: '',
        about: '',
        status: 'A',
        educationLevel: 'Среднее',
        educationalInstitution: '',
        faculty: '',
        yearOfGraduation: '',
        skills: '',
        achievements: '',
        linkProject: '',
        description: '',
        social1: '',
        linkSocial1: '',
        social2: '',
        linkSocial2: '',
        phoneNumber: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        avatar: ''
    }
}

async function updateUser(){
    const BEARER_TOKEN = localStorage.getItem("token")
    try {
        const res = await axios.put("http://localhost:5000/auth/profile", 
            {userData: UserData.value},
            {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`
                }
            }
        )
        console.log(res);
        originalUserData.value = {...UserData.value}
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error)
    }
}

function resetProfile() {
    UserData.value = {...originalUserData.value};
    UserData.value.oldPassword = ''
    UserData.value.newPassword = ''
    showOldPassword.value = false
    showNewPassword.value = false
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

const options = ref([
  { text: 'Ищу работу', value: 'A' },
  { text: 'Не ищу работу', value: 'B' },
  { text: 'Рассматриваю предложения', value: 'C' }
])

const educations = ref([
  { text: 'Среднее', value: 'Среднее' },
  { text: 'Среднее специальное', value: 'Среднее специальное' },
  { text: 'Высшее', value: 'Высшее' },
  { text: 'Неоконченное высшее', value: 'Неоконченное высшее' }
])

onMounted(async () => {
  console.log('Компонент смонтирован в DOM!');

  const BEARER_TOKEN = localStorage.getItem("token")
  try {
      const res = await axios.get("http://localhost:5000/auth/profile", {
          headers: {
              'Authorization': `Bearer ${BEARER_TOKEN}`
          }
      })
      console.log(res);
      if (res.data) {
          UserData.value = {...initializeUserData(), ...res.data}
          originalUserData.value = {...UserData.value}
      } else {
          UserData.value = initializeUserData()
          originalUserData.value = {...UserData.value}
      }
  } catch (error) {
      console.error('Ошибка при загрузке профиля:', error)
      UserData.value = initializeUserData()
      originalUserData.value = {...UserData.value}
  }
});
</script>

<style scoped>
.custom-toggle {
    display: inline-block;
    position: relative;
    cursor: pointer;
}

.toggle-slider {
    display: inline-block;
    width: 26px;
    height: 16px;
    background: #E5E7EB;
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: all 0.3s ease;
}

.sr-only:checked + .toggle-slider {
    background: #5E61FF;
}

.sr-only:checked + .toggle-slider::before {
    transform: translateX(10px);
}

.sr-only:focus + .toggle-slider {
    box-shadow: 0 0 0 2px rgba(94, 97, 255, 0.2);
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.relative button {
    transition: opacity 0.2s ease;
}

.relative button:hover {
    opacity: 0.7;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>