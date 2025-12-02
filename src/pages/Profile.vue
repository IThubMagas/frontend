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
            <div class="profile-header" id="general">
    <h2 class="text-[32px] font-semibold">Мой профиль</h2>
    <div class="profile-avatar flex mt-8 items-center gap-6">
        <div class="relative">
            <img 
                :src="avatarPreview || (UserData.avatar ? `http://localhost:3000/uploads/avatars/${UserData.avatar}` : 'images/placeholders/avatar.png')" 
                class="w-[120px] h-[120px] rounded-full object-cover" 
                alt="Фото профиля">
        </div>
        <div class="gap-4 flex">
            <label class="py-3 px-6 min-w-[115px] bg-[#5E61FF] rounded-lg text-white font-semibold cursor-pointer">
                Загрузить
                <input 
                    type="file" 
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden">
            </label>
            <button 
                @click="removeAvatar"
                class="py-3 px-6 min-w-[173px] bg-white rounded-lg font-semibold">Удалить</button>
        </div>
    </div>
                
                <!-- Основная информация -->
                <div class="flex gap-3 mt-8">
                    <div class="data-lastname max-h-[76px] w-[33%]">
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Фамилия</p>
                        </div>
                        <input v-model="UserData.lastName" class="w-[100%] max-h-12 mt-1 p-3 rounded-lg border" type="text" placeholder="Введите фамилию">
                    </div>
                    <div class="data-name max-h-[76px] w-[33%]">
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Имя</p>
                        </div>
                        <input v-model="UserData.firstName" class="w-[100%] max-h-12 mt-1 p-3 rounded-lg border" type="text" placeholder="Введите имя">
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
                        </div>
                        <input v-model="UserData.age" class="w-[100%] max-h-12 p-3 rounded-lg border" type="number" placeholder="Введите возраст">
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
                        <a v-if="UserData.contacts.telegram" :href="`https://t.me/${UserData.contacts.telegram}`" target="_blank" class="contact-link">
                            Telegram
                        </a>
                        <a v-if="UserData.contacts.github" :href="`https://github.com/${UserData.contacts.github}`" target="_blank" class="contact-link">
                            GitHub
                        </a>
                    </div>
                </div>
            </div>

            <!-- О себе -->
            <div class="mt-[60px]" id="aboutMe">
                <div class="flex justify-between items-center mb-4">
                    <p class="font-semibold text-[20px]">О себе</p>
                </div>

                <div class="max-h-[76px]">
                    <p class="font-semibold mt-4">Статус</p>
                    <select class="min-w-[278px] max-h-12 mt-2 p-3 rounded-lg border" v-model="UserData.status">
                        <option v-for="option in statusOptions" :value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>

                <div>
                    <p class="font-semibold mt-4">Кратко о себе</p>
                    <textarea v-model="UserData.about" class="w-full h-[100px] p-3 mt-3 rounded-lg border" placeholder="Введите информацию"></textarea>
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
                                {{ lang.language }} - {{ languageStatuses.find(status => status.value === lang.level).text }}
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
              <div class="flex justify-between items-center mb-4">
                <p class="font-semibold text-[20px]">Достижения</p>
            <button @click="openModal('achievement')" class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#e0e7ff] text-[#5E61FF] text-[14px] font-semibold rounded-lg border border-[#d0d7ff] hover:bg-[#d0d7ff] hover:-translate-y-0.5 transition-all duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
              </svg>
              Добавить достижение
            </button>
            </div>

              <div class="flex flex-col gap-4">
                <div v-for="(achievement, index) in achievements" :key="index" class="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white">
                  <div class="flex justify-between items-start">
                    <h3 class="text-base font-bold text-[#5E61FF] cursor-pointer w-fit" @click="downloadFile(achievement.file)">
                      {{ achievement.text }}
                    </h3>
                    <div class="flex gap-2 ml-3">
                      <button @click="editItem('achievement', index)" class="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Редактировать">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button @click="deleteItem('achievement', index)" class="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Удалить">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Проекты -->
            <div class="mt-[60px]" id="projects">
              <div class="flex justify-between items-center mb-4">
                <p class="font-semibold text-[20px]">Проекты</p>
                <button @click="openModal('project')" class="btn btn-add">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Добавить проект
                </button>
              </div>

              <div class="projects-list">
                <div v-for="(project, index) in projects" :key="index" class="project-card projects-block">
                  <div class="project-header">
                    <h3 class="project-title">{{ project.title }}</h3>
                    <div class="project-actions">
                      <button @click="editItem('project', index)" class="btn-icon edit-btn" title="Редактировать">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button @click="deleteItem('project', index)" class="btn-icon delete-btn" title="Удалить">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                    <span class="project-link">
                      <a :href="project.link" target="_blank" class="text-[#5E61FF] hover:underline">
                        {{ project.link }}
                      </a>
                    </span>
                  <p class="project-description">{{ project.description }}</p>
                </div>
              </div>
            </div>

            <!-- Соцсети -->
            <div class="mt-[60px]" id="social">
              <div class="flex justify-between items-center mb-4">
                <p class="font-semibold text-[20px]">Соцсети</p>
                <button @click="openModal('social')" class="btn btn-add">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Добавить соцсеть
                </button>
              </div>

              <div class="project-card">
                <div class="achievements-list">
                  <div v-for="(social, index) in socials" :key="index" class="achievement-item">
                    <a :href="social.link" target="_blank" class="achievement-link">
                      {{ social.social }} - {{ social.link }}
                    </a>
                    <div class="achievement-actions">
                      <button @click="editItem('social', index)" class="btn-icon edit-btn" title="Редактировать">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button @click="deleteItem('social', index)" class="btn-icon delete-btn" title="Удалить">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
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

                <!-- Проекты -->
                <div v-else-if="modalType === 'project'" class="form-group">
                  <label class="form-label">Название проекта</label>
                  <input v-model="modalData.title" class="form-input" placeholder="Например: Разработка веб-сервиса VITRIN.JOBS"/>
                  <label class="form-label">Ссылка на проект</label>
                  <input v-model="modalData.link" type="url" class="form-input" placeholder="https://example.com/project"/>
                  <label class="form-label">Описание проекта</label>
                  <textarea v-model="modalData.description" class="form-textarea"
                      placeholder="Опишите ваш проект..."></textarea>
                </div>

                <!-- Соцсети -->
                <div v-else-if="modalType === 'social'" class="form-group">
                  <label class="form-label">Название соцсети</label>
                  <input v-model="modalData.social" type="text" class="form-input" placeholder="Например: LinkedIn"/>
                  <label class="form-label">Ссылка</label>
                  <input v-model="modalData.socialLink" type="url" class="form-input" placeholder="https://example.com/profile"/>
                </div>

                <!-- Достижения -->
                <div v-else-if="modalType === 'achievement'" class="form-group">
                  <label class="form-label">Текст достижения</label>
                  <textarea v-model="modalData.achievementText" class="form-textarea"
                      placeholder="Опишите ваше достижение..."></textarea>
                  <input type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.doc,.docx" @change="handleFileUpload">
                  <p v-if="modalData.file">Выбран файл: {{ modalData.file.name }}</p>
                </div>

                <div v-else-if="modalType === 'contacts'" class="form-group">
                    <label class="form-label">Email</label>
                    <input v-model="modalData.email" type="email" class="form-input" placeholder="email@example.com"/>
                    <label class="form-label">Телефон</label>
                    <input v-model="modalData.phone" type="tel" class="form-input" placeholder="+79289177234"/>
                    <label class="form-label">Telegram Ник</label>
                    <input v-model="modalData.telegram" class="form-input"
                        placeholder="Например: Test123"/>
                    <label class="form-label">GitHub Ник</label>
                    <input v-model="modalData.github" class="form-input"
                        placeholder="Например: Test123"/>
                </div>

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

                <div v-else-if="modalType === 'skill'" class="form-group">
                    <label class="form-label">Название навыка</label>
                    <input v-model="modalData.name" type="text" class="form-input" placeholder="Например: JavaScript"/>
                </div>

                <div v-else-if="modalType === 'language'" class="form-group">
                    <label class="form-label">Язык</label>
                    <input v-model="modalData.language" type="text" class="form-input" placeholder="Например: Английский"/>
                    <label class="form-label">Уровень</label>
                    <select v-model="modalData.level" class="form-input">
                        <option v-for="languageStatus in languageStatuses" :value="languageStatus.value">{{ languageStatus.text }}</option>
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

const UserData = ref({});
const originalUserData = ref({});
const isLoading = ref(false);
const avatarPreview = ref(null);


const workExperience = computed(() => UserData.value.workExperience || []);
const education = computed(() => UserData.value.education || []);
const skills = computed(() => UserData.value.skills || []);
const languages = computed(() => UserData.value.languages || []);
const projects = computed(() => UserData.value.projects || []);
const socials = computed(() => UserData.value.socials || []);
const achievements = computed(() => UserData.value.achievements || []);

const hasContacts = computed(() => 
    UserData.value.email || 
    UserData.value.phoneNumber || 
    (UserData.value.contacts && (UserData.value.contacts.telegram || UserData.value.contacts.github))
);

const showModal = ref(false);
const modalType = ref('');
const isEditing = ref(false);
const editingIndex = ref(-1);

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
    level: 'Beginner',
    link: '',
    social: '',
    socialLink: '',
    achievementText: '',
    file: null
});

const showDeleteConfirm = ref(false);
const deleteType = ref('');
const deleteIndex = ref(-1);
const deletePreview = ref('');

const selected = ref('Not looking');
const statusOptions = ref([
  { text: 'Не ищу работу', value: 'Not looking' },
  { text: 'Открыт к предложениям', value: 'Open to offers' },
  { text: 'Активно ищу работу', value: 'Actively searching' }
]);

const industryOptions = ref([
  { text: 'Веб-разработка', value: 'Web Development' },
  { text: 'Программирование', value: 'Programming' },
  { text: 'Цифровой дизайн', value: 'Digital Design' },
  { text: 'Разработка игр', value: 'Game Development' },
  { text: 'Информационная безопасность', value: 'Information Security' },
  { text: 'Цифровой маркетинг', value: 'Digital Marketing' }
]);

const workFormatOptions = ref([
  { text: 'В офисе', value: 'On-site' },
  { text: 'Удаленно', value: 'Remote' },
  { text: 'Гибридный', value: 'Hybrid' }
]);

const employmentTypeOptions = ref([
  { text: 'Стажер', value: 'Intern' },
  { text: 'Волонтер', value: 'Volunteer' },
  { text: 'Полная занятость', value: 'Full-time' },
  { text: 'Частичная занятость', value: 'Part-time' }
]);

const languageStatuses = ref([
  { text: 'Начальный', value: 'Beginner' },
  { text: 'Средний', value: 'Intermediate' },
  { text: 'Продвинутый', value: 'Advanced' },
  { text: 'Родной', value: 'Native' }
])

// Методы для работы с API
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

async function loadUserProfile() {
  isLoading.value = true;
  try {
    const response = await axios.get("http://localhost:3000/users/profile/me", {
      headers: getAuthHeaders()
    });
    
    UserData.value = response.data.user || {};
    originalUserData.value = JSON.parse(JSON.stringify(UserData.value));
    
    if (!UserData.value.workExperience) UserData.value.workExperience = [];
    if (!UserData.value.education) UserData.value.education = [];
    if (!UserData.value.skills) UserData.value.skills = [];
    if (!UserData.value.languages) UserData.value.languages = [];
    if (!UserData.value.projects) UserData.value.projects = [];
    if (!UserData.value.socials) UserData.value.socials = [];
    if (!UserData.value.achievements) UserData.value.achievements = [];
    if (!UserData.value.contacts) UserData.value.contacts = {};
    
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
    alert('Не удалось загрузить профиль');
  } finally {
    isLoading.value = false;
  }
}

async function updateUser() {
  isLoading.value = true;
  try {
    const formData = new FormData();

    formData.append('firstName', UserData.value.firstName);
    formData.append('lastName', UserData.value.lastName);
    formData.append('patronymic', UserData.value.patronymic);
    formData.append('avatar', UserData.value.avatar ? UserData.value.avatar : 'DELETE_AVATAR');
    formData.append('email', UserData.value.email);
    formData.append('phoneNumber', UserData.value.phoneNumber);
    formData.append('age', UserData.value.age);
    formData.append('city', UserData.value.city);
    formData.append('about', UserData.value.about);
    formData.append('status', UserData.value.status);
    formData.append('industry', UserData.value.industry);
    formData.append('workFormat', UserData.value.workFormat);
    formData.append('employmentType', UserData.value.employmentType);
    formData.append('currentPassword', UserData.value.oldPassword);
    formData.append('newPassword', UserData.value.newPassword);

    if (UserData.value.workExperience) {
      if (Array.isArray(UserData.value.workExperience)) {
        UserData.value.workExperience.forEach((exp, index) => {
          formData.append(`workExperience[${index}][title]`, exp.title || '');
          formData.append(`workExperience[${index}][company]`, exp.company || '');
          formData.append(`workExperience[${index}][period]`, exp.period || '');
          formData.append(`workExperience[${index}][description]`, exp.description || '');
        });
      }
      else if (typeof UserData.value.workExperience === 'object') {
        const exp = UserData.value.workExperience;
        formData.append(`workExperience[0][title]`, exp.title || '');
        formData.append(`workExperience[0][company]`, exp.company || '');
        formData.append(`workExperience[0][period]`, exp.period || '');
        formData.append(`workExperience[0][description]`, exp.description || '');
      }
    }

    if (UserData.value.education && Array.isArray(UserData.value.education)) {
      UserData.value.education.forEach((edu, index) => {
        formData.append(`education[${index}][degree]`, edu.degree || '');
        formData.append(`education[${index}][field]`, edu.field || '');
        formData.append(`education[${index}][institution]`, edu.institution || '');
        formData.append(`education[${index}][year]`, edu.year || '');
      });
    }

    if (UserData.value.skills && Array.isArray(UserData.value.skills)) {
      UserData.value.skills.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });
    }

    if (UserData.value.languages && Array.isArray(UserData.value.languages)) {
      UserData.value.languages.forEach((lang, index) => {
        formData.append(`languages[${index}][language]`, lang.language || '');
        formData.append(`languages[${index}][level]`, lang.level || '');
      });
    }

    if (UserData.value.projects && Array.isArray(UserData.value.projects)) {
      UserData.value.projects.forEach((project, index) => {
        formData.append(`projects[${index}][title]`, project.title || '');
        formData.append(`projects[${index}][link]`, project.link || '');
        formData.append(`projects[${index}][description]`, project.description || '');
      });
    }

    if (UserData.value.socials && Array.isArray(UserData.value.socials)) {
      UserData.value.socials.forEach((social, index) => {
        formData.append(`socials[${index}][social]`, social.social || '');
        formData.append(`socials[${index}][link]`, social.link || '');
      });
    }

    if (UserData.value.contacts && typeof UserData.value.contacts === 'object') {
      Object.keys(UserData.value.contacts).forEach(key => {
        formData.append(`contacts[${key}]`, UserData.value.contacts[key]);
      });
    }

    if (UserData.value.achievements && Array.isArray(UserData.value.achievements)) {
      UserData.value.achievements.forEach((achievement, index) => {
        if (achievement.text) {
          formData.append(`achievements[${index}][text]`, achievement.text);
        }
        if(typeof achievement.file === 'string') {
          formData.append(`achievements[${index}][file]`, achievement.file);
        }
      });

      UserData.value.achievements.forEach((achievement) => {
        if (achievement.file && achievement.file instanceof File) {
          formData.append('achievementFiles', achievement.file);
        }
      });
    }

    const response = await axios.put(
      "http://localhost:3000/users/profile/me", 
      formData,
      { 
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    console.log('Профиль обновлен:', response.data);
    originalUserData.value = JSON.parse(JSON.stringify(UserData.value));
    alert('Профиль успешно обновлен!');
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    if (error.response?.data?.message) {
      alert(`Ошибка: ${error.response.data.message}`);
    } else {
      alert('Ошибка при сохранении изменений');
    }
  } finally {
    isLoading.value = false;
  }
}

async function resetProfile() {
  UserData.value = JSON.parse(JSON.stringify(originalUserData.value));
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
      case 'contacts':
        Object.assign(modalData, {
          email: UserData.value.email || '',
          phone: UserData.value.phoneNumber || '',
          telegram: UserData.value.contacts?.telegram || '',
          github: UserData.value.contacts?.github || ''
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
        UserData.value.email = modalData.email.trim();
        UserData.value.phoneNumber = modalData.phone.trim();
        if (!UserData.value.contacts) UserData.value.contacts = {};
        UserData.value.contacts.telegram = modalData.telegram.trim();
        UserData.value.contacts.github = modalData.github.trim();
        break;
      case 'workExperience':
        const workExp = {
          title: modalData.title.trim(),
          company: modalData.company.trim(),
          period: modalData.period.trim(),
          achievements: modalData.achievements.trim()
        };
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
        if (isEditing.value) {
          UserData.value.education[editingIndex.value] = edu;
        } else {
          UserData.value.education.push(edu);
        }
        break;
      case 'skill':
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
        if (isEditing.value) {
          UserData.value.languages[editingIndex.value] = lang;
        } else {
          UserData.value.languages.push(lang);
        }
        break;
      case 'project':
        const project = {
          title: modalData.title.trim(),
          link: modalData.link.trim(),
          description: modalData.description.trim()
        };
        if (isEditing.value) {
          UserData.value.projects[editingIndex.value] = project;
        } else {
          UserData.value.projects.push(project);
        }
        break;
      case 'social':
        const social = {
          social: modalData.social.trim(),
          link: modalData.socialLink.trim()
        };
        if (isEditing.value) {
          UserData.value.socials[editingIndex.value] = social;
        } else {
          UserData.value.socials.push(social);
        }
        break;
      case 'achievement':
        const achievement = {
          text: modalData.achievementText.trim(),
          file: modalData.file
        };
        if (isEditing.value) {
          UserData.value.achievements[editingIndex.value] = achievement;
        } else {
          UserData.value.achievements.push(achievement);
        }
        break;
    }

    closeModal();

  } catch (error) {
    console.error('Ошибка при сохранении:', error);
    alert('Ошибка при сохранении данных');
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
        type === 'project' ? item.link :
        type === 'social' ? `${item.social} - ${item.link}` :
        type === 'achievement' ? item.text :
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
      case 'project':
        UserData.value.projects.splice(deleteIndex.value, 1);
        break;
      case 'social':
        UserData.value.socials.splice(deleteIndex.value, 1);
        break;
      case 'achievement':
        UserData.value.achievements.splice(deleteIndex.value, 1);
        break;
    }
    
    closeDeleteConfirm();

  } catch (error) {
    console.error('Ошибка при удалении:', error);
    alert('Ошибка при удалении элемента');
  }
};

const getItemByType = (type, index) => {
  switch (type) {
    case 'skill': return UserData.value.skills?.[index];
    case 'workExperience': return UserData.value.workExperience?.[index];
    case 'education': return UserData.value.education?.[index];
    case 'language': return UserData.value.languages?.[index];
    case 'project': return UserData.value.projects?.[index];
    case 'social': return UserData.value.socials?.[index];
    case 'achievement': return UserData.value.achievements?.[index];
    default: return null;
  }
};

const handleFileUpload = (event) => {
  modalData.file = event.target.files[0];
}

const downloadFile = async (file) => {
  if (!file) return;

  if (typeof file === 'string') {
    if (!file.startsWith('http')) {
      file = `http://localhost:3000/uploads/achievements/${file}`;
    }
    
    try {
      const response = await fetch(file);
      
      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const blob = await response.blob();

      const urlParts = file.split('/');
      let fileName = urlParts[urlParts.length - 1];

      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1];
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Ошибка скачивания файла:', error);
    }
  }
  else if (file instanceof Blob) {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name || 'file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    if (file) {
        UserData.value.avatar = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeAvatar = () => {
    UserData.value.avatar = null;
    avatarPreview.value = null;
};


const editItem = (type, index) => {
  openModal(type, index);
};

const setActiveMenuItem = (index) => {
  activeMenuItem.value = index;
};

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
    case 'project':
      return modalData.title.trim().length > 0 && modalData.link.trim().length > 0 &&
          modalData.description.trim().length > 0;
    case 'social':
      return modalData.social.trim().length > 0 &&
          modalData.socialLink.trim().length > 0;
    case 'achievement':
      return modalData.achievementText.trim().length > 0 && modalData.file;
    default:
      return false;
  }
});

const modalTitle = computed(() => {
  const types = {
    name: 'Имя',
    age: 'Возраст',
    description: 'О себе',
    contacts: 'Контакты',
    education: 'Образование',
    workExperience: 'Опыт работы',
    skill: 'Навык',
    language: 'Язык',
    project: 'Проект',
    social: 'Соцсеть',
    achievement: 'Достижение'
  };
  const action = isEditing.value ? 'Редактирование' : 'Добавление';
  return isEditing.value ? `Редактирование ${types[modalType.value]}` : `Добавление ${types[modalType.value]}`;
});

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

onMounted(() => {
  loadUserProfile();
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

.project-link {
  font-size: 16px;
  font-weight: 500;
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