<template>
  <div class="resume-container">
    <!-- Заголовок с фото и основной информацией -->
    <div class="header-card">
      <div class="profile-section">
        <div class="photo-container">
          <img src="https://via.placeholder.com/120" alt="Фото" class="profile-photo" />
          <button @click="openModal('photo')" class="edit-photo-btn" title="Изменить фото">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="header-info">
          <div class="name-section">
            <h1 class="name">{{ personalInfo.name }}</h1>
            <button @click="openModal('name')" class="btn-icon edit-btn" title="Редактировать имя">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <div class="position-section">
            <p class="position">{{ personalInfo.position }}</p>
            <button @click="openModal('position')" class="btn-icon edit-btn" title="Редактировать должность">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <div class="meta-info">
            <div class="meta-item">
              <span>Возраст: {{ personalInfo.age }}</span>
              <button @click="openModal('age')" class="btn-icon edit-btn small" title="Редактировать возраст">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
            <div class="meta-item">
              <span>Проектов: {{ projects.length }}</span>
            </div>
            <div class="meta-item">
              <span style="color: #999;">Соцсети:</span>
              <button @click="openModal('social')" class="btn-icon edit-btn small" title="Добавить соцсети">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- О себе -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">О себе</h2>
          <button @click="openModal('about')" class="btn-icon edit-btn" title="Редактировать раздел">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="card-2">
          <p class="section-content">{{ aboutText }}</p>
        </div>
      </section>
    </div>

    <!-- Образование -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Образование</h2>
        <button @click="openModal('education')" class="btn-icon edit-btn" title="Редактировать раздел">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>
      <div class="project-card section-card">
        <div class="edu-row">
          <div class="label">Уровень образования</div>
          <div class="value">{{ education.level }}</div>
        </div>
        <div class="edu-row">
          <div class="label">Учебное заведение</div>
          <div class="value">{{ education.institution }}</div>
        </div>
        <div class="edu-row">
          <div class="label">Факультет/направление</div>
          <div class="value">{{ education.faculty }}</div>
        </div>
        <div class="edu-row">
          <div class="label">Год окончания</div>
          <div class="value">{{ education.graduationYear }}</div>
        </div>
      </div>
    </section>

    <!-- Навыки -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Навыки</h2>
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
    </section>

    <!-- Достижения -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Достижения</h2>
        <button @click="openModal('achievement')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
          </svg>
          Добавить достижение
        </button>
      </div>
      <div class="project-card">
        <div class="achievements-list">
          <div v-for="(achievement, index) in achievements" :key="index" class="achievement-item">
            <a :href="achievement.url" target="_blank" class="achievement-link">
              {{ achievement.title }}
            </a>
            <div class="achievement-actions">
              <button @click="editItem('achievement', index)" class="btn-icon edit-btn" title="Редактировать">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
              <button @click="deleteItem('achievement', index)" class="btn-icon delete-btn" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Проекты -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Проекты</h2>
        <button @click="openModal('project')" class="btn btn-add">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
          </svg>
          Добавить проект
        </button>
      </div>
      <div class="projects-list">
        <div v-for="(project, index) in projects" :key="project.id" class="project-card projects-block">
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
          <a :href="project.url" target="_blank" class="project-url">{{ project.url }}</a>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </section>

    <!-- Модальное окно -->
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
          <div v-if="['name', 'position', 'age'].includes(modalType)" class="form-group">
            <label class="form-label">{{ fieldLabels[modalType] }}</label>
            <input v-model="modalData.value" type="text" class="form-input" :placeholder="fieldPlaceholders[modalType]" />
          </div>

          <!-- О себе -->
          <div v-else-if="modalType === 'about'" class="form-group">
            <label class="form-label">О себе</label>
            <textarea v-model="modalData.about" class="form-textarea" placeholder="Расскажите о себе..."></textarea>
          </div>

          <!-- Образование -->
          <div v-else-if="modalType === 'education'" class="form-group">
            <label class="form-label">Уровень образования</label>
            <input v-model="modalData.level" type="text" class="form-input" placeholder="Среднее профессиональное" />
            <label class="form-label">Учебное заведение</label>
            <input v-model="modalData.institution" type="text" class="form-input" placeholder="Название учебного заведения" />
            <label class="form-label">Факультет/направление</label>
            <input v-model="modalData.faculty" type="text" class="form-input" placeholder="Специальность" />
            <label class="form-label">Год окончания</label>
            <input v-model="modalData.graduationYear" type="text" class="form-input" placeholder="2025" />
          </div>

          <!-- Навыки -->
          <div v-else-if="modalType === 'skill'" class="form-group">
            <label class="form-label">Название навыка</label>
            <input v-model="modalData.name" type="text" class="form-input" placeholder="Например: JavaScript" />
          </div>

          <!-- Достижения -->
          <div v-else-if="modalType === 'achievement'" class="form-group">
            <label class="form-label">Название достижения</label>
            <input v-model="modalData.title" type="text" class="form-input" placeholder="Например: Благодарственное письмо" />
            <label class="form-label">Ссылка</label>
            <input v-model="modalData.url" type="url" class="form-input" placeholder="https://example.com" />
          </div>

          <!-- Проекты -->
          <div v-else-if="modalType === 'project'" class="form-group">
            <label class="form-label">Название проекта</label>
            <input v-model="modalData.title" type="text" class="form-input" placeholder="Например: Веб-сервис VITRIN.JOBS" />
            <label class="form-label">Ссылка на проект</label>
            <input v-model="modalData.url" type="url" class="form-input" placeholder="https://example.com" />
            <label class="form-label">Описание проекта</label>
            <textarea v-model="modalData.description" class="form-textarea" placeholder="Опишите проект и вашу роль в нём..."></textarea>
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

const personalInfo = reactive({
  name: 'Чахкиев Абдулла',
  position: 'Frontend-Разработчик',
  age: '18 лет',
  social: ''
});

const aboutText = ref('Чаще всего работал на языке Javascript. Но по моей инициативе для решения проблемы связанной с ограничениями языка, к нам в проект были добавлены микросервисы на Typescript. Также для контроля версий подключили Git. Да у меня отсутствует опыт работы в крупных it компаниях с бюрократией, трэкингом задач, могу ошибаться в технических терминах. Но предлагаю вам рассмотреть это как плюс, так как в небольших компаниях идет большая ответственность за своей работы, а остальное я изучу на практике со скоростью света.');

const education = reactive({
  level: 'Среднее профессиональное',
  institution: 'Академия информационных технологий «IThub Magas»',
  faculty: 'Программист',
  graduationYear: '2025'
});

const skills = ref(['Javascript', 'Typescript', 'React', 'Vue', 'Git', 'HTML/CSS']);

const achievements = ref([
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' },
  { title: 'Грамота Министерства по делам молодежи Республики Ингушетия', url: '#' }
]);

const projects = ref([
  {
    id: 1,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий.'
  }
]);




///////////////////////////////// Модальное окно
const showModal = ref(false);
const modalType = ref('');
const isEditing = ref(false);
const editingIndex = ref(-1);

const modalData = reactive({
  value: '',
  about: '',
  level: '',
  institution: '',
  faculty: '',
  graduationYear: '',
  name: '',
  title: '',
  url: '',
  description: ''
});

///////////////////////////////// Подтверждение удаления
const showDeleteConfirm = ref(false);
const deleteType = ref('');
const deleteIndex = ref(-1);
const deletePreview = ref('');

///////////////////////////////// Лейблы и плейсхолдеры для полей
const fieldLabels = {
  name: 'Имя и фамилия',
  position: 'Должность',
  age: 'Возраст',
  about: 'О себе'
};

const fieldPlaceholders = {
  name: 'Введите имя и фамилию',
  position: 'Введите должность',
  age: 'Например: 18 лет',
  about: 'Расскажите о себе...'
};

///////////////////////////////// Вычисляемые свойства
const modalTitle = computed(() => {
  const types = {
    name: 'Имя',
    position: 'Должность',
    age: 'Возраст',
    about: 'О себе',
    education: 'Образование',
    skill: 'Навык',
    achievement: 'Достижение',
    project: 'Проект'
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
    case 'about':
      return modalData.about.trim().length > 0;
    case 'education':
      return modalData.level.trim().length > 0 && 
             modalData.institution.trim().length > 0 && 
             modalData.faculty.trim().length > 0 && 
             modalData.graduationYear.trim().length > 0;
    case 'skill':
      return modalData.name.trim().length > 0;
    case 'achievement':
      return modalData.title.trim().length > 0 && modalData.url.trim().length > 0;
    case 'project':
      return modalData.title.trim().length > 0 && modalData.url.trim().length > 0;
    default:
      return false;
  }
});

///////////////////////////////// Методы для модального окна
const openModal = (type, index = -1) => {
  modalType.value = type;
  isEditing.value = index !== -1;
  editingIndex.value = index;
  
  // Сброс данных
  Object.keys(modalData).forEach(key => modalData[key] = '');
  
  /////////////////////////////////// Заполнение данных при редактировании
  if (isEditing.value) {
    if (['skill', 'achievement', 'project'].includes(type)) {
      const item = getItemByType(type, index);
      if (type === 'skill') {
        modalData.name = item;
      } else {
        Object.assign(modalData, item);
      }
    }
  } else {
    /////////////////////////////////// Заполнение данных для редактирования существующих полей
    switch (type) {
      case 'name':
        modalData.value = personalInfo.name;
        break;
      case 'position':
        modalData.value = personalInfo.position;
        break;
      case 'age':
        modalData.value = personalInfo.age;
        break;
      case 'about':
        modalData.about = aboutText.value;
        break;
      case 'education':
        Object.assign(modalData, education);
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
      personalInfo.name = modalData.value.trim();
      break;
    case 'position':
      personalInfo.position = modalData.value.trim();
      break;
    case 'age':
      personalInfo.age = modalData.value.trim();
      break;
    case 'about':
      aboutText.value = modalData.about.trim();
      break;
    case 'education':
      Object.assign(education, {
        level: modalData.level.trim(),
        institution: modalData.institution.trim(),
        faculty: modalData.faculty.trim(),
        graduationYear: modalData.graduationYear.trim()
      });
      break;
    case 'skill':
      if (isEditing.value) {
        skills.value[editingIndex.value] = modalData.name.trim();
      } else {
        skills.value.push(modalData.name.trim());
      }
      break;
    case 'achievement':
      const achievement = {
        title: modalData.title.trim(),
        url: modalData.url.trim()
      };
      if (isEditing.value) {
        achievements.value[editingIndex.value] = achievement;
      } else {
        achievements.value.push(achievement);
      }
      break;
    case 'project':
      const project = {
        title: modalData.title.trim(),
        url: modalData.url.trim(),
        description: modalData.description.trim()
      };
      if (isEditing.value) {
        projects.value[editingIndex.value] = { 
          ...projects.value[editingIndex.value], 
          ...project 
        };
      } else {
        const id = Math.max(...projects.value.map(p => p.id), 0) + 1;
        projects.value.push({ id, ...project });
      }
      break;
  }
  
  closeModal();
};

/////////////////////////////////// Методы для удаления
const deleteItem = (type, index) => {
  deleteType.value = type;
  deleteIndex.value = index;
  
  const item = getItemByType(type, index);
  deletePreview.value = type === 'skill' ? item : item.title;
  
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
      skills.value.splice(deleteIndex.value, 1);
      break;
    case 'achievement':
      achievements.value.splice(deleteIndex.value, 1);
      break;
    case 'project':
      projects.value.splice(deleteIndex.value, 1);
      break;
  }
  closeDeleteConfirm();
};

/////////////////////////////////// Вспомогательные методы
const getItemByType = (type, index) => {
  switch (type) {
    case 'skill': return skills.value[index];
    case 'achievement': return achievements.value[index];
    case 'project': return projects.value[index];
    default: return null;
  }
};

const editItem = (type, index) => {
  openModal(type, index);
};
</script>

<style scoped>
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
  from { opacity: 0; }
  to { opacity: 1; }
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

/* Адаптивность */
@media (max-width: 768px) {
  .resume-container {
    margin-top: 20px;
    padding: 0 16px;
    gap: 24px;
  }
  
  .header-card {
    padding: 24px;
  }
  
  .project-card {
    padding: 24px;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
  }
  
  .name-section,
  .position-section {
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .meta-info {
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  
  .achievement-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .achievement-actions {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .project-actions {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .modal-content {
    margin: 20px;
    max-height: calc(100vh - 40px);
  }
  
  .modal-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .name {
    font-size: 24px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .skill-tag {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
}
</style>