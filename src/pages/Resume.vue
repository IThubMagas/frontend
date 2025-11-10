<template>
  <div class="resume-container">
    <!-- Шапка -->
    <div class="header-card">
      <img src="https://via.placeholder.com/120" alt="Фото" class="profile-photo" />
      <div class="header-info">
        <h1 class="name">Чахкиев Абдулла</h1>
        <p class="position">Frontend-Разработчик</p>
        <div class="meta-info">
          <span>Возраст: 18 лет</span>
          <span>Проектов: 6</span>
          <span style="color: #999;">Соцсети:</span>
        </div>
      </div>
      <!-- О себе -->
      <section class="section">
        <h2 class="section-title">О себе</h2>
        <div class="card-2">
          <p class="section-content">
            Чаще всего работал на языке Javascript. Но по моей инициативе для решения проблемы связанной с ограничениями
            языка, к нам в проект были добавлены микросервисы на Typescript. Также для контроля версий подключили Git.
            Да у меня отсутствует опыт работы в крупных it компаниях с бюрократией, трэкингом задач, могу ошибаться в
            технических терминах. Но предлагаю вам рассмотреть это как плюс, так как в небольших компаниях идет большая
            ответственность за свою работу, а остальное я изучу на практике со скоростью света.
          </p>
        </div>
      </section>
    </div>


    <!-- Образование -->
    <section class="section">
      <h2 class="section-title">Образование</h2>
      <div class="project-card section-card">
        <div class="edu-row">
          <div class="label">Уровень образования</div>
          <div class="value">Среднее профессиональное</div>
        </div>
        <div class="edu-row">
          <div class="label">Учебное заведение</div>
          <div class="value">Академия информационных технологий «IThub Magas»</div>
        </div>
        <div class="edu-row">
          <div class="label">Факультет/направление</div>
          <div class="value">Программист</div>
        </div>
        <div class="edu-row">
          <div class="label">Год окончания</div>
          <div class="value">2025</div>
        </div>
      </div>
    </section>

    <!-- Навыки -->
    <section class="section">
      <h2 class="section-title">Навыки</h2>
      <div class="project-card skill-card">
        <span v-for="skill in skills" :key="skill" class="skill-tag">{{ skill }}</span>
      </div>
    </section>

    <!-- Достижения -->
    <section class="section">
      <h2 class="section-title">Достижения</h2>
      <div class="project-card achievements-grid">
        <div v-for="(achievement, index) in achievements" :key="index" class="achievement-item">
          <a :href="achievement.url" target="_blank" class="achievement-link">{{ achievement.title }} <br></a>
        </div>
      </div>
    </section>

    <!-- Проекты -->
    <section class="section">
      <h2 class="section-title">Проекты</h2>
      <div v-for="project in projects" :key="project.id" class="project-card projects-block">
        <h3 class="project-title">{{ project.title }}</h3>
        <a :href="project.url" target="_blank" class="project-url">{{ project.url }}</a>
        <p class="project-description">
          {{ project.description }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const skills = [
  'Javascript', 'Typescript', 'React', 'Redux', 'Vue', 'Angular', 'Git',
  'Javascript', 'Typescript', 'React', 'Redux', 'Vue', 'Angular', 'Git'
];

const achievements = [
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' },
  { title: 'Грамота Министерства по делам молодежи Республики Ингушетия', url: '#' },
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' },
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' },
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' },
  { title: 'Благодарственное письмо Министерства цифрового развития РИ', url: '#' }
];

const projects = [
  {
    id: 1,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  },
  {
    id: 2,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  },
  {
    id: 3,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  },
  {
    id: 4,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  },
  {
    id: 5,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  },
  {
    id: 6,
    title: 'Разработка веб-сервиса VITRIN.JOBS',
    url: 'http://vitrin.jobs',
    description: 'Участвовал в разработке веб-сервиса, выполнял задачи по верстке макетов, сделал личный кабинет и функции добавления новостей и вакансий. Использовал Vue и Redux, а также ИИ-агентов для привязки телеграм-бота с функцией добавления вакансии через мессенджер. Бота сделал также самостоятельно на Python.'
  }
];
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

.profile-photo {
  width: 126px;
  height: 126px;
  border-radius: 50%;
  border: 1px solid #ddd;
}



.name {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #222;
}

.position {
  font-size: 14px;
  color: #999;
  margin: 0 0 10px 0;
}

.meta-info {
  display: flex;
  gap: 32px;
  font-size: 14px;
  font-weight: 500;
}



.section-title {
  font-size: 20px;
  font-weight: 700;
  font-weight: bold;
  color: #222;
  margin-bottom: 16px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
}

.section-content {
  margin-top: 16px;
  color: #444;
  font-size: 16px;
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
  padding: 32px 32px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-card {
  display: flex;
  flex-direction: column;
}

.skill-tag {
  width: max-content;
  padding: 8px 8px;
  border-radius: 6px;
  font-size: 14px;
  background-color: #EBEBFF;
  font-weight: 500;
}

.achievements-grid {
  display: grid;
  gap: 16px;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
}

.achievement-item {
  width: 216px;
  background: white;
  border-radius: 6px;
}

.achievement-link {
  color: #5E61FF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 800;
}

.achievement-link:hover {
  text-decoration: underline;
}

.projects-block {
  margin: 0 0 32px;
  display: flex;
  flex-direction: column;
}

.project-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #222;
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
</style>