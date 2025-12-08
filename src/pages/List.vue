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
          <div v-for="industry in industries" :key="industry.enTitle" class="industry-item">
            <input type="checkbox" :id="industry.enTitle" v-model="selectedIndustries" :value="industry.enTitle"
              class="industry-checkbox">
            <label :for="industry.enTitle" class="industry-label">{{ industry.ruTitle }}</label>
          </div>
        </div>
      </transition>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Формат работы</span>
        </div>
        <div class="filter-options">
          <div class="filter-option" v-for="workFormat in workFormats" :key="workFormat.enTitle">
            <input type="radio" :id="workFormat.enTitle" :value="workFormat.enTitle" v-model="selectedWorkFormat"
              @click="workFormat.enTitle === selectedWorkFormat ? selectedWorkFormat = '' : null" class="radio-input">
            <label :for="workFormat.enTitle" class="radio-label">{{ workFormat.ruTitle }}</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Тип специалиста</span>
        </div>
        <div class="filter-options">
          <div class="filter-option" v-for="employmentType in employmentTypes" :key="employmentType.enTitle">
            <input type="radio" :id="employmentType.enTitle" :value="employmentType.enTitle"
              v-model="selectedEmploymentType"
              @click="employmentType.enTitle === selectedEmploymentType ? selectedEmploymentType = '' : null"
              class="radio-input">
            <label :for="employmentType.enTitle" class="radio-label">{{ employmentType.ruTitle }}</label>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-header">
          <span class="filter-title">Статус</span>
        </div>
        <div class="filter-options">
          <div class="filter-option" v-for="status in statuses" :key="status.enTitle">
            <input type="radio" :id="status.enTitle" :value="status.enTitle" v-model="selectedStatus"
              @click="status.enTitle === selectedStatus ? selectedStatus = '' : null" class="radio-input">
            <label :for="status.enTitle" class="radio-label">
              {{ status.ruTitle }}
              <span class="status-count">{{ status.count }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="users-list" v-if="!isUsersLoading && users.length">
        <div v-for="user in users" :key="user._id" class="user-card" @click="goToProfile(user._id)">
          <div class="user-info">
            <div class="avatar-container">
              <img
                :src="user.avatar ? `http://192.168.198.11:3000/uploads/avatars/${user.avatar}` : '/images/placeholders/avatar.png'"
                :alt="user.name" class="user-avatar">
            </div>

            <div class="user-details">
              <h3 class="user-name">{{ user.lastName }} {{ user.firstName }} {{ user.patronymic }}
              </h3>
              <p class="user-specialty">{{ user.title || "Vibe-Coder" }}</p>

              <div class="user-stats">
                <span class="projects-count">{{ getProjectsString(user.workExperience?.length + user.projects?.length) }}</span>
                <span class="divider"></span>
                <span class="experience-duration">{{ calculateExperience(user.workExperience) }}</span>
              </div>
            </div>
          </div>

          <div class="user-actions">
            <button class="contact-button" @click.stop="handleContact(user.phoneNumber)">
                Связаться
            </button>
          </div>
        </div>
      </div>

      <div class="pagination" v-if="!isUsersLoading && users.length">
        <button :disabled="!pagination.hasPrev" @click="prevPage"><</button>
        <span>{{ pagination.currentPage }} / {{ pagination.totalPages }}</span>
        <button :disabled="!pagination.hasNext" @click="nextPage">></button>
      </div>

      <div class="no-data" v-else-if="!isUsersLoading && !users.length">
        По вашим фильтрам резюме не найдено. Попробуйте поменять фильтры.
      </div>

      <div class="loader-container" v-else>
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserList',
  data() {
    return {
      showIndustryFilter: false,
      selectedIndustries: [],
      selectedWorkFormat: '',
      selectedEmploymentType: '',
      selectedStatus: '',
      industries: [
        { ruTitle: 'Веб-разработка', enTitle: "Web Development" },
        { ruTitle: 'Программирование', enTitle: "Programming" },
        { ruTitle: 'Цифровой дизайн', enTitle: "Digital Design" },
        { ruTitle: 'Разработка игр', enTitle: "Game Development" },
        { ruTitle: 'Информационная безопасность', enTitle: "Information Security" },
        { ruTitle: 'Цифровой маркетинг', enTitle: "Digital Marketing" },
      ],
      workFormats: [
        { ruTitle: "В офисе", enTitle: "On-site" },
        { ruTitle: "Удаленно", enTitle: "Remote" },
        { ruTitle: "Гибрид", enTitle: "Hybrid" },
      ],
      employmentTypes: [
        { ruTitle: "Стажер", enTitle: "Intern" },
        { ruTitle: "Волонтер", enTitle: "Volunteer" },
        { ruTitle: "На полную занятость", enTitle: "Full-time" },
        { ruTitle: "На частичную занятость", enTitle: "Part-time" },
      ],
      statuses: [
        { ruTitle: "Не ищет работу", enTitle: "Not looking", count: 0 },
        { ruTitle: "Рассмотрит оффер", enTitle: "Open to offers", count: 0 },
        { ruTitle: "В активном поиске", enTitle: "Actively searching", count: 0 },
      ],
      users: [],
      pagination: {},
      isUsersLoading: false
    }
  },
  mounted() {
    this.loadUsers()
    this.loadStatusCounts()
  },
  methods: {
    toggleIndustryFilter() {
      this.showIndustryFilter = !this.showIndustryFilter
    },
    async loadUsers(page = 1) {
      try {
        this.isUsersLoading = true
        let queryString = `page=${page}&`
        if (this.selectedIndustries.length) queryString += `industry=${this.selectedIndustries.join()}&`
        if (this.selectedWorkFormat) queryString += `workFormat=${this.selectedWorkFormat}&`
        if (this.selectedEmploymentType) queryString += `employmentType=${this.selectedEmploymentType}&`
        if (this.selectedStatus) queryString += `status=${this.selectedStatus}&`

        const res = await axios.get(`http://192.168.198.11:3000/users?${queryString}`)
        this.users = res?.data?.users
        this.pagination = res?.data?.pagination
        this.isUsersLoading = false
      } catch (error) {
        console.error('Ошибка:', error)
        this.users = []
        this.isUsersLoading = false
      }
    },
    async loadStatusCounts() {
      for (const status of this.statuses) {
        try {
          const response = await axios.get(`http://192.168.198.11:3000/users/count?status=${status.enTitle}`)
          status.count = response.data
        } catch (error) {
          console.error('Ошибка:', error)
          status.count = 0
        }
      }
    },
    goToProfile(userId) {
      this.$router.push({
        name: 'OtherProfile',
        params: {
          id: userId
        }
      })
    },
    handleContact(phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    },
    getProjectsString(count) {
      const lastNumber = count % 10;
      const lastTwoNumbers = count % 100;

      if (lastTwoNumbers >= 11 && lastTwoNumbers <= 14) {
        return `${count} проектов`;
      }

      if (lastNumber === 1) {
        return `${count} проект`;
      } else if (lastNumber >= 2 && lastNumber <= 4) {
        return `${count} проекта`;
      } else {
        return `${count} проектов`;
      }
    },
    calculateExperience(jobs) {
      let total = 0;
      const currentYear = new Date().getFullYear();
    
      for (const job of jobs) {
        const [start, end] = job.period.split('-');
        const endYear = end === 'настоящее время' ? currentYear : parseInt(end);
        const startYear = parseInt(start);
      
        total += endYear - startYear;
      }
    
      const lastDigit = total % 10;
      const lastTwoDigits = total % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${total} лет`;
      }

      if (lastDigit === 1) {
        return `${total} год`;
      }

      if (lastDigit >= 2 && lastDigit <= 4) {
        return `${total} года`;
      }

      return `${total} лет`;
    },
    prevPage() {
      this.loadUsers(this.pagination.currentPage-1)
    },
    nextPage() {
      this.loadUsers(this.pagination.currentPage+1)
    },
  },
  watch: {
    selectedIndustries() {
      this.loadUsers()
    },
    selectedWorkFormat() {
      this.loadUsers()
    },
    selectedEmploymentType() {
      this.loadUsers()
    },
    selectedStatus() {
      this.loadUsers()
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
  padding: 40px 0;
  gap: 93px;
  width: 1260px;
  margin: 0 auto;
}

.filters-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 268px;
  flex: none;
  order: 0;
  flex-grow: 0;
  position: sticky;
  top: 10px;
  height: 100%;
}

.users-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 896px;
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
  width: 100%;
  height: 190px;
  background: #FFFFFF;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  cursor: pointer;
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
  border-radius: 50%;
  object-fit: cover;
  background: #f5f5f5;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  gap: 8px;
  width: 268px;
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
  height: 16px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
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
  width: 269px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 56px;
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
  gap: 15px;
  width: 268px;
  margin-left: 1px;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px;
}

.filter-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 100%;
  height: 22px;
  color: #5E61FF;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.pagination button {
  background-color: #5E61FF;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
    background-color: #5E61FF9e;
  }
}

.pagination span {
  padding: 0 10px;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 32px;
  width: 896px;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 125%;
  color: #262626;
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