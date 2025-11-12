<template>
  <div class="resume-container">
    <!-- Заголовок с фото и основной информацией -->
    <div class="header-card">
      <div class="profile-section">
        <div class="photo-container">
          <img :src="resume.user.avatar || 'https://via.placeholder.com/120'" alt="Фото" class="profile-photo" />
          <button @click="openModal('photo')" class="edit-photo-btn" title="Изменить фото">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                stroke-width="2" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                stroke-width="2" />
            </svg>
          </button>
        </div>
        <div class="header-info">
          <div class="name-section">
            <h1 class="name">{{ fullName }}</h1>
            <button @click="openModal('name')" class="btn-icon edit-btn" title="Редактировать имя">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                  stroke-width="2" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                  stroke-width="2" />
              </svg>
            </button>
          </div>
          <div class="position-section">
            <p class="position">{{ resume.title }}</p>
            <button @click="openModal('position')" class="btn-icon edit-btn" title="Редактировать должность">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                  stroke-width="2" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                  stroke-width="2" />
              </svg>
            </button>
          </div>
          <div class="meta-info">
            <div class="meta-item">
              <span>Возраст: {{ resume.user.age }} лет</span>
              <button @click="openModal('age')" class="btn-icon edit-btn small" title="Редактировать возраст">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                    stroke-width="2" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
            </div>
            <div class="meta-item">
              <span>Опыт работы: {{ workExperience.length }}</span>
            </div>
            <div class="meta-item">
              <span style="color: #999;">Контакты:</span>
              <button @click="openModal('contacts')" class="btn-icon edit-btn small" title="Редактировать контакты">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <div class="contacts-info" v-if="hasContacts">
            <a v-if="resume.contacts.email" :href="`mailto:${resume.contacts.email}`" class="contact-link">
              {{ resume.contacts.email }}
            </a>
            <a v-if="resume.contacts.phone" :href="`tel:${resume.contacts.phone}`" class="contact-link">
              {{ resume.contacts.phone }}
            </a>
            <a v-if="resume.contacts.linkedin" :href="resume.contacts.linkedin" target="_blank" class="contact-link">
              LinkedIn
            </a>
            <a v-if="resume.contacts.github" :href="resume.contacts.github" target="_blank" class="contact-link">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- О себе -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">О себе</h2>
          <button @click="openModal('description')" class="btn-icon edit-btn" title="Редактировать раздел">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                stroke-width="2" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                stroke-width="2" />
            </svg>
          </button>
        </div>
        <div class="card-2">
          <p class="section-content">{{ resume.description }}</p>
        </div>
      </section>
    </div>

    <!-- Опыт работы -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Опыт работы</h2>
        <button @click="openModal('workExperience')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" />
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                    stroke-width="2" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
              <button @click="deleteItem('workExperience', index)" class="btn-icon delete-btn" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <p class="project-period">{{ work.period }}</p>
          <p class="project-description">{{ work.achievements }}</p>
        </div>
      </div>
    </section>

    <!-- Образование -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Образование</h2>
        <button @click="openModal('education')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" />
          </svg>
          Добавить образование
        </button>
      </div>
      <div class="projects-list">
        <div v-for="(edu, index) in education" :key="index" class="project-card projects-block">
          <div class="project-header">
            <h3 class="project-title">{{ edu.degree }} - {{ edu.field }}</h3>
            <div class="project-actions">
              <button @click="editItem('education', index)" class="btn-icon edit-btn" title="Редактировать">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                    stroke-width="2" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
              <button @click="deleteItem('education', index)" class="btn-icon delete-btn" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <p class="project-period">{{ edu.institution }}, {{ edu.year }} год</p>
        </div>
      </div>
    </section>

    <!-- Навыки -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Навыки</h2>
        <button @click="openModal('skill')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" />
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                    stroke-width="2" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
              <button @click="deleteItem('skill', index)" class="btn-icon delete-btn" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </span>
        </div>
      </div>
    </section>

    <!-- Языки -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Языки</h2>
        <button @click="openModal('language')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" />
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor"
                    stroke-width="2" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
              <button @click="deleteItem('language', index)" class="btn-icon delete-btn" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Универсальное модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ modalTitle }}</h3>
          <button @click="closeModal" class="btn-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- Личная информация -->
          <div v-if="['name', 'position', 'age'].includes(modalType)" class="form-group">
            <label class="form-label">{{ fieldLabels[modalType] }}</label>
            <input v-model="modalData.value" type="text" class="form-input"
              :placeholder="fieldPlaceholders[modalType]" />
          </div>

          <!-- Описание -->
          <div v-else-if="modalType === 'description'" class="form-group">
            <label class="form-label">О себе</label>
            <textarea v-model="modalData.description" class="form-textarea" placeholder="Расскажите о себе..."></textarea>
          </div>

          <!-- Контакты -->
          <div v-else-if="modalType === 'contacts'" class="form-group">
            <label class="form-label">Email</label>
            <input v-model="modalData.email" type="email" class="form-input" placeholder="email@example.com" />
            <label class="form-label">Телефон</label>
            <input v-model="modalData.phone" type="tel" class="form-input" placeholder="+79289177234" />
            <label class="form-label">LinkedIn</label>
            <input v-model="modalData.linkedin" type="url" class="form-input" placeholder="https://linkedin.com/in/username" />
            <label class="form-label">GitHub</label>
            <input v-model="modalData.github" type="url" class="form-input" placeholder="https://github.com/username" />
          </div>

          <!-- Опыт работы -->
          <div v-else-if="modalType === 'workExperience'" class="form-group">
            <label class="form-label">Должность</label>
            <input v-model="modalData.title" type="text" class="form-input" placeholder="Frontend Developer" />
            <label class="form-label">Компания</label>
            <input v-model="modalData.company" type="text" class="form-input" placeholder="Tech Solutions Inc." />
            <label class="form-label">Период работы</label>
            <input v-model="modalData.period" type="text" class="form-input" placeholder="2020-2023" />
            <label class="form-label">Достижения</label>
            <textarea v-model="modalData.achievements" class="form-textarea"
              placeholder="Опишите ваши достижения на этой должности..."></textarea>
          </div>

          <!-- Образование -->
          <div v-else-if="modalType === 'education'" class="form-group">
            <label class="form-label">Степень</label>
            <input v-model="modalData.degree" type="text" class="form-input" placeholder="Bachelor of Science" />
            <label class="form-label">Направление</label>
            <input v-model="modalData.field" type="text" class="form-input" placeholder="Computer Science" />
            <label class="form-label">Учебное заведение</label>
            <input v-model="modalData.institution" type="text" class="form-input" placeholder="University of Technology" />
            <label class="form-label">Год окончания</label>
            <input v-model="modalData.year" type="number" class="form-input" placeholder="2018" />
          </div>

          <!-- Навыки -->
          <div v-else-if="modalType === 'skill'" class="form-group">
            <label class="form-label">Название навыка</label>
            <input v-model="modalData.name" type="text" class="form-input" placeholder="Например: JavaScript" />
          </div>

          <!-- Языки -->
          <div v-else-if="modalType === 'language'" class="form-group">
            <label class="form-label">Язык</label>
            <input v-model="modalData.language" type="text" class="form-input" placeholder="Например: Английский" />
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
          <button @click="saveItem" class="btn btn-primary" :disabled="!isFormValid">
            {{ isEditing ? 'Сохранить' : 'Добавить' }}
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
import { ref, computed, reactive } from 'vue';

const resume = reactive({
  contacts: {
    email: "john.doe@example.com",
    phone: "+79289177234",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  },
  _id: "69131c2af93d9c74d1a99a78",
  user: {
    _id: "690afc84d6dc1f97a1227e30",
    firstName: "Ахмед",
    lastName: "Мартазанов",
    age: 20,
    avatar: "ava.png"
  },
  title: "Senior Software Engineer",
  description: "Experienced full-stack developer with 5+ years in web development",
  workExperience: [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2020-2023",
      achievements: "Разработал и внедрил новую систему компонентов, что увеличило скорость разработки на 40%"
    },
    {
      title: "Junior Web Developer",
      company: "Digital Agency Pro",
      period: "2018-2020",
      achievements: "Разработал и внедрил новую систему компонентов, что увеличило скорость разработки на 40%"
    },
    {
      title: "Software Engineer",
      company: "Innovation Labs",
      period: "2023-настоящее время",
      achievements: "Разработал и внедрил новую систему компонентов, что увеличило скорость разработки на 40%"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      institution: "University of Technology",
      year: 2018
    },
    {
      degree: "Master of Science",
      field: "Software Engineering",
      institution: "Tech Institute",
      year: 2020
    }
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "AWS",
    "Docker",
    "Git"
  ],
  languages: [
    {
      language: "Russian",
      level: "Beginner"
    }
  ],
  isPublic: true,
  createdAt: "2025-11-11T11:21:14.869Z",
  updatedAt: "2025-11-12T12:52:09.687Z",
  __v: 0
});

const fullName = computed(() => `${resume.user.firstName} ${resume.user.lastName}`);
const workExperience = computed(() => resume.workExperience || []);
const education = computed(() => resume.education || []);
const skills = computed(() => resume.skills || []);
const languages = computed(() => resume.languages || []);
const hasContacts = computed(() => 
  resume.contacts && (
    resume.contacts.email || 
    resume.contacts.phone || 
    resume.contacts.linkedin || 
    resume.contacts.github
  )
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
  linkedin: '',
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

//////////////////////////////////////////////////////////////// Подтверждение удаления
const showDeleteConfirm = ref(false);
const deleteType = ref('');
const deleteIndex = ref(-1);
const deletePreview = ref('');

//////////////////////////////////////////////////////////////// Лейблы и плейсхолдеры для полей
const fieldLabels = {
  name: 'Имя и фамилия',
  position: 'Должность',
  age: 'Возраст',
  description: 'О себе'
};

const fieldPlaceholders = {
  name: 'Введите имя и фамилию',
  position: 'Введите должность',
  age: 'Например: 20 лет',
  description: 'Расскажите о себе...'
};

//////////////////////////////////////////////////////////////// Вычисляемые свойства
const modalTitle = computed(() => {
  const types = {
    name: 'Имя',
    position: 'Должность',
    age: 'Возраст',
    description: 'О себе',
    contacts: 'Контакты',
    workExperience: 'Опыт работы',
    education: 'Образование',
    skill: 'Навык',
    language: 'Язык'
  };
  const action = isEditing.value ? 'Редактирование' : 'Добавление';
  return isEditing.value ? `Редактирование ${types[modalType.value]}` : `Добавление ${types[modalType.value]}`;
});

const isFormValid = computed(() => {
  switch (modalType.value) {
    case 'name':
    case 'position':
    case 'age':
      return modalData.value.trim().length > 0;
    case 'description':
      return modalData.description.trim().length > 0;
    case 'contacts':
      return modalData.email.trim().length > 0 || 
             modalData.phone.trim().length > 0 || 
             modalData.linkedin.trim().length > 0 || 
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

//////////////////////////////////////////////////////////////// Методы для модального окна
const openModal = (type, index = -1) => {
  modalType.value = type;
  isEditing.value = index !== -1;
  editingIndex.value = index;

  // Сброс данных
  Object.keys(modalData).forEach(key => modalData[key] = '');

  // Заполнение данных при редактировании
  if (isEditing.value) {
    const item = getItemByType(type, index);
    if (item) {
      Object.assign(modalData, item);
    }
  } else {
    // Заполнение данных для редактирования существующих полей
    switch (type) {
      case 'name':
        modalData.value = fullName.value;
        break;
      case 'position':
        modalData.value = resume.title;
        break;
      case 'age':
        modalData.value = resume.user.age.toString();
        break;
      case 'description':
        modalData.description = resume.description;
        break;
      case 'contacts':
        Object.assign(modalData, resume.contacts);
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

const saveItem = () => {
  if (!isFormValid.value) return;

  switch (modalType.value) {
    case 'name':
      const [firstName, ...lastNameParts] = modalData.value.trim().split(' ');
      resume.user.firstName = firstName;
      resume.user.lastName = lastNameParts.join(' ');
      break;
    case 'position':
      resume.title = modalData.value.trim();
      break;
    case 'age':
      resume.user.age = parseInt(modalData.value.trim());
      break;
    case 'description':
      resume.description = modalData.description.trim();
      break;
    case 'contacts':
      Object.assign(resume.contacts, {
        email: modalData.email.trim(),
        phone: modalData.phone.trim(),
        linkedin: modalData.linkedin.trim(),
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
      if (isEditing.value) {
        resume.workExperience[editingIndex.value] = workExp;
      } else {
        resume.workExperience.push(workExp);
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
        resume.education[editingIndex.value] = edu;
      } else {
        resume.education.push(edu);
      }
      break;
    case 'skill':
      if (isEditing.value) {
        resume.skills[editingIndex.value] = modalData.name.trim();
      } else {
        resume.skills.push(modalData.name.trim());
      }
      break;
    case 'language':
      const lang = {
        language: modalData.language.trim(),
        level: modalData.level
      };
      if (isEditing.value) {
        resume.languages[editingIndex.value] = lang;
      } else {
        resume.languages.push(lang);
      }
      break;
  }

  closeModal();
};

//////////////////////////////////////////////////////////////// Методы для удаления
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

const confirmDelete = () => {
  switch (deleteType.value) {
    case 'skill':
      resume.skills.splice(deleteIndex.value, 1);
      break;
    case 'workExperience':
      resume.workExperience.splice(deleteIndex.value, 1);
      break;
    case 'education':
      resume.education.splice(deleteIndex.value, 1);
      break;
    case 'language':
      resume.languages.splice(deleteIndex.value, 1);
      break;
  }
  closeDeleteConfirm();
};

//////////////////////////////////////////////////////////////// Вспомогательные методы
const getItemByType = (type, index) => {
  switch (type) {
    case 'skill': return resume.skills[index];
    case 'workExperience': return resume.workExperience[index];
    case 'education': return resume.education[index];
    case 'language': return resume.languages[index];
    default: return null;
  }
};

const editItem = (type, index) => {
  openModal(type, index);
};
</script>

<style scoped>
.contacts-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
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

.project-period {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.resume-container {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  margin-top: 100px;
  gap: 32px;
  color: #333;
}

.header-card {
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-section {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.photo-container {
  position: relative;
  display: inline-block;
}

.profile-photo {
  width: 126px;
  height: 126px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.edit-photo-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: #5E61FF;
  border: 2px solid white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.edit-photo-btn:hover {
  background: #4a4dff;
  transform: scale(1.1);
}

.header-info {
  flex: 1;
}

.name-section,
.position-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  color: #222;
}

.position {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.meta-info {
  display: flex;
  gap: 32px;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 0;
}

.section-content {
  margin-top: 16px;
  color: #444;
  font-size: 16px;
  line-height: 1.6;
}

.edu-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.label {
  width: 200px;
  font-size: 16px;
  color: #999;
  font-weight: 500;
}

.value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.project-card {
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Навыки */
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
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

/* Достижения */
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

/* Проекты */
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

.project-url {
  display: block;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
}

.project-url:hover {
  text-decoration: underline;
}

.project-description {
  line-height: 1.6;
  color: #444;
  font-size: 14px;
  margin: 0;
}

/* Кнопки */
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

/* Модальное окно */
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

/* Формы */
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

/* Анимации */
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

</style>