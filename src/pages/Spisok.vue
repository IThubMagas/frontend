<template>
  <div class="container">
    <div class="filters-sidebar">
      <div class="filter-industry" @click="toggleIndustryFilter">
        <span class="filter-title">Все отрасли</span>
        <div class="burger-icon" :class="{ 'close-icon': showIndustryFilter }">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
      </div>

      <transition name="dropdown">
        <div v-if="showIndustryFilter" class="industry-dropdown">
          <div v-for="industry in industries" :key="industry" class="industry-item">
            <input type="checkbox" :id="industry" v-model="selectedIndustries" :value="industry" class="industry-checkbox">
            <label :for="industry" class="industry-label">{{ industry }}</label>
          </div>
        </div>
      </transition>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Формат работы</span>
        </div>
        <div class="filter-options">
          <div class="filter-option">
            <input type="radio" id="office" value="office" v-model="workFormat" class="radio-input">
            <label for="office" class="radio-label">В офисе</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="remote" value="remote" v-model="workFormat" class="radio-input">
            <label for="remote" class="radio-label">Удаленно</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="hybrid" value="hybrid" v-model="workFormat" class="radio-input">
            <label for="hybrid" class="radio-label">Гибрид</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Тип специалиста</span>
        </div>
        <div class="filter-options">
          <div class="filter-option">
            <input type="radio" id="trainee" value="trainee" v-model="specialistType" class="radio-input">
            <label for="trainee" class="radio-label">Стажер</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="volunteer" value="volunteer" v-model="specialistType" class="radio-input">
            <label for="volunteer" class="radio-label">Волонтер</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="full-time" value="full-time" v-model="specialistType" class="radio-input">
            <label for="full-time" class="radio-label">На полную занятость</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="part-time" value="part-time" v-model="specialistType" class="radio-input">
            <label for="part-time" class="radio-label">На частичную занятость</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Статус</span>
        </div>
        <div class="filter-options">
          <div class="filter-option">
            <input type="radio" id="not-looking" value="not-looking" v-model="status" class="radio-input">
            <label for="not-looking" class="radio-label">
              Не ищет работу
              <span class="status-count">10 234</span>
            </label>
          </div>
          <div class="filter-option">
            <input type="radio" id="consider-offer" value="consider-offer" v-model="status" class="radio-input">
            <label for="consider-offer" class="radio-label">
              Рассмотрит оффер
              <span class="status-count">5 678</span>
            </label>
          </div>
          <div class="filter-option">
            <input type="radio" id="active-search" value="active-search" v-model="status" class="radio-input">
            <label for="active-search" class="radio-label">
              В активном поиске
              <span class="status-count">3 456</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="users-list">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card">
        <div class="user-info">
          <div class="avatar-container">
            <img :src="user.avatar" :alt="user.name" class="user-avatar">
          </div>
          
          <div class="user-details">
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-specialty">{{ user.specialty }}</p>
            
            <div class="user-stats">
              <span class="projects-count">{{ user.projectsCount }} проектов</span>
              <span class="divider"></span>
              <span class="experience-duration">{{ user.experience }}</span>
            </div>
          </div>
        </div>
        
        <div class="user-actions">
          <button class="contact-button">
            Связаться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      showIndustryFilter: false,
      selectedIndustries: [],
      workFormat: '',
      specialistType: '',
      status: '',
      industries: [
        'Веб-разработка',
        'Программирование',
        'Цифровой дизайн',
        'Разработка игр',
        'Информационная безопасность',
        'Цифровой маркетинг'
      ],
      users: [
        {
          id: 1,
          name: 'Мартазанов Саид-Мухаммад',
          specialty: 'Frontend-Разработчик',
          experience: '1 год 11 месяцев',
          projectsCount: 5,
          format: 'office',
          type: 'full-time',
          status: 'active-search',
          avatar: '/images/orig.gif'
        },
        {
          id: 2,
          name: 'Петр Петров',
          specialty: 'Программирование',
          experience: '1 год',
          projectsCount: 3,
          format: 'remote',
          type: 'trainee',
          status: 'consider-offer',
          avatar: '/images/skala-platonred.gif'
        },
        {
          id: 3,
          name: 'Мария Сидорова',
          specialty: 'Цифровой дизайн',
          experience: '5 лет',
          projectsCount: 12,
          format: 'hybrid',
          type: 'full-time',
          status: 'not-looking',
          avatar: '/images/static-assets-upload10751231132763844813.webp'
        },
        {
          id: 4,
          name: 'Алексей Иванов',
          specialty: 'Веб-разработка',
          experience: '2 года 6 месяцев',
          projectsCount: 8,
          format: 'remote',
          type: 'full-time',
          status: 'active-search',
          avatar: '/images/static-assets-upload16817826243958398099.webp'
        }
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const industryMatch = this.selectedIndustries.length === 0 || 
                             this.selectedIndustries.includes(user.specialty)
        const formatMatch = !this.workFormat || user.format === this.workFormat
        const typeMatch = !this.specialistType || user.type === this.specialistType
        const statusMatch = !this.status || user.status === this.status
        
        return industryMatch && formatMatch && typeMatch && statusMatch
      })
    }
  },
  methods: {
    toggleIndustryFilter() {
      this.showIndustryFilter = !this.showIndustryFilter
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 93px;
  width: 1026px;
  min-height: 1744px;
  margin: 0 auto;
}

.filters-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 40px;
  width: 268px;
  flex: none;
  order: 0;
  flex-grow: 0;
  position: relative;
}

.users-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 662px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.user-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px;
  gap: 100px;
  width: 750px;
  height: 190px;
  background: #FFFFFF;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 126px;
  height: 126px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.user-avatar {
  width: 126px;
  height: 126px;
  border-radius: 103.279px;
  object-fit: cover;
  background: #f5f5f5;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 268px;
  height: 42px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.user-name {
  width: 400px;
  height: 20px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 125%;
  color: #262626;
  margin: 0;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.user-specialty {
  width: 100%;
  height: 14px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  margin: 0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
}

.user-stats {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 211px;
  height: 14px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.projects-count,
.experience-duration {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 117%;
}

.divider {
  width: 1px;
  height: 14px;
  background: #262626;
  flex: none;

  flex-grow: 0;
}

.user-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  margin: 0 auto;
  width: 163px;
  height: 44px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.contact-button {
  width: 163px;
  height: 44px;
  background: transparent;
  border: 2px solid #7F5EFF;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #7F5EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.contact-button:hover {
  background: #7F5EFF;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(127, 94, 255, 0.2);
}

.contact-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(127, 94, 255, 0.2);
}

.filter-industry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 19px;
  gap: 15px;
  width: 268px;
  height: 48px;
  background: #FFFFFF;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-industry:hover {
  border-color: #5E61FF;
  box-shadow: 0 2px 6px rgba(94, 97, 255, 0.1);
}

.filter-title {
  width: 100px;
  height: 16px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #262626;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.burger-icon {
  width: 15.52px;
  height: 12.5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: none;
  order: 1;
  flex-grow: 0;
  transition: all 0.3s ease;
}

.burger-icon .line {
  width: 100%;
  height: 2px;
  background: #262626;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-icon.close-icon .line:nth-child(1) {
  transform: rotate(48deg) translate(5px, 5px);
}

.burger-icon.close-icon .line:nth-child(2) {
  opacity: 0;
}

.burger-icon.close-icon .line:nth-child(3) {
  transform: rotate(-52deg) translate(2px, -2px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.industry-dropdown {
  width: 268px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 10;
}

.industry-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding: 4px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 4px;
}

.industry-item:hover {
  background-color: #f8f9ff;
}

.industry-item:last-child {
  margin-bottom: 0;
}

.industry-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid #d0d0d0;
  accent-color: #5E61FF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.industry-checkbox:checked {
  background-color: #5E61FF;
  border-color: #5E61FF;
}

.industry-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  color: #262626;
  cursor: pointer;
  flex: 1;
  transition: color 0.2s ease;
}

.industry-label:hover {
  color: #5E61FF;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 31px;
  width: 268px;
  margin-left: 1px;
  border-radius: 8px;
}

.filter-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 100%;
  height: 22px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.filter-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
  width: 100%;
  height: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 0;
  border-radius: 4px;
  position: relative;
}

.radio-input {
  width: 17px;
  height: 17px;
  flex: none;
  accent-color: #5E61FF;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
}

.radio-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #262626;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.status-count {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #989898;
  position: absolute;
  right: 0;
}

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

@media (max-width: 1100px) {
  .container {
    width: 100%;
    padding: 0 20px;
    gap: 40px;
    flex-direction: column;
  }
  
  .filters-sidebar {
    width: 100%;
  }
  
  .users-list {
    width: 100%;
  }
  
  .user-card {
    width: 100%;
    gap: 40px;
    padding: 24px;
  }
  
  .industry-dropdown {
    width: 100%;
  }
  
  .user-actions {
    width: 140px;
  }
  
  .contact-button {
    width: 140px;
  }
}

@media (max-width: 768px) {
  .user-card {
    flex-direction: column;
    height: auto;
    gap: 24px;
  }
  
  .user-info {
    width: 100%;
  }
  
  .user-actions {
    width: 100%;
    align-items: stretch;
  }
  
  .contact-button {
    width: 100%;
  }
}
</style>