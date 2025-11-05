<template>
  <div class="resume-app" :class="[store.theme, { 'exporting': isExporting }]">
    <!-- Floating Controls -->
    <div class="floating-controls">
      <button class="control-btn theme-toggle" @click="toggleTheme"
        :title="store.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'">
        <span class="icon">{{ store.theme === 'dark' ? '☀️' : '🌙' }}</span>
      </button>
      <button class="control-btn pdf-btn" @click="generatePdf" title="Скачать PDF">
        <span class="icon">📄</span>
      </button>
      <button class="control-btn preview-btn" @click="togglePreview"
        :title="isPreview ? 'Редактировать' : 'Предпросмотр'">
        <span class="icon">{{ isPreview ? '✏️' : '👁️' }}</span>
      </button>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-indicator">
      <div class="progress-bar" :style="{ width: `${completionPercent}%` }"></div>
    </div>

    <!-- Main Content -->
    <div class="resume-container">
      <!-- GitHub Integration -->
      <section class="github-section" v-motion-pop>
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">
              <span class="icon">⚡</span>
              GitHub Профиль
            </h2>
          </div>

          <div class="github-connect">
            <div class="input-group">
              <input v-model="githubInput" @keyup.enter="loadFromGithub" placeholder="username" class="github-input"
                :class="{ 'has-data': store.profile.name }" />
              <button @click="loadFromGithub" class="connect-btn" :disabled="loadingGithub">
                <span v-if="loadingGithub" class="spinner"></span>
                <span v-else>{{ store.profile.name ? 'Обновить' : 'Подключить' }}</span>
              </button>
            </div>

            <div v-if="store.profile.name" class="github-preview">
              <div class="profile-card">
                <img :src="store.profile.avatar" alt="Avatar" class="avatar" />
                <div class="profile-info">
                  <h3>{{ store.profile.name }}</h3>
                  <p v-if="store.profile.bio" class="bio">{{ store.profile.bio }}</p>
                  <div class="profile-meta">
                    <span v-if="store.profile.company" class="meta-item">
                      <span class="icon">🏢</span>
                      {{ store.profile.company }}
                    </span>
                    <span v-if="store.profile.location" class="meta-item">
                      <span class="icon">📍</span>
                      {{ store.profile.location }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Resume Builder -->
      <div class="resume-builder">
        <!-- Left Column - Personal Info -->
        <div class="left-column">
          <!-- Profile Header -->
          <section class="profile-section" v-motion-slide-visible-once-left>
            <div class="section-card profile-card">
              <div class="avatar-upload" @click="triggerAvatarUpload">
                <div class="avatar-placeholder">
                  <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar" class="avatar-img" />
                  <div v-else class="avatar-fallback">
                    <span class="icon">👤</span>
                  </div>
                  <div class="upload-overlay">
                    <span class="icon">📷</span>
                  </div>
                </div>
                <input type="file" ref="avatarInput" @change="handleAvatarUpload" accept="image/*" class="hidden" />
              </div>

              <div class="profile-main">
                <input v-model="editable.fullName" @blur="saveField('fullName')" placeholder="Ваше имя"
                  class="name-input" :class="{ 'empty': !editable.fullName }" />
                <input v-model="editable.jobTitle" @blur="saveField('jobTitle')" placeholder="Должность"
                  class="job-input" :class="{ 'empty': !editable.jobTitle }" />

                <div class="profile-meta">
                  <div class="meta-item">
                    <span class="icon">💰</span>
                    <input v-model.number="editable.salary" type="number" @blur="saveField('salary')" placeholder="0"
                      class="meta-input" />
                    <span>₽</span>
                  </div>
                  <div class="meta-item">
                    <span class="icon">🏙️</span>
                    <input v-model="editable.city" @blur="saveField('city')" placeholder="Город" class="meta-input" />
                  </div>
                  <div class="meta-item">
                    <span class="icon">🌍</span>
                    <input v-model="editable.citizenship" @blur="saveField('citizenship')" placeholder="Гражданство"
                      class="meta-input" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Skills -->
          <section class="skills-section" v-motion-slide-visible-once-left>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">🛠️</span>
                  Навыки
                </h3>
                <button class="add-btn" @click="addSkill" title="Добавить навык">
                  <span class="icon">+</span>
                </button>
              </div>

              <div class="skills-grid">
                <div v-for="(skill, idx) in editable.skills" :key="idx" class="skill-item">
                  <input v-model="editable.skills[idx]" @blur="saveSkills()" placeholder="Навык" class="skill-input" />
                  <button class="remove-btn" @click="deleteSkill(idx)" title="Удалить">
                    <span class="icon">×</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Languages -->
          <section class="languages-section" v-motion-slide-visible-once-left>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">🌐</span>
                  Языки
                </h3>
                <button class="add-btn" @click="addLanguage" title="Добавить язык">
                  <span class="icon">+</span>
                </button>
              </div>

              <div class="languages-list">
                <div v-for="(lang, idx) in editable.languages" :key="idx" class="language-item">
                  <input v-model="lang.lang" @blur="saveLanguages()" placeholder="Язык" class="lang-input" />
                  <select v-model="lang.level" @change="saveLanguages()" class="level-select">
                    <option value="A1 — Начальный">A1 — Начальный</option>
                    <option value="A2 — Элементарный">A2 — Элементарный</option>
                    <option value="B1 — Средний">B1 — Средний</option>
                    <option value="B2 — Выше среднего">B2 — Выше среднего</option>
                    <option value="C1 — Продвинутый">C1 — Продвинутый</option>
                    <option value="C2 — Владение в совершенстве">C2 — Владение в совершенстве</option>
                    <option value="Родной">Родной</option>
                  </select>
                  <button class="remove-btn" @click="deleteLanguage(idx)" title="Удалить">
                    <span class="icon">×</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column - Main Content -->
        <div class="right-column">
          <!-- About -->
          <section class="about-section" v-motion-slide-visible-once-right>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">👋</span>
                  Обо мне
                </h3>
                <div class="char-counter">{{ editable.about?.length || 0 }}/500</div>
              </div>

              <textarea v-model="editable.about" @blur="saveField('about')"
                placeholder="Расскажите о своих профессиональных качествах, опыте и целях..." class="about-textarea"
                maxlength="500" :class="{ 'empty': !editable.about }"></textarea>
            </div>
          </section>

          <!-- Experience -->
          <section class="experience-section" v-motion-slide-visible-once-right>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">💼</span>
                  Опыт работы
                </h3>
                <button class="add-btn primary" @click="addExperience">
                  <span class="icon">+</span>
                  Добавить
                </button>
              </div>

              <div class="timeline">
                <div v-for="exp in editable.experience" :key="exp.id" class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <div class="timeline-header">
                      <input v-model="exp.company" @blur="saveExperience(exp.id)" placeholder="Компания"
                        class="company-input" :class="{ 'empty': !exp.company }" />
                      <div class="timeline-actions">
                        <button class="action-btn" @click="toggleDateInputs(exp)" title="Даты">
                          <span class="icon">📅</span>
                        </button>
                        <button class="action-btn remove" @click="deleteExperience(exp.id)" title="Удалить">
                          <span class="icon">×</span>
                        </button>
                      </div>
                    </div>

                    <input v-model="exp.position" @blur="saveExperience(exp.id)" placeholder="Должность"
                      class="position-input" :class="{ 'empty': !exp.position }" />

                    <div v-if="exp.showDates" class="date-inputs">
                      <div class="date-group">
                        <label>Начало</label>
                        <input v-model="exp.startDate" type="month" @change="saveExperience(exp.id)"
                          class="date-input" />
                      </div>
                      <div class="date-group">
                        <label>Окончание</label>
                        <input v-model="exp.endDate" type="month" @change="saveExperience(exp.id)" class="date-input"
                          placeholder="По настоящее время" />
                      </div>
                    </div>

                    <textarea v-model="exp.description" @blur="saveExperience(exp.id)"
                      placeholder="Опишите ваши обязанности, достижения и проекты..." class="description-textarea"
                      :class="{ 'empty': !exp.description }"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Education -->
          <section class="education-section" v-motion-slide-visible-once-right>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">🎓</span>
                  Образование
                </h3>
                <button class="add-btn primary" @click="addEducation">
                  <span class="icon">+</span>
                  Добавить
                </button>
              </div>

              <div class="education-list">
                <div v-for="edu in editable.education" :key="edu.id" class="education-item">
                  <div class="edu-header">
                    <input v-model="edu.institution" @blur="saveEducation(edu.id)" placeholder="Учебное заведение"
                      class="institution-input" :class="{ 'empty': !edu.institution }" />
                    <button class="remove-btn" @click="deleteEducation(edu.id)" title="Удалить">
                      <span class="icon">×</span>
                    </button>
                  </div>

                  <input v-model="edu.faculty" @blur="saveEducation(edu.id)" placeholder="Факультет и специальность"
                    class="faculty-input" :class="{ 'empty': !edu.faculty }" />

                  <div class="edu-meta">
                    <input v-model="edu.degree" @blur="saveEducation(edu.id)" placeholder="Степень"
                      class="degree-input" />
                    <input v-model="edu.year" @blur="saveEducation(edu.id)" placeholder="Год окончания"
                      class="year-input" type="number" min="1900" :max="new Date().getFullYear()" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- GitHub Projects -->
          <section v-if="store.projects.length" class="projects-section" v-motion-slide-visible-once-right>
            <div class="section-card">
              <div class="section-header">
                <h3 class="section-title">
                  <span class="icon">🚀</span>
                  GitHub Проекты
                </h3>
                <div class="projects-count">{{ store.projects.length }} проектов</div>
              </div>

              <div class="projects-grid">
                <div v-for="project in store.projects" :key="project.id" class="project-card" v-motion-pop>
                  <div class="project-header">
                    <a :href="project.url" target="_blank" class="project-title">
                      {{ project.name }}
                    </a>
                    <div class="project-langs">
                      <span v-for="lang in project.languages.slice(0, 3)" :key="lang" class="lang-badge"
                        :style="{ backgroundColor: langColors[lang] || '#6b7280' }">
                        {{ lang }}
                      </span>
                      <span v-if="project.languages.length > 3" class="lang-more">
                        +{{ project.languages.length - 3 }}
                      </span>
                    </div>
                  </div>

                  <p class="project-description">{{ project.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- PDF Export (Hidden) -->
    <div ref="pdfContent" class="pdf-export">
      <!-- PDF content remains similar but with better styling -->
      <div class="pdf-resume">
        <!-- ... PDF content structure ... -->
      </div>
    </div>
  </div>
</template>
<!--  -->
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useResumeStore } from '../stores/resumeStore'
import html2pdf from 'html2pdf.js'

const store = useResumeStore()
const pdfContent = ref(null)
const isExporting = ref(false)
const isPreview = ref(false)
const loadingGithub = ref(false)
const githubInput = ref(store.githubUsername)
const avatarInput = ref(null)
const avatarPreview = ref(null)

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#4fc08d',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  'Jupyter Notebook': '#da5b0b'
}

// Computed
const completionPercent = computed(() => {
  const fields = [
    editable.fullName,
    editable.jobTitle,
    editable.about,
    editable.experience.length,
    editable.education.length,
    editable.skills.length
  ]
  const filled = fields.filter(field => {
    if (typeof field === 'string') return field.trim().length > 0
    if (typeof field === 'number') return field > 0
    return false
  }).length

  return Math.round((filled / fields.length) * 100)
})

// Editable state
const editable = reactive({
  fullName: store.fullName,
  jobTitle: store.jobTitle,
  salary: store.salary,
  city: store.city,
  citizenship: store.citizenship,
  about: store.about,
  experience: store.experience.map(exp => ({ ...exp, showDates: false })),
  education: [...store.education],
  skills: [...store.skills],
  languages: [...store.languages]
})

// Methods
const togglePreview = () => {
  isPreview.value = !isPreview.value
}

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
      // Save to store if needed
    }
    reader.readAsDataURL(file)
  }
}

const toggleDateInputs = (exp) => {
  exp.showDates = !exp.showDates
}

// Save methods (similar to original but with auto-save)
const autoSave = (action) => {
  action()
  store.save()
}

const saveField = (field) => autoSave(() => store.updateField(field, editable[field]))
const saveExperience = (id) => autoSave(() => {
  const exp = editable.experience.find(e => e.id === id)
  if (exp) store.updateExperience(id, { ...exp })
})
const saveEducation = (id) => autoSave(() => {
  const edu = editable.education.find(e => e.id === id)
  if (edu) store.updateEducation(id, { ...edu })
})
const saveSkills = () => autoSave(() => store.$state.skills = [...editable.skills])
const saveLanguages = () => autoSave(() => store.$state.languages = [...editable.languages])

// Add/Delete methods
const addExperience = () => autoSave(() => store.addExperience())
const deleteExperience = (id) => {
  if (confirm('Удалить запись об опыте?')) autoSave(() => store.deleteExperience(id))
}

const addEducation = () => autoSave(() => store.addEducation())
const deleteEducation = (id) => {
  if (confirm('Удалить запись об образовании?')) autoSave(() => store.deleteEducation(id))
}

const addSkill = () => autoSave(() => store.addSkill())
const deleteSkill = (index) => {
  if (confirm('Удалить навык?')) autoSave(() => store.deleteSkill(index))
}

const addLanguage = () => autoSave(() => store.addLanguage())
const deleteLanguage = (index) => {
  if (confirm('Удалить язык?')) autoSave(() => store.deleteLanguage(index))
}

const toggleTheme = () => store.toggleTheme()

const loadFromGithub = async () => {
  if (!githubInput.value.trim()) return

  loadingGithub.value = true
  try {
    await store.fetchFromGithub(githubInput.value.trim())
  } finally {
    loadingGithub.value = false
  }
}

const generatePdf = async () => {
  // PDF generation logic similar to original but optimized
}

onMounted(() => {
  store.initTheme()
})

// Watch for store changes
watch(
  () => store.$state,
  (newState) => {
    const { theme, ...data } = newState
    Object.assign(editable, {
      ...data,
      experience: data.experience.map(exp => ({
        ...exp,
        showDates: editable.experience.find(e => e.id === exp.id)?.showDates || false
      }))
    })
  },
  { deep: true }
)
</script>

<style scoped>
/* Modern CSS with CSS variables and modern layout */
.resume-app {
  min-height: 100vh;
  background: var(--bg-body);
  transition: all 0.3s ease;
}

/* CSS Variables for themes */
:root {
  --bg-body: #f8fafc;
  --bg-card: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --border: #e2e8f0;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --accent: #3b82f6;
  --accent-light: #dbeafe;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --radius: 12px;
  --transition: all 0.2s ease;
}

[data-theme="dark"] {
  --bg-body: #0f172a;
  --bg-card: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #64748b;
  --border: #334155;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  --accent: #60a5fa;
  --accent-light: #1e3a8a;
}

/* Layout */
.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.resume-builder {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 24px;
  margin-top: 24px;
}

/* Floating Controls */
.floating-controls {
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.control-btn {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: var(--bg-card);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  font-size: 18px;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Progress Indicator */
.progress-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--border);
  z-index: 1001;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--success));
  transition: width 0.3s ease;
}

/* Section Cards */
.section-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: var(--transition);
}

.section-card:hover {
  box-shadow: var(--shadow-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

/* Profile Section */
.profile-card {
  text-align: center;
}

.avatar-upload {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 20px;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--accent-light);
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.avatar-upload:hover .upload-overlay {
  opacity: 1;
}

.name-input,
.job-input {
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  color: var(--text-primary);
  outline: none;
}

.name-input {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.job-input {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.name-input.empty,
.job-input.empty {
  color: var(--text-tertiary);
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.meta-input {
  border: none;
  background: transparent;
  color: var(--text-primary);
  outline: none;
  flex: 1;
}

/* Input Styles */
.input-group {
  display: flex;
  gap: 8px;
}

.github-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
  transition: var(--transition);
}

.github-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.connect-btn {
  padding: 12px 20px;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  font-weight: 600;
}

.connect-btn:hover:not(:disabled) {
  background: #2563eb;
}

.connect-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Skills & Languages */
.skills-grid,
.languages-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-item,
.language-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.skill-input,
.lang-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
}

.level-select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
  min-width: 180px;
}

/* Timeline */
.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
}

.timeline-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 8px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.timeline-content {
  flex: 1;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
}

.company-input,
.position-input {
  border: none;
  background: transparent;
  color: var(--text-primary);
  outline: none;
  width: 100%;
}

.company-input {
  font-size: 16px;
  font-weight: 600;
}

.position-input {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.company-input.empty,
.position-input.empty {
  color: var(--text-tertiary);
}

/* Buttons */
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text-primary);
  cursor: pointer;
  transition: var(--transition);
  font-size: 14px;
}

.add-btn.primary {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.add-btn:hover {
  background: var(--accent-light);
  color: var(--accent);
}

.add-btn.primary:hover {
  background: #2563eb;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: var(--error);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: var(--transition);
}

.remove-btn:hover {
  background: #dc2626;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.project-card {
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.project-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 12px;
}

.project-title {
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  flex: 1;
}

.project-title:hover {
  color: var(--accent);
}

.project-langs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.lang-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: white;
}

.lang-more {
  font-size: 11px;
  color: var(--text-tertiary);
}

.project-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

/* Textareas */
.about-textarea,
.description-textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  background: var(--bg-card);
  color: var(--text-primary);
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: var(--transition);
}

.about-textarea:focus,
.description-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.about-textarea.empty,
.description-textarea.empty {
  color: var(--text-tertiary);
}

/* Character Counter */
.char-counter {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .resume-builder {
    grid-template-columns: 1fr;
  }

  .floating-controls {
    top: auto;
    bottom: 20px;
    right: 20px;
    flex-direction: row;
    transform: none;
  }

  .control-btn {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 640px) {
  .resume-container {
    padding: 12px;
  }

  .section-card {
    padding: 16px;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Utility Classes */
.hidden {
  display: none;
}

.empty {
  color: var(--text-tertiary) !important;
}
</style>