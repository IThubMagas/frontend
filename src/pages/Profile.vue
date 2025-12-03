<template>
  <div class="app-conent">

    <div class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="(item, index) in menuItems" :key="index" class="nav-item">
            <a :href="`#${item.id}`" class="nav-link" :class="{ active: activeMenuItem === index }">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="resume-container" v-if="resume">
      <div class="header-card" id="general">
        <div class="section">
          <div class="photo-container">
            <img
              :src="resume.avatar ? `http://localhost:3000/uploads/avatars/${resume.avatar}` : '/images/placeholders/avatar.png'"
              alt="Фото" class="profile-photo" />
          </div>
          <div class="header-info">
            <div class="name-section">
              <h1 class="name">{{ fullName }}</h1>
            </div>
            <div class="position-section">
              <p class="position">{{ resume?.title }}</p>
            </div>
            <div class="meta-info">
              <div class="meta-item">
                <span v-if="resume.age">Возраст: {{ resume.age }} лет</span>
                <span v-else>Возраст: Не указан</span>
              </div>
              <div class="meta-item">
                <span>Опыт работы: {{ workExperience.length }}</span>
              </div>
              <div class="meta-item">
                <span style="color: #999;">Контакты:</span>
              </div>
            </div>
            <div class="contacts-info" v-if="hasContacts">
              <a v-if="resume.email" :href="`mailto:${resume.email}`" class="contact-link">
                {{ resume.email }}
              </a>
              <a v-if="resume.phoneNumber" :href="`tel:${resume.phoneNumber}`" class="contact-link">
                {{ resume.phoneNumber }}
              </a>
              <a v-if="resume.contacts?.telegram" :href="resume.contacts?.telegram" target="_blank" class="contact-link">
                Telegram
              </a>
              <a v-if="resume.contacts?.github" :href="resume.contacts?.github" target="_blank" class="contact-link">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- О себе -->
        <section class="section" id="aboutMe">
          <div class="section-header">
            <h2 class="section-title">О себе</h2>
          </div>
          <div class="card-2">
            <p class="section-content">{{ resume.about }}</p>
          </div>
        </section>
      </div>

      <!-- Образование -->
      <section class="section" id="education">
        <div class="section-header">
          <h2 class="section-title">Образование</h2>
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

            </div>
          </div>
        </div>
      </section>

      <!-- Навыки -->
      <section class="section" id="skills">
        <div class="section-header">
          <h2 class="section-title">Навыки</h2>
        </div>
        <div class="project-card">
          <div class="skill-list">
            <span v-for="(skill, index) in skills" :key="index" class="skill-tag">
              {{ skill }}
              <div class="skill-actions">
 
              </div>
            </span>
          </div>
        </div>
      </section>

      <!-- Языки -->
      <section class="section" id="languages">
        <div class="section-header">
          <h2 class="section-title">Языки</h2>
        </div>
        <div class="project-card">
          <div class="achievements-list">
            <div v-for="(lang, index) in languages" :key="index" class="achievement-item">
              <span class="achievement-link">
                {{ lang.language }} - {{ lang.level }}
              </span>
              <div class="achievement-actions">

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Опыт работы -->
      <section class="section" id="workExperience">
        <div class="section-header">
          <h2 class="section-title">Опыт работы</h2>
        </div>
        <div class="projects-list">
          <div v-for="(work, index) in workExperience" :key="index" class="project-card projects-block">
            <div class="project-header">
              <h3 class="project-title">{{ work.title }} в {{ work.company }}</h3>
              <div class="project-actions">

              </div>
            </div>
            <p class="project-period">{{ work.period }}</p>
            <p class="project-description">{{ work.achievements }}</p>
          </div>
        </div>
      </section>

    </div>

    <div class="loader-container" v-else>
      <span class="loader"></span>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const activeMenuItem = ref(0);
const menuItems = [
  { title: 'Общее', id: "general", blockId: "" },
  { title: 'О себе', id: "aboutMe", blockId: "" },
  { title: 'Образование', id: "education", blockId: "" },
  { title: 'Навыки', id: "skills", blockId: "" },
  { title: 'Языки', id: "languages", blockId: "" },
  { title: 'Опыт работы', id: "workExperience", blockId: "" },
];

const route = useRoute();
const id = ref(null);
id.value = route.params.id;

async function loadResume() {
  try {
    const res = await axios.get(`http://localhost:3000/users/profile/me`)
    resume.value = res.data.user
    console.log(res.data.user);

  } catch (error) {
    console.error(error);
  }
}


const resume = ref(null);

onMounted(() => {
  loadResume()
})

const fullName = computed(() => `${resume.value.firstName} ${resume.value.lastName} ${resume.value.patronymic}`);
const workExperience = computed(() => resume.value?.workExperience || []);
const education = computed(() => resume.value.education || []);
const skills = computed(() => resume.value.skills || []);
const languages = computed(() => resume.value.languages || []);
const hasContacts = computed(() =>
resume.value.email ||
    resume.value.phone ||
  resume.value.contacts && (
    resume.value.contacts.telegram ||
    resume.value.contacts.github
  )
);

</script>

<style scoped>
.app-conent {
  display: flex;
  margin-top: 40px;
  width: 1260px;
  gap: 97px;
  margin-inline: auto;
  margin-bottom: 100px;
}

.sidebar {
  color: #0B0B0B;
  height: 100vh;
}

.nav-list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 268px;
  border-radius: 10px;
  gap: 8px;
}

.nav-link {
  display: block;
  padding: 12px 20px;
  color: #0B0B0B;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  background-color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-link:hover {
  background-color: #EBEEFE;
  color: #333;
}

.nav-link.active {
  background-color: #EBEEFE;
  font-weight: bold;
}

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
  color: #333;
}

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

.header-card {
  
  border-radius: 12px;
  padding: 32px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}



.photo-container {
  position: relative;
  display: inline-block;
}

.profile-photo {
  width: 126px;
  height: 126px;
  object-fit: cover;
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
  flex-direction: column;
  gap: 12px;
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
  margin: 16px 0;
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
  gap: 5px;
  flex-direction: column;
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
</style>