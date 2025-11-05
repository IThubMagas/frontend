// src/stores/resumeStore.js
import { defineStore } from 'pinia'

const generateId = (arr) => Math.max(0, ...arr.map(i => i.id || 0)) + 1

export const useResumeStore = defineStore('resume', {
  state: () => {
    const savedTheme = localStorage.getItem('resumeTheme')
    const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')

    const saved = localStorage.getItem('hhResumeData')
    const defaultData = {
      fullName: '',
      jobTitle: '',
      salary: 0,
      city: '',
      citizenship: '',
      about: '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
      githubUsername: '',
      profile: {
        name: '',
        avatar: '',
        bio: '',
        location: '',
        company: ''
      },
      projects: [],
      githubLanguages: [],
      lastUpdated: new Date().toISOString()
    }

    let data = { ...defaultData }
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        data = { ...defaultData, ...parsed }
      } catch (e) {
        console.warn('Failed to parse saved resume, using defaults')
      }
    }

    return {
      ...data,
      theme: defaultTheme
    }
  },

  getters: {
    completionPercent: (state) => {
      const fields = [
        state.fullName,
        state.jobTitle,
        state.about,
        state.experience.length,
        state.education.length,
        state.skills.length
      ]
      const filled = fields.filter(field => {
        if (typeof field === 'string') return field.trim().length > 0
        if (typeof field === 'number') return field > 0
        return false
      }).length
      
      return Math.round((filled / fields.length) * 100)
    },
    
    formattedSalary: (state) => {
      return state.salary ? `${state.salary.toLocaleString('ru-RU')} ₽` : 'Не указана'
    }
  },

  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('resumeTheme', this.theme)
      this.applyTheme()
    },

    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    initTheme() {
      this.applyTheme()
    },

    updateField(field, value) {
      this[field] = value
      this.lastUpdated = new Date().toISOString()
      this.save()
    },

    addExperience(data = {}) {
      this.experience.push({
        id: generateId(this.experience),
        company: 'Новая компания',
        position: 'Новая должность',
        description: '',
        startDate: new Date().toISOString().slice(0, 7),
        endDate: null,
        ...data
      })
      this.save()
    },
    
    updateExperience(id, data) {
      const index = this.experience.findIndex(e => e.id === id)
      if (index !== -1) {
        this.experience[index] = { ...this.experience[index], ...data }
        this.save()
      }
    },
    
    deleteExperience(id) {
      this.experience = this.experience.filter(e => e.id !== id)
      this.save()
    },

    addEducation(data = {}) {
      this.education.push({
        id: generateId(this.education),
        institution: 'Новый вуз',
        faculty: '',
        degree: '',
        year: new Date().getFullYear().toString(),
        ...data
      })
      this.save()
    },
    
    updateEducation(id, data) {
      const index = this.education.findIndex(e => e.id === id)
      if (index !== -1) {
        this.education[index] = { ...this.education[index], ...data }
        this.save()
      }
    },
    
    deleteEducation(id) {
      this.education = this.education.filter(e => e.id !== id)
      this.save()
    },

    addSkill(skill = 'Новый навык') {
      this.skills.push(skill)
      this.save()
    },
    
    deleteSkill(index) {
      this.skills.splice(index, 1)
      this.save()
    },

    addLanguage(lang = { lang: 'Новый язык', level: 'A1 — Начальный' }) {
      this.languages.push(lang)
      this.save()
    },
    
    deleteLanguage(index) {
      this.languages.splice(index, 1)
      this.save()
    },

    async fetchFromGithub(username) {
      if (!username) return

      this.githubUsername = username
      
      try {
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        if (!profileRes.ok) throw new Error('User not found')
        const profile = await profileRes.json()

        this.profile = {
          name: profile.name || profile.login,
          avatar: profile.avatar_url,
          bio: profile.bio || '',
          location: profile.location || '',
          company: profile.company || '',
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos
        }

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`
        )
        const repos = await reposRes.json()

        const projects = []
        const languageSet = new Set()

        for (const repo of repos) {
          if (repo.fork) continue

          try {
            const langRes = await fetch(repo.languages_url)
            const langs = await langRes.json()
            const repoLangs = Object.keys(langs)
            
            repoLangs.forEach(l => languageSet.add(l))
            
            projects.push({
              id: repo.id,
              name: repo.name,
              description: repo.description || 'Описание отсутствует',
              url: repo.html_url,
              languages: repoLangs,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              updated: repo.updated_at
            })
          } catch (error) {
            console.warn(`Failed to fetch languages for ${repo.name}:`, error)
          }
        }

        this.projects = projects
        this.githubLanguages = Array.from(languageSet)
        this.save()

      } catch (err) {
        console.error('GitHub fetch error:', err)
        throw new Error('Не удалось загрузить данные с GitHub')
      }
    },

    save() {
      const { theme, ...dataToSave } = this.$state
      dataToSave.lastUpdated = new Date().toISOString()
      localStorage.setItem('hhResumeData', JSON.stringify(dataToSave))
    }
  }
})