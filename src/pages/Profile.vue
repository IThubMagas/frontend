




<template>
    <div class="flex justify-center">
        <div class="mainProfile w-fit flex mt-[40px] gap-[93px]">
        <div class="min-w-[234px] p-20px">
            <ul class="flex gap-2 flex-col w-[268px]">
                <li v-for="(item, index) in menuItems" :key="item.id" 
                    class="py-5 pl-5 bg gap-y-1 bg-white text-sm font-semibold">
                    <a :href="`#${item.id}`" @click="setActiveMenuItem(index)" 
                       :class="{ 'text-[#5E61FF]': activeMenuItem === index }">
                        {{ item.title }}
                    </a>
                </li>
            </ul>
        </div>

        <div class="profile-main min-w-[896px]">
            <!-- Заголовок с фото и основной информацией -->
            <div class="profile-header" id="general">
                <h2 class="text-[32px] font-semibold">Мой профиль</h2>
                <div class="profile-avatar flex mt-8 items-center gap-6">
                    <div class="relative">
                        <img 
                            :src="UserData.avatar ? `http://localhost:3000/uploads/avatars/${UserData.avatar}` : '/default-profile.png'" 
                            class="w-[84px] h-[84px] rounded-full" 
                            alt="Фото профиля">
                        <button @click="openModal('photo')" class="absolute bottom-0 right-0 bg-[#5E61FF] text-white rounded-full w-6 h-6 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="gap-4 flex">
                        <button class="py-3 px-6 min-w-[115px] bg-[#5E61FF] rounded-lg text-white font-semibold">Загрузить фото</button>
                        <button class="py-3 px-6 min-w-[173px] bg-white rounded-lg font-semibold">Удалить</button>
                    </div>
                </div>
                
                <!-- Основная информация -->
                <div class="flex gap-3 mt-8">
                    <div class="data-lastname max-h-[76px] w-[33%]">
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Фамилия</p>
                            <button @click="openModal('name')" class="btn-icon edit-btn small">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                        <input v-model="UserData.lastName" class="w-[100%] max-h-12 mt-1 p-3 rounded-lg border" type="text" placeholder="Введите фамилию" readonly>
                    </div>
                    <div class="data-name max-h-[76px] w-[33%]">
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Имя</p>
                            <button @click="openModal('name')" class="btn-icon edit-btn small">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                        <input v-model="UserData.firstName" class="w-[100%] max-h-12 mt-1 p-3 rounded-lg border" type="text" placeholder="Введите имя" readonly>
                    </div>
                    <div class="data-surname max-h-[76px] w-[33%]">
                        <p class="font-semibold">Отчество</p>
                        <input v-model="UserData.patronymic" class="w-[100%] max-h-12 mt-1 p-3 rounded-lg border" type="text" placeholder="Введите отчество">
                    </div>
                </div>
                
                <div class="flex gap-3 mt-8">
                    <div class="max-h-[76px] w-[50%]">
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Возраст</p>
                            <button @click="openModal('age')" class="btn-icon edit-btn small">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                        <input v-model="UserData.age" class="w-[100%] max-h-12 p-3 rounded-lg border" type="number" placeholder="Введите возраст" readonly>
                    </div>
                    <div class="max-h-[76px] w-[50%]">
                        <p class="font-semibold">Населенный пункт</p>
                        <input v-model="UserData.city" class="w-[100%] max-h-12 p-3 rounded-lg border" type="text" placeholder="Введите город">
                    </div>
                </div>

                <!-- Контакты -->
                <div class="mt-8">
                    <div class="flex items-center gap-2 mb-4">
                        <p class="font-semibold text-[20px]">Контакты</p>
                        <button @click="openModal('contacts')" class="btn-icon edit-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="flex gap-3">
                        <div class="w-[50%]">
                            <p class="font-semibold">Номер</p>
                            <input v-model="UserData.phoneNumber" class="w-[100%] max-h-12 mt-2 p-3 rounded-lg border" type="text" placeholder="+7 (928) 321 22 22" readonly>
                        </div>
                        <div class="w-[50%]">
                            <p class="font-semibold">Почта</p>
                            <input v-model="UserData.email" class="w-[100%] max-h-12 mt-2 p-3 rounded-lg border" type="text" placeholder="name@mail.ru" readonly>
                        </div>
                    </div>
                    <div v-if="hasContacts" class="mt-4 flex flex-wrap gap-2">
                        <a v-if="UserData.telegram" :href="UserData.telegram" target="_blank" class="contact-link">
                            Telegram
                        </a>
                        <a v-if="UserData.github" :href="UserData.github" target="_blank" class="contact-link">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <!-- О себе -->
            <div class="mt-[60px]" id="aboutMe">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">О себе</p>
                    <button @click="openModal('description')" class="btn-icon edit-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>

                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Статус</p>
                    <select class="min-w-[278px] max-h-12 mt-2 p-3 rounded-lg border" v-model="UserData.status">
                        <option v-for="option in options" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>

                <div>
                    <p class="font-semibold mt-4">Кратко о себе</p>
                    <textarea v-model="UserData.about" class="w-full h-[100px] p-3 mt-3 rounded-lg border" placeholder="Введите информацию" readonly></textarea>
                </div>
            </div>

            <!-- Образование -->
            <div class="mt-[60px]" id="education">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">Образование</p>
                    <button @click="openModal('education')" class="btn btn-add">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Добавить образование
                    </button>
                </div>

                <div class="edu-list">
                    <div v-for="(edu, index) in education" :key="index" class="edu-item">
                        <div class="edu-row">
                            <div class="edu-label">Уровень образования</div>
                            <div class="edu-value">{{ edu.level || edu.degree }}</div>
                        </div>
                        <div class="edu-row">
                            <div class="edu-label">Учебное заведение</div>
                            <div class="edu-value">{{ edu.institution }}</div>
                        </div>
                        <div class="edu-row">
                            <div class="edu-label">Факультет/направление</div>
                            <div class="edu-value">{{ edu.field || edu.faculty }}</div>
                        </div>
                        <div class="edu-row">
                            <div class="edu-label">Год окончания</div>
                            <div class="edu-value">{{ edu.year || edu.graduationYear }}</div>
                        </div>
                        <div class="edu-actions">
                            <button @click="editItem('education', index)" class="btn-icon edit-btn" title="Редактировать">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            <button @click="deleteItem('education', index)" class="btn-icon delete-btn" title="Удалить">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Навыки -->
            <div class="mt-[60px]" id="skills">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">Навыки</p>
                    <button @click="openModal('skill')" class="btn btn-add">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Добавить навык
                    </button>
                </div>
                
                <div class="project-card">
                    <div class="skill-list">
                        <span v-for="(skill, index) in skills" :key="index" class="skill-tag">
                            {{ skill }}
                            <div class="skill-actions">
                                <button @click="editItem('skill', index)" class="btn-icon edit-btn" title="Редактировать">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button @click="deleteItem('skill', index)" class="btn-icon delete-btn" title="Удалить">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Языки -->
            <div class="mt-[60px]" id="languages">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">Языки</p>
                    <button @click="openModal('language')" class="btn btn-add">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Добавить язык
                    </button>
                </div>
                
                <div class="project-card">
                    <div class="achievements-list">
                        <div v-for="(lang, index) in languages" :key="index" class="achievement-item">
                            <span class="achievement-link">
                                {{ lang.language }} - {{ lang.level }}
                            </span>
                            <div class="achievement-actions">
                                <button @click="editItem('language', index)" class="btn-icon edit-btn" title="Редактировать">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button @click="deleteItem('language', index)" class="btn-icon delete-btn" title="Удалить">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Опыт работы -->
            <div class="mt-[60px]" id="workExperience">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">Опыт работы</p>
                    <button @click="openModal('workExperience')" class="btn btn-add">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Добавить опыт работы
                    </button>
                </div>
                
                <div class="projects-list">
                    <div v-for="(work, index) in workExperience" :key="index" class="project-card projects-block">
                        <div class="project-header">
                            <h3 class="project-title">{{ work.title }} в {{ work.company }}</h3>
                            <div class="project-actions">
                                <button @click="editItem('workExperience', index)" class="btn-icon edit-btn" title="Редактировать">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                                <button @click="deleteItem('workExperience', index)" class="btn-icon delete-btn" title="Удалить">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p class="project-period">{{ work.period }}</p>
                        <p class="project-description">{{ work.achievements }}</p>
                    </div>
                </div>
            </div>

            <!-- Достижения -->
            <div class="mt-[60px]">
                <p class="font-semibold text-[20px]">Достижения</p>
                <textarea v-model="UserData.achievements" class="w-full h-[100px] p-3 mt-3 rounded-lg border" placeholder="Текст"></textarea>
                <div class="gap-3 flex mt-3">
                    <button class="py-3 px-6 min-w-[150px] bg-[#5E61FF] rounded-lg text-white font-semibold">Загрузить</button>
                    <button class="py-3 px-6 min-w-[107px] bg-white rounded-lg font-semibold border">Удалить</button>
                </div>
            </div>

            <!-- Проекты -->
            <div class="mt-[60px]">
                <p class="font-semibold text-[20px]">Проекты</p>

                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Ссылка</p>
                    <input v-model="UserData.linkProject" class="min-w-full max-h-12 mt-2 p-3 rounded-lg border" type="text" placeholder="Введите ссылку">
                </div>

                <div>
                    <p class="font-semibold mt-4">Описание</p>
                    <textarea 
                        name="descript-project" 
                        class="w-full h-[123px] min-h-[100px] max-h-[300px] p-3 mt-3 rounded-lg border resize-y"
                        v-model="UserData.description" 
                        placeholder="Введите описание"
                    ></textarea>
                </div>
            </div>

            <!-- Ссылки на соцсети -->
            <div class="mt-[60px]">
                <p class="font-semibold text-[20px]">Ссылки на соцсети</p>

                <div class="flex gap-3">
                    <div>
                        <p class="font-semibold mt-4">Соцсеть или сайт</p>
                        <input class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="text" placeholder="Введите название">
                    </div>
                    <div>
                        <p class="font-semibold mt-4">Ссылка</p>
                        <input class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="text" placeholder="Введите ссылку">
                    </div>
                </div>
                <div class="flex gap-3">
                    <div>
                        <p class="font-semibold mt-4">Соцсеть или сайт</p>
                        <input v-model="UserData.social" class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="text" placeholder="Введите название">
                    </div>
                    <div>
                        <p class="font-semibold mt-4">Ссылка</p>
                        <input v-model="UserData.linkSocial" class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="text" placeholder="Введите ссылку">
                    </div>
                </div>
            </div>

            <!-- Безопасность -->
            <div class="mt-[60px]">
                <p class="font-semibold text-[20px]">Безопасность</p>

                <div class="flex gap-3">
                    <div>
                        <p class="font-semibold mt-4">Старый пароль</p>
                        <input v-model="UserData.oldPassword" class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="password" placeholder="********">
                    </div>
                    <div>
                        <p class="font-semibold mt-4">Новый пароль</p>
                        <input v-model="UserData.newPassword" class="min-w-[440px] max-h-12 mt-3 p-3 rounded-lg border" type="password" placeholder="********">
                    </div>
                </div>
            </div>

            <!-- Уведомления -->
            <div class="mt-[60px]">
                <p class="font-semibold text-[20px]">Уведомления</p>

                <div class="flex justify-between mt-4">
                    <p>Уведомление за оценки</p>
                    <input type="radio" v-model="UserData.notifyGrades">
                </div>
                <div class="flex justify-between mt-4">
                    <p>Уведомлять за посещения</p>
                    <input type="radio" v-model="UserData.notifyAttendance">
                </div>
            </div>

            <!-- Кнопки сохранения -->
            <div class="gap-3 flex mt-[60px] mb-[60px]">
                <button class="py-3 px-6 min-w-[150px] bg-[#5E61FF] rounded-lg text-white font-semibold" @click="updateUser">Сохранить</button>
                <button class="py-3 px-6 min-w-[107px] bg-white rounded-lg font-semibold border" @click="resetProfile">Отмена</button>
            </div>  
        </div>
    </div>

    <!-- Универсальное модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">{{ modalTitle }}</h3>
                <button @click="closeModal" class="btn-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>

            <div class="modal-body">
                <!-- Личная информация -->
                <div v-if="['name', 'age'].includes(modalType)" class="form-group">
                    <label class="form-label">{{ fieldLabels[modalType] }}</label>
                    <input v-model="modalData.value" type="text" class="form-input"
                        :placeholder="fieldPlaceholders[modalType]"/>
                </div>

                <!-- Описание -->
                <div v-else-if="modalType === 'description'" class="form-group">
                    <label class="form-label">О себе</label>
                    <textarea v-model="modalData.description" class="form-textarea"
                        placeholder="Расскажите о себе..."></textarea>
                </div>

                <!-- Контакты -->
                <div v-else-if="modalType === 'contacts'" class="form-group">
                    <label class="form-label">Email</label>
                    <input v-model="modalData.email" type="email" class="form-input" placeholder="email@example.com"/>
                    <label class="form-label">Телефон</label>
                    <input v-model="modalData.phone" type="tel" class="form-input" placeholder="+79289177234"/>
                    <label class="form-label">Telegram</label>
                    <input v-model="modalData.telegram" type="url" class="form-input"
                        placeholder="https://telegram.com/in/username"/>
                    <label class="form-label">GitHub</label>
                    <input v-model="modalData.github" type="url" class="form-input"
                        placeholder="https://github.com/username"/>
                </div>

                <!-- Образование -->
                <div v-else-if="modalType === 'education'" class="form-group">
                    <label class="form-label">Степень</label>
                    <input v-model="modalData.degree" type="text" class="form-input" placeholder="Bachelor of Science"/>
                    <label class="form-label">Направление</label>
                    <input v-model="modalData.field" type="text" class="form-input" placeholder="Computer Science"/>
                    <label class="form-label">Учебное заведение</label>
                    <input v-model="modalData.institution" type="text" class="form-input"
                        placeholder="University of Technology"/>
                    <label class="form-label">Год окончания</label>
                    <input v-model="modalData.year" type="number" class="form-input" placeholder="2018"/>
                </div>

                <!-- Опыт работы -->
                <div v-else-if="modalType === 'workExperience'" class="form-group">
                    <label class="form-label">Должность</label>
                    <input v-model="modalData.title" type="text" class="form-input" placeholder="Frontend Developer"/>
                    <label class="form-label">Компания</label>
                    <input v-model="modalData.company" type="text" class="form-input" placeholder="Tech Solutions Inc."/>
                    <label class="form-label">Период работы</label>
                    <input v-model="modalData.period" type="text" class="form-input" placeholder="2020-2023"/>
                    <label class="form-label">Достижения</label>
                    <textarea v-model="modalData.achievements" class="form-textarea"
                        placeholder="Опишите ваши достижения на этой должности..."></textarea>
                </div>

                <!-- Навыки -->
                <div v-else-if="modalType === 'skill'" class="form-group">
                    <label class="form-label">Название навыка</label>
                    <input v-model="modalData.name" type="text" class="form-input" placeholder="Например: JavaScript"/>
                </div>

                <!-- Языки -->
                <div v-else-if="modalType === 'language'" class="form-group">
                    <label class="form-label">Язык</label>
                    <input v-model="modalData.language" type="text" class="form-input" placeholder="Например: Английский"/>
                    <label class="form-label">Уровень</label>
                    <select v-model="modalData.level" class="form-input">
                        <option value="Beginner">Начальный</option>
                        <option value="Intermediate">Средний</option>
                        <option value="Advanced">Продвинутый</option>
                        <option value="Native">Родной</option>
                    </select>
                </div>
            </div>

            <div class="modal-footer">
                <button @click="closeModal" class="btn btn-secondary">Отмена</button>
                <button @click="saveItem" class="btn btn-primary" :disabled="!isFormValid || isLoading">
                    {{ isLoading ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Добавить') }}
                </button>
            </div>
        </div>
    </div>

    <!-- Подтверждение удаления -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteConfirm">
        <div class="modal-content confirm-modal" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">Подтверждение удаления</h3>
            </div>
            <div class="modal-body">
                <p>Вы уверены, что хотите удалить этот элемент?</p>
                <p class="delete-preview">{{ deletePreview }}</p>
            </div>
            <div class="modal-footer">
                <button @click="closeDeleteConfirm" class="btn btn-secondary">Отмена</button>
                <button @click="confirmDelete" class="btn btn-danger">Удалить</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import axios from 'axios';


const activeMenuItem = ref(0);
const menuItems = [
  { title: 'Общее', id: "general" },  
  { title: 'О себе', id: "aboutMe" },
  { title: 'Образование', id: "education" },
  { title: 'Навыки', id: "skills" },
  { title: 'Языки', id: "languages" },
  { title: 'Опыт работы', id: "workExperience" },
  { title: 'Достижения', id: "achievements" },
  { title: 'Проекты', id: "projects" },
  { title: 'Соцсети', id: "social" },
  { title: 'Безопасность', id: "security" },
  { title: 'Уведомления', id: "notifications" },
];

const setActiveMenuItem = (index) => {
    activeMenuItem.value = index;
};

const UserData = ref({});
const originalUserData = ref({});

const workExperience = computed(() => UserData.value.workExperience || []);
const education = computed(() => UserData.value.education || []);
const skills = computed(() => UserData.value.skills || []);
const languages = computed(() => UserData.value.languages || []);
const hasContacts = computed(() => 
    UserData.value.email || 
    UserData.value.phoneNumber || 
    UserData.value.telegram || 
    UserData.value.github
);

const showModal = ref(false);
const modalType = ref('');
const isEditing = ref(false);
const editingIndex = ref(-1);
const isLoading = ref(false);

const modalData = reactive({
    value: '',
    description: '',
    email: '',
    phone: '',
    telegram: '',
    github: '',
    title: '',
    company: '',
    period: '',
    achievements: '',
    degree: '',
    field: '',
    institution: '',
    year: '',
    name: '',
    language: '',
    level: 'Beginner'
});

const showDeleteConfirm = ref(false);
const deleteType = ref('');
const deleteIndex = ref(-1);
const deletePreview = ref('');

const selected = ref('A');
const options = ref([
  { text: 'Ищу работу', value: 'A' },
  { text: 'Работаю', value: 'B' },
  { text: 'Учусь', value: 'C' }
]);

const educations = ref([
  { text: 'Среднее', value: 'Среднее' },
  { text: 'Среднее специальное', value: 'Среднее специальное' },
  { text: 'Высшее', value: 'Высшее' }
]);

const fieldLabels = {
    name: 'Имя и фамилия',
    age: 'Возраст',
    description: 'О себе'
};

const fieldPlaceholders = {
    name: 'Введите имя и фамилию',
    age: 'Например: 20 лет',
    description: 'Расскажите о себе...'
};

const modalTitle = computed(() => {
    const types = {
        name: 'Имя',
        age: 'Возраст',
        description: 'О себе',
        contacts: 'Контакты',
        education: 'Образование',
        workExperience: 'Опыт работы',
        skill: 'Навык',
        language: 'Язык'
    };
    const action = isEditing.value ? 'Редактирование' : 'Добавление';
    return isEditing.value ? `Редактирование ${types[modalType.value]}` : `Добавление ${types[modalType.value]}`;
});

const isFormValid = computed(() => {
    switch (modalType.value) {
        case 'name':
        case 'age':
            return modalData.value.trim().length > 0;
        case 'description':
            return modalData.description?.trim().length > 0;
        case 'contacts':
            return modalData.email.trim().length > 0 ||
                modalData.phone.trim().length > 0 ||
                modalData.telegram.trim().length > 0 ||
                modalData.github.trim().length > 0;
        case 'workExperience':
            return modalData.title.trim().length > 0 &&
                modalData.company.trim().length > 0 &&
                modalData.period.trim().length > 0;
        case 'education':
            return modalData.degree.trim().length > 0 &&
                modalData.field.trim().length > 0 &&
                modalData.institution.trim().length > 0 &&
                modalData.year > 0;
        case 'skill':
            return modalData.name.trim().length > 0;
        case 'language':
            return modalData.language.trim().length > 0 &&
                modalData.level.trim().length > 0;
        default:
            return false;
    }
});

async function updateUser() {
    isLoading.value = true;
    const BEARER_TOKEN = localStorage.getItem("token");
    try {
        const res = await axios.put("http://localhost:3000/auth/profile", 
            { userData: UserData.value },
            { headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` } }
        );
        console.log('Профиль обновлен:', res);
        originalUserData.value = { ...UserData.value };
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        alert('Ошибка при сохранении изменений');
    } finally {
        isLoading.value = false;
    }
}

async function resetProfile() {
    UserData.value = { ...originalUserData.value };
}

const openModal = (type, index = -1) => {
    modalType.value = type;
    isEditing.value = index !== -1;
    editingIndex.value = index;

    Object.keys(modalData).forEach(key => modalData[key] = '');

    if (isEditing.value) {
        const item = getItemByType(type, index);
        if (item) {
            Object.assign(modalData, item);
        }
    } else {
        switch (type) {
            case 'name':
                modalData.value = `${UserData.value.firstName} ${UserData.value.lastName}`;
                break;
            case 'age':
                modalData.value = UserData.value.age?.toString() || '';
                break;
            case 'description':
                modalData.description = UserData.value.about || '';
                break;
            case 'contacts':
                Object.assign(modalData, {
                    email: UserData.value.email || '',
                    phone: UserData.value.phoneNumber || '',
                    telegram: UserData.value.telegram || '',
                    github: UserData.value.github || ''
                });
                break;
        }
    }

    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    setTimeout(() => {
        modalType.value = '';
        isEditing.value = false;
        editingIndex.value = -1;
    }, 300);
};

const saveItem = async () => {
  if (!isFormValid.value) return;

  try {
    switch (modalType.value) {
      case 'name':
        const [firstName, ...lastNameParts] = modalData.value.trim().split(' ');
        UserData.value.firstName = firstName;
        UserData.value.lastName = lastNameParts.join(' ');
        break;
      case 'age':
        UserData.value.age = parseInt(modalData.value.trim());
        break;
      case 'description':
        UserData.value.about = modalData.description.trim();
        break;
      case 'contacts':
        Object.assign(UserData.value, {
          email: modalData.email.trim(),
          phoneNumber: modalData.phone.trim(),
          telegram: modalData.telegram.trim(),
          github: modalData.github.trim()
        });
        break;
      case 'workExperience':
        const workExp = {
          title: modalData.title.trim(),
          company: modalData.company.trim(),
          period: modalData.period.trim(),
          achievements: modalData.achievements.trim()
        };
        if (!UserData.value.workExperience) UserData.value.workExperience = [];
        if (isEditing.value) {
          UserData.value.workExperience[editingIndex.value] = workExp;
        } else {
          UserData.value.workExperience.push(workExp);
        }
        break;
      case 'education':
        const edu = {
          degree: modalData.degree.trim(),
          field: modalData.field.trim(),
          institution: modalData.institution.trim(),
          year: parseInt(modalData.year)
        };
        if (!UserData.value.education) UserData.value.education = [];
        if (isEditing.value) {
          UserData.value.education[editingIndex.value] = edu;
        } else {
          UserData.value.education.push(edu);
        }
        break;
      case 'skill':
        if (!UserData.value.skills) UserData.value.skills = [];
        if (isEditing.value) {
          UserData.value.skills[editingIndex.value] = modalData.name.trim();
        } else {
          UserData.value.skills.push(modalData.name.trim());
        }
        break;
      case 'language':
        const lang = {
          language: modalData.language.trim(),
          level: modalData.level
        };
        if (!UserData.value.languages) UserData.value.languages = [];
        if (isEditing.value) {
          UserData.value.languages[editingIndex.value] = lang;
        } else {
          UserData.value.languages.push(lang);
        }
        break;
    }


    
    closeModal();

  } catch (error) {
    console.error('Ошибка при сохранении:', error);
  }
};

const deleteItem = (type, index) => {
    deleteType.value = type;
    deleteIndex.value = index;

    const item = getItemByType(type, index);
    if (item) {
        deletePreview.value = type === 'skill' ? item :
            type === 'language' ? `${item.language} - ${item.level}` :
            type === 'workExperience' ? `${item.title} в ${item.company}` :
            type === 'education' ? `${item.degree} - ${item.field}` :
            item.title || item.name || 'Элемент';
    }

    showDeleteConfirm.value = true;
};

const closeDeleteConfirm = () => {
    showDeleteConfirm.value = false;
    setTimeout(() => {
        deleteType.value = '';
        deleteIndex.value = -1;
        deletePreview.value = '';
    }, 300);
};

const confirmDelete = async () => {
  try {
    switch (deleteType.value) {
      case 'skill':
        UserData.value.skills.splice(deleteIndex.value, 1);
        break;
      case 'workExperience':
        UserData.value.workExperience.splice(deleteIndex.value, 1);
        break;
      case 'education':
        UserData.value.education.splice(deleteIndex.value, 1);
        break;
      case 'language':
        UserData.value.languages.splice(deleteIndex.value, 1);
        break;
    }


    
    closeDeleteConfirm();

  } catch (error) {
    console.error('Ошибка при удалении:', error);
  }
};


const getItemByType = (type, index) => {
    switch (type) {
        case 'skill': return UserData.value.skills?.[index];
        case 'workExperience': return UserData.value.workExperience?.[index];
        case 'education': return UserData.value.education?.[index];
        case 'language': return UserData.value.languages?.[index];
        default: return null;
    }
};

const editItem = (type, index) => {
    openModal(type, index);
};


onMounted(async () => {
    console.log('Компонент смонтирован в DOM!');

    const BEARER_TOKEN = localStorage.getItem("token");
    try {
        const res = await axios.get("http://localhost:3000/auth/profile", {
            headers: { 'Authorization': `Bearer ${BEARER_TOKEN}` }
        });
        console.log('Данные профиля:', res);
        UserData.value = res.data.students || {};
        originalUserData.value = { ...UserData.value };
        
        if (!UserData.value.workExperience) UserData.value.workExperience = [];
        if (!UserData.value.education) UserData.value.education = [];
        if (!UserData.value.skills) UserData.value.skills = [];
        if (!UserData.value.languages) UserData.value.languages = [];
        
    } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
    }
});
</script>

<style scoped>
.edu-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.edu-item {
  position: relative;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e0e0e0;
}

.edu-label {
  min-width: 180px;
  font-weight: 600;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.edu-value {
  flex: 1;
  color: #333;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 700;
}

.edu-actions {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  font-size: 14px;
  background-color: #EBEBFF;
  font-weight: 500;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background-color: #e0e0ff;
}

.skill-actions {
  display: flex;
  gap: 4px;
}

.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.achievement-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9ff;
  border-radius: 6px;
  border: 1px solid #eef0ff;
  transition: all 0.2s ease;
}

.achievement-item:hover {
  background: #f0f2ff;
  border-color: #5E61FF;
}

.achievement-link {
  color: #5E61FF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  flex: 1;
}

.achievement-link:hover {
  text-decoration: underline;
}

.achievement-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.projects-block {
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
}

.projects-block:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.project-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #222;
  flex: 1;
}

.project-actions {
  display: flex;
  gap: 8px;
  margin-left: 12px;
}

.project-period {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.project-description {
  line-height: 1.6;
  color: #444;
  font-size: 14px;
  margin: 0;
}


.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: #5E61FF;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #4a4dff;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-add {
  background-color: #e0e7ff;
  color: #5E61FF;
  font-weight: 600;
  border: 1px solid #d0d7ff;
}

.btn-add:hover {
  background-color: #d0d7ff;
  transform: translateY(-1px);
}

.btn-danger {
  background-color: #ff4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dd3333;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px;
  transition: all 0.2s ease;
  color: #999;
}

.btn-icon.small {
  padding: 4px;
}

.btn-icon.edit-btn:hover {
  background-color: #e0e7ff;
  color: #5E61FF;
}

.btn-icon.delete-btn:hover {
  background-color: #ffe0e0;
  color: #ff4444;
}

.contact-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: all 0.2s;
}

.contact-link:hover {
  color: #007bff;
  border-color: #007bff;
}

.project-card {
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.confirm-modal {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #999;
  border-radius: 4px;
}

.btn-close:hover {
  background: #f0f0f0;
  color: #666;
}

.modal-body {
  padding: 0 24px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px 24px;
  border-top: 1px solid #eee;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #5E61FF;
  box-shadow: 0 0 0 3px rgba(94, 97, 255, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}

.delete-preview {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid #ff4444;
  font-weight: 500;
  margin: 10px 0 0 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.border {
  border: 1px solid #e0e0e0;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.bottom-0 {
  bottom: 0;
}

.right-0 {
  right: 0;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.rounded-full {
  border-radius: 9999px;
}

.text-white {
  color: white;
}
</style>