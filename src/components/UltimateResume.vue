<template>
    <div class="ultimate-resume" :class="[store.theme, {
        'exporting': isExporting,
        'presentation-mode': isPresentationMode
    }]">

        <!-- === SUPER CONTROLS === -->
        <div class="super-controls">
            <div class="control-group">
                <button class="control-btn theme-toggle" @click="toggleTheme"
                    :title="store.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'">
                    <span class="icon">{{ store.theme === 'dark' ? '☀️' : '🌙' }}</span>
                </button>

                <button class="control-btn ai-toggle" @click="toggleAIPanel" title="AI Помощник">
                    <span class="icon">🤖</span>
                </button>

                <button class="control-btn analytics-toggle" @click="toggleAnalytics" title="Аналитика">
                    <span class="icon">📊</span>
                </button>

                <button class="control-btn game-toggle" @click="toggleGamification" title="Достижения">
                    <span class="icon">🏆</span>
                </button>

                <button class="control-btn presentation-toggle" @click="togglePresentationMode"
                    title="Режим презентации">
                    <span class="icon">🎥</span>
                </button>

                <button class="control-btn pdf-btn" @click="generatePdf" title="Скачать PDF">
                    <span class="icon">📄</span>
                </button>

                <button class="control-btn preview-btn" @click="togglePreview"
                    :title="isPreview ? 'Редактировать' : 'Предпросмотр'">
                    <span class="icon">{{ isPreview ? '✏️' : '👁️' }}</span>
                </button>
            </div>

            <!-- Progress Mega Indicator -->
            <div class="mega-progress">
                <div class="progress-ring" :style="`--progress: ${completionPercent}`">
                    <span>{{ completionPercent }}%</span>
                </div>
                <div class="progress-stats">
                    <div class="stat">{{ store.experience.length }} опыта</div>
                    <div class="stat">{{ store.skills.length }} навыков</div>
                    <div class="stat">{{ store.projects.length }} проектов</div>
                </div>
            </div>
        </div>

        <!-- === AI ASSISTANT PANEL === -->
        <div v-if="showAIPanel" class="ai-panel">
            <div class="ai-header">
                <h3>🤖 AI Помощник</h3>
                <button @click="showAIPanel = false" class="close-btn">×</button>
            </div>

            <div class="ai-tabs">
                <button v-for="tab in aiTabs" :key="tab.id" @click="activeAITab = tab.id"
                    :class="{ active: activeAITab === tab.id }">
                    {{ tab.name }}
                </button>
            </div>

            <div class="ai-content">
                <div v-if="activeAITab === 'generate'" class="ai-section">
                    <h4>✨ Генерация текста</h4>
                    <select v-model="selectedAIField" class="ai-select">
                        <option value="about">Обо мне</option>
                        <option value="experience">Опыт работы</option>
                        <option value="skills">Навыки</option>
                    </select>
                    <textarea v-model="aiPrompt" placeholder="Опишите ваш опыт: '3 года фронтенд, Vue.js, Team Lead...'"
                        class="ai-textarea"></textarea>
                    <button @click="generateAIText" :disabled="aiGenerating" class="ai-generate-btn">
                        <span v-if="aiGenerating" class="spinner"></span>
                        {{ aiGenerating ? 'Генерирую...' : 'Сгенерировать ✨' }}
                    </button>

                    <div v-if="aiResult" class="ai-result">
                        <div class="ai-result-text">{{ aiResult }}</div>
                        <div class="ai-actions">
                            <button @click="applyAIText" class="btn-primary">Применить</button>
                            <button @click="regenerateAIText" class="btn-secondary">Перегенерировать</button>
                        </div>
                    </div>
                </div>

                <div v-if="activeAITab === 'optimize'" class="ai-section">
                    <h4>🎯 Оптимизация под вакансию</h4>
                    <textarea v-model="jobDescription" placeholder="Вставьте описание вакансии..."
                        class="ai-textarea"></textarea>
                    <button @click="optimizeResume" class="ai-optimize-btn">
                        Анализировать вакансию
                    </button>

                    <div v-if="optimizationSuggestions.length" class="suggestions">
                        <h5>Рекомендации по улучшению:</h5>
                        <div v-for="suggestion in optimizationSuggestions" :key="suggestion.id" class="suggestion-item">
                            <span class="suggestion-text">{{ suggestion.text }}</span>
                            <button @click="applySuggestion(suggestion)" class="btn-small">Применить</button>
                        </div>
                    </div>
                </div>

                <div v-if="activeAITab === 'skills'" class="ai-section">
                    <h4>🛠️ Рекомендации навыков</h4>
                    <div class="skills-suggestions">
                        <div class="skill-category">
                            <h5>Frontend</h5>
                            <div class="skill-chips">
                                <span v-for="skill in frontendSkills" :key="skill" class="skill-chip"
                                    @click="addSuggestedSkill(skill)">
                                    {{ skill }}
                                </span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h5>Backend</h5>
                            <div class="skill-chips">
                                <span v-for="skill in backendSkills" :key="skill" class="skill-chip"
                                    @click="addSuggestedSkill(skill)">
                                    {{ skill }}
                                </span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h5>Tools & Other</h5>
                            <div class="skill-chips">
                                <span v-for="skill in otherSkills" :key="skill" class="skill-chip"
                                    @click="addSuggestedSkill(skill)">
                                    {{ skill }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- === ANALYTICS DASHBOARD === -->
        <div v-if="showAnalytics" class="analytics-panel">
            <div class="analytics-header">
                <h3>📊 Аналитика резюме</h3>
                <button @click="showAnalytics = false" class="close-btn">×</button>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-value" :class="getReadabilityClass">
                        {{ readabilityScore }}/100
                    </div>
                    <div class="metric-label">Читабельность</div>
                </div>

                <div class="metric-card">
                    <div class="metric-value">{{ completionPercent }}%</div>
                    <div class="metric-label">Заполнено</div>
                </div>

                <div class="metric-card">
                    <div class="metric-value">{{ store.skills.length }}+</div>
                    <div class="metric-label">Навыков</div>
                </div>

                <div class="metric-card">
                    <div class="metric-value">{{ keywordDensity }}%</div>
                    <div class="metric-label">Ключевые слова</div>
                </div>
            </div>

            <div class="keywords-section">
                <h4>🔑 Популярные навыки в вашей области</h4>
                <div class="keywords-cloud">
                    <span v-for="keyword in trendingSkills" :key="keyword.name" class="keyword-tag"
                        :class="{ 'has-skill': hasSkill(keyword.name) }" @click="addSuggestedSkill(keyword.name)">
                        {{ keyword.name }}
                        <span class="keyword-count">{{ keyword.count }}</span>
                    </span>
                </div>
            </div>

            <div class="recommendations-section">
                <h4>💡 Рекомендации</h4>
                <div class="recommendations-list">
                    <div v-for="rec in analyticsRecommendations" :key="rec.id" class="recommendation-item">
                        <span class="rec-icon">💡</span>
                        <span class="rec-text">{{ rec.text }}</span>
                        <button @click="applyRecommendation(rec)" class="btn-small">Исправить</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- === GAMIFICATION PANEL === -->
        <div v-if="showGamification" class="gamification-panel">
            <div class="game-header">
                <h3>🏆 Достижения</h3>
                <button @click="showGamification = false" class="close-btn">×</button>
            </div>

            <div class="xp-bar">
                <div class="xp-progress" :style="`width: ${playerXP % 100}%`"></div>
                <div class="xp-text">Уровень {{ Math.floor(playerXP / 100) + 1 }} • {{ playerXP }} XP</div>
            </div>

            <div class="achievements-grid">
                <div v-for="achievement in computedAchievements" :key="achievement.id" class="achievement-card"
                    :class="{ unlocked: achievement.unlocked }">
                    <div class="achievement-icon">{{ achievement.icon }}</div>
                    <div class="achievement-info">
                        <h4>{{ achievement.title }}</h4>
                        <p>{{ achievement.description }}</p>
                        <div class="achievement-progress" v-if="!achievement.unlocked">
                            Прогресс: {{ achievement.progress }}%
                        </div>
                    </div>
                    <div v-if="achievement.unlocked" class="achievement-badge">🎉</div>
                </div>
            </div>

            <div class="quests-section">
                <h4>📜 Активные задания</h4>
                <div class="quests-list">
                    <div v-for="quest in activeQuests" :key="quest.id" class="quest-item">
                        <span class="quest-icon">🎯</span>
                        <span class="quest-text">{{ quest.description }}</span>
                        <span class="quest-reward">+{{ quest.reward }} XP</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- === 3D SKILLS CLOUD === -->
        <section v-if="store.skills.length > 0" class="skills-cloud-section">
            <div class="section-card">
                <div class="section-header">
                    <h2 class="section-title">
                        <span class="icon">🌈</span>
                        3D Облако навыков
                    </h2>
                    <div class="cloud-controls">
                        <button @click="shuffleSkills" class="btn-secondary">🔄 Перемешать</button>
                        <button @click="toggleCloudView" class="btn-secondary">
                            {{ is3DView ? '2D' : '3D' }} вид
                        </button>
                    </div>
                </div>

                <div class="skills-cloud-container" :class="{ 'view-3d': is3DView }">
                    <div class="skills-cloud-3d">
                        <div v-for="(skill, index) in store.skills" :key="index" class="skill-bubble-3d"
                            :style="getSkillBubbleStyle(index)" @mouseenter="highlightSkill(skill)"
                            @click="focusSkill(skill)" :class="{
                                'highlighted': highlightedSkill === skill,
                                'focused': focusedSkill === skill
                            }">
                            {{ skill }}
                            <div class="skill-glow"></div>
                        </div>
                    </div>
                </div>

                <div v-if="focusedSkill" class="skill-details">
                    <h4>💡 {{ focusedSkill }}</h4>
                    <p>Добавьте проекты с этим навыком для лучшего эффекта</p>
                    <button @click="addSkillProject" class="btn-small">Добавить проект</button>
                </div>
            </div>
        </section>

        <!-- === INTERACTIVE TIMELINE === -->
        <section class="timeline-section" v-if="store.experience.length > 0">
            <div class="section-card">
                <div class="section-header">
                    <h2 class="section-title">
                        <span class="icon">⏳</span>
                        Интерактивная временная шкала
                    </h2>
                </div>

                <div class="timeline-container">
                    <div class="timeline-track">
                        <div v-for="(exp, index) in store.experience" :key="exp.id" class="timeline-node"
                            :style="getTimelineNodeStyle(index)" @click="selectTimelineExperience(exp)"
                            :class="{ selected: selectedTimelineExperience?.id === exp.id }">
                            <div class="node-glow"></div>
                            <div class="node-content">
                                <div class="node-year">{{ getYearFromDate(exp.startDate) }}</div>
                                <div class="node-company">{{ exp.company || 'Новая компания' }}</div>
                                <div class="node-position">{{ exp.position || 'Должность' }}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedTimelineExperience" class="timeline-details">
                        <h3>{{ selectedTimelineExperience.company }}</h3>
                        <p class="position">{{ selectedTimelineExperience.position }}</p>
                        <p class="period">{{ getPeriodText(selectedTimelineExperience) }}</p>
                        <p class="description">{{ selectedTimelineExperience.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- === JOB MATCHER === -->
        <section class="job-matcher-section">
            <div class="section-card">
                <div class="section-header">
                    <h2 class="section-title">
                        <span class="icon">🎯</span>
                        Анализ рынка
                    </h2>
                </div>

                <div class="job-matcher">
                    <div class="match-score">
                        <div class="score-ring" :style="`--score: ${jobMatchScore}`">
                            <span>{{ jobMatchScore }}%</span>
                        </div>
                        <p>Совпадение с рынком</p>
                    </div>

                    <div class="market-insights">
                        <h4>📈 Востребованные навыки</h4>
                        <div class="skills-demand">
                            <div v-for="skill in inDemandSkills" :key="skill.name" class="demand-item">
                                <span class="skill-name">{{ skill.name }}</span>
                                <div class="demand-bar">
                                    <div class="demand-fill" :style="`width: ${skill.demand}%`"></div>
                                </div>
                                <span class="demand-percent">{{ skill.demand }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- === MAIN RESUME BUILDER === -->
        <div class="resume-container">
            <!-- GitHub Integration -->
            <section class="github-section">
                <div class="section-card">
                    <div class="section-header">
                        <h2 class="section-title">
                            <span class="icon">⚡</span>
                            GitHub Профиль
                        </h2>
                    </div>

                    <div class="github-connect">
                        <div class="input-group">
                            <input v-model="githubInput" @keyup.enter="loadFromGithub"
                                placeholder="Введите GitHub username" class="github-input" />
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
                                    <div class="profile-stats">
                                        <span class="stat">📊 {{ store.profile.publicRepos || 0 }} репозиториев</span>
                                        <span class="stat">⭐ {{ store.profile.followers || 0 }} подписчиков</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Resume Builder -->
            <div class="resume-builder">
                <!-- Left Column -->
                <div class="left-column">
                    <!-- Profile Header -->
                    <section class="profile-section">
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
                                <input type="file" ref="avatarInput" @change="handleAvatarUpload" accept="image/*"
                                    class="hidden" />
                            </div>

                            <div class="profile-main">
                                <input v-model="editable.fullName" @blur="saveField('fullName')" placeholder="Ваше имя"
                                    class="name-input" :class="{ 'empty': !editable.fullName }" />
                                <input v-model="editable.jobTitle" @blur="saveField('jobTitle')" placeholder="Должность"
                                    class="job-input" :class="{ 'empty': !editable.jobTitle }" />

                                <div class="profile-meta">
                                    <div class="meta-item">
                                        <span class="icon">💰</span>
                                        <input v-model.number="editable.salary" type="number"
                                            @blur="saveField('salary')" placeholder="0" class="meta-input" />
                                        <span>₽</span>
                                    </div>
                                    <div class="meta-item">
                                        <span class="icon">🏙️</span>
                                        <input v-model="editable.city" @blur="saveField('city')" placeholder="Город"
                                            class="meta-input" />
                                    </div>
                                    <div class="meta-item">
                                        <span class="icon">🌍</span>
                                        <input v-model="editable.citizenship" @blur="saveField('citizenship')"
                                            placeholder="Гражданство" class="meta-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Skills -->
                    <section class="skills-section">
                        <div class="section-card">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <span class="icon">🛠️</span>
                                    Навыки
                                    <span class="skills-count">{{ store.skills.length }}</span>
                                </h3>
                                <div class="skills-actions">
                                    <button class="add-btn" @click="showSkillSuggestions = !showSkillSuggestions"
                                        title="Добавить навыки">
                                        <span class="icon">📚</span>
                                    </button>
                                    <button class="add-btn" @click="addSkill" title="Добавить навык">
                                        <span class="icon">+</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Quick Skill Suggestions -->
                            <div v-if="showSkillSuggestions" class="skill-suggestions">
                                <div class="suggestion-category">
                                    <h5>Технологии</h5>
                                    <div class="suggestion-chips">
                                        <span v-for="skill in quickSkills.tech" :key="skill" class="suggestion-chip"
                                            @click="addSuggestedSkill(skill)">
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>
                                <div class="suggestion-category">
                                    <h5>Инструменты</h5>
                                    <div class="suggestion-chips">
                                        <span v-for="skill in quickSkills.tools" :key="skill" class="suggestion-chip"
                                            @click="addSuggestedSkill(skill)">
                                            {{ skill }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="skills-grid">
                                <div v-for="(skill, idx) in editable.skills" :key="idx" class="skill-item">
                                    <input v-model="editable.skills[idx]" @blur="saveSkills()" placeholder="Навык"
                                        class="skill-input" />
                                    <button class="remove-btn" @click="deleteSkill(idx)" title="Удалить">
                                        <span class="icon">×</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Languages -->
                    <section class="languages-section">
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
                                    <input v-model="lang.lang" @blur="saveLanguages()" placeholder="Язык"
                                        class="lang-input" />
                                    <select v-model="lang.level" @change="saveLanguages()" class="level-select">
                                        <option value="A1 — Начальный">A1 — Начальный</option>
                                        <option value="A2 — Элементарный">A2 — Элементарный</option>
                                        <option value="B1 — Средний">B1 — Средний</option>
                                        <option value="B2 — Выше среднего">B2 — Выше среднего</option>
                                        <option value="C1 — Продвинутый">C1 — Продвинутый</option>
                                        <option value="C2 — Владение в совершенстве">C2 — Владение в совершенстве
                                        </option>
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

                <!-- Right Column -->
                <div class="right-column">
                    <!-- About -->
                    <section class="about-section">
                        <div class="section-card">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <span class="icon">👋</span>
                                    Обо мне
                                </h3>
                                <div class="char-counter">{{ editable.about?.length || 0 }}/500</div>
                            </div>

                            <textarea v-model="editable.about" @blur="saveField('about')"
                                placeholder="Расскажите о своих профессиональных качествах, опыте и целях..."
                                class="about-textarea" maxlength="500" :class="{ 'empty': !editable.about }"></textarea>
                        </div>
                    </section>

                    <!-- Experience -->
                    <section class="experience-section">
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
                                            <input v-model="exp.company" @blur="saveExperience(exp.id)"
                                                placeholder="Компания" class="company-input"
                                                :class="{ 'empty': !exp.company }" />
                                            <div class="timeline-actions">
                                                <button class="action-btn" @click="toggleDateInputs(exp)" title="Даты">
                                                    <span class="icon">📅</span>
                                                </button>
                                                <button class="action-btn remove" @click="deleteExperience(exp.id)"
                                                    title="Удалить">
                                                    <span class="icon">×</span>
                                                </button>
                                            </div>
                                        </div>

                                        <input v-model="exp.position" @blur="saveExperience(exp.id)"
                                            placeholder="Должность" class="position-input"
                                            :class="{ 'empty': !exp.position }" />

                                        <div v-if="exp.showDates" class="date-inputs">
                                            <div class="date-group">
                                                <label>Начало</label>
                                                <input v-model="exp.startDate" type="month"
                                                    @change="saveExperience(exp.id)" class="date-input" />
                                            </div>
                                            <div class="date-group">
                                                <label>Окончание</label>
                                                <input v-model="exp.endDate" type="month"
                                                    @change="saveExperience(exp.id)" class="date-input"
                                                    placeholder="По настоящее время" />
                                            </div>
                                        </div>

                                        <textarea v.model="exp.description" @blur="saveExperience(exp.id)"
                                            placeholder="Опишите ваши обязанности, достижения и проекты..."
                                            class="description-textarea"
                                            :class="{ 'empty': !exp.description }"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Education -->
                    <section class="education-section">
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
                                        <input v.model="edu.institution" @blur="saveEducation(edu.id)"
                                            placeholder="Учебное заведение" class="institution-input"
                                            :class="{ 'empty': !edu.institution }" />
                                        <button class="remove-btn" @click="deleteEducation(edu.id)" title="Удалить">
                                            <span class="icon">×</span>
                                        </button>
                                    </div>

                                    <input v.model="edu.faculty" @blur="saveEducation(edu.id)"
                                        placeholder="Факультет и специальность" class="faculty-input"
                                        :class="{ 'empty': !edu.faculty }" />

                                    <div class="edu-meta">
                                        <input v.model="edu.degree" @blur="saveEducation(edu.id)" placeholder="Степень"
                                            class="degree-input" />
                                        <input v.model="edu.year" @blur="saveEducation(edu.id)"
                                            placeholder="Год окончания" class="year-input" type="number" min="1900"
                                            :max="new Date().getFullYear()" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- GitHub Projects -->
                    <section v-if="store.projects.length" class="projects-section">
                        <div class="section-card">
                            <div class="section-header">
                                <h3 class="section-title">
                                    <span class="icon">🚀</span>
                                    GitHub Проекты
                                </h3>
                                <div class="projects-count">{{ store.projects.length }} проектов</div>
                            </div>

                            <div class="projects-grid">
                                <div v-for="project in store.projects" :key="project.id" class="project-card">
                                    <div class="project-header">
                                        <a :href="project.url" target="_blank" class="project-title">
                                            {{ project.name }}
                                        </a>
                                        <div class="project-langs">
                                            <span v-for="lang in project.languages.slice(0, 3)" :key="lang"
                                                class="lang-badge"
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

        <!-- === PRESENTATION MODE === -->
        <div v-if="isPresentationMode" class="presentation-mode">
            <div class="slides-container">
                <div class="slide active">
                    <div class="slide-content">
                        <h1 class="slide-title">{{ store.fullName || 'Ваше имя' }}</h1>
                        <h2>{{ store.jobTitle || 'Должность' }}</h2>
                        <div class="slide-contact">
                            <p v-if="store.city">📍 {{ store.city }}</p>
                            <p v-if="store.salary">💰 {{ store.formattedSalary }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="store.about" class="slide">
                    <div class="slide-content">
                        <h2>Обо мне</h2>
                        <p class="slide-about">{{ store.about }}</p>
                    </div>
                </div>

                <div v-if="store.experience.length" class="slide">
                    <div class="slide-content">
                        <h2>Опыт работы</h2>
                        <div class="slide-experience">
                            <div v-for="exp in store.experience" :key="exp.id" class="slide-exp">
                                <h3>{{ exp.company }}</h3>
                                <p class="exp-position">{{ exp.position }}</p>
                                <p class="exp-period">{{ getPeriodText(exp) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="store.skills.length" class="slide">
                    <div class="slide-content">
                        <h2>Навыки</h2>
                        <div class="slide-skills">
                            <span v-for="skill in store.skills" :key="skill" class="skill-tag">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="presentation-controls">
                <button @click="previousSlide" :disabled="currentSlide === 0">← Назад</button>
                <div class="slide-indicator">
                    {{ currentSlide + 1 }} / {{ presentationSlides.length }}
                </div>
                <button @click="nextSlide" :disabled="currentSlide === presentationSlides.length - 1">
                    Далее →
                </button>
                <button @click="togglePresentationMode" class="exit-btn">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useResumeStore } from '../stores/resumeStore'
import html2pdf from 'html2pdf.js'

const store = useResumeStore()

// States
const isPresentationMode = ref(false)
const showAIPanel = ref(false)
const showAnalytics = ref(false)
const showGamification = ref(false)
const showSkillSuggestions = ref(false)
const currentSlide = ref(0)
const is3DView = ref(true)

// AI States
const activeAITab = ref('generate')
const aiGenerating = ref(false)
const aiResult = ref('')
const aiPrompt = ref('')
const selectedAIField = ref('about')
const jobDescription = ref('')
const optimizationSuggestions = ref([])

// Analytics States
const readabilityScore = ref(75)
const keywordDensity = ref(68)

// Gamification States
const playerXP = ref(250)

// Skills Cloud States
const highlightedSkill = ref(null)
const focusedSkill = ref(null)
const cloudRotation = ref(0)

// Timeline States
const selectedTimelineExperience = ref(null)

// Job Matching States
const jobMatchScore = ref(78)

// Existing code
const pdfContent = ref(null)
const isExporting = ref(false)
const isPreview = ref(false)
const loadingGithub = ref(false)
const githubInput = ref(store.githubUsername)
const avatarInput = ref(null)
const avatarPreview = ref(null)

// Skills Data
const frontendSkills = [
    'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Svelte',
    'HTML5', 'CSS3', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap', 'Webpack',
    'Vite', 'Next.js', 'Nuxt.js', 'jQuery', 'WebGL', 'Three.js'
]

const backendSkills = [
    'Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'FastAPI',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'REST API',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Firebase'
]

const otherSkills = [
    'Git', 'GitHub', 'GitLab', 'Jira', 'Figma', 'Photoshop', 'Illustrator',
    'WebSocket', 'Socket.io', 'OAuth', 'JWT', 'CI/CD', 'Jenkins',
    'Linux', 'Bash', 'Nginx', 'Apache', 'Machine Learning', 'Data Science',
    'Blockchain', 'Smart Contracts', 'Unity', 'Unreal Engine'
]

const quickSkills = {
    tech: ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Python'],
    tools: ['Git', 'Docker', 'AWS', 'Figma', 'Webpack', 'Jest']
}

const trendingSkills = [
    { name: 'TypeScript', count: 95 },
    { name: 'React', count: 92 },
    { name: 'Node.js', count: 88 },
    { name: 'Python', count: 85 },
    { name: 'AWS', count: 82 },
    { name: 'Docker', count: 80 },
    { name: 'Kubernetes', count: 75 },
    { name: 'GraphQL', count: 72 },
    { name: 'Next.js', count: 70 },
    { name: 'Vue.js', count: 68 }
]

const inDemandSkills = [
    { name: 'TypeScript', demand: 95 },
    { name: 'React', demand: 92 },
    { name: 'Python', demand: 88 },
    { name: 'AWS', demand: 85 },
    { name: 'Docker', demand: 82 }
]

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
    PHP: '#4F5D95',
    Ruby: '#701516'
}

// Computed
const completionPercent = computed(() => {
    return store.completionPercent
})

const computedAchievements = computed(() => {
    return achievements.value.map(achievement => {
        switch (achievement.id) {
            case 'complete_profile':
                achievement.progress = completionPercent.value
                achievement.unlocked = completionPercent.value >= 90
                break
            case 'github_pro':
                achievement.progress = Math.min(100, (store.projects.length / 5) * 100)
                achievement.unlocked = store.projects.length >= 5
                break
            case 'skills_master':
                achievement.progress = Math.min(100, (store.skills.length / 10) * 100)
                achievement.unlocked = store.skills.length >= 10
                break
            case 'experience_expert':
                achievement.progress = Math.min(100, (store.experience.length / 3) * 100)
                achievement.unlocked = store.experience.length >= 3
                break
        }
        return achievement
    })
})

const analyticsRecommendations = computed(() => {
    const recs = []
    if (store.skills.length < 5) {
        recs.push({ id: 1, text: 'Добавьте больше технических навыков', action: 'add_skills' })
    }
    if (!store.about || store.about.length < 100) {
        recs.push({ id: 2, text: 'Расширьте раздел "Обо мне"', action: 'expand_about' })
    }
    if (store.experience.length === 0) {
        recs.push({ id: 3, text: 'Добавьте опыт работы', action: 'add_experience' })
    }
    if (completionPercent.value < 70) {
        recs.push({ id: 4, text: 'Заполните основные разделы резюме', action: 'complete_profile' })
    }
    return recs
})

const activeQuests = computed(() => [
    {
        id: 'add_skills',
        description: `Добавьте ${Math.max(0, 5 - store.skills.length)} навыков`,
        reward: 50,
        completed: store.skills.length >= 5
    },
    {
        id: 'add_experience',
        description: 'Добавьте опыт работы',
        reward: 100,
        completed: store.experience.length > 0
    },
    {
        id: 'complete_about',
        description: 'Напишите раздел "Обо мне"',
        reward: 30,
        completed: store.about && store.about.length > 50
    }
])

const presentationSlides = computed(() => {
    const slides = []

    // Slide 1: Name and Title
    slides.push({
        id: 1,
        title: store.fullName || 'Ваше имя',
        content: store.jobTitle || 'Должность'
    })

    // Slide 2: About
    if (store.about) {
        slides.push({
            id: 2,
            title: 'Обо мне',
            content: store.about
        })
    }

    // Slide 3: Experience
    if (store.experience.length) {
        slides.push({
            id: 3,
            title: 'Опыт работы',
            content: store.experience
        })
    }

    // Slide 4: Skills
    if (store.skills.length) {
        slides.push({
            id: 4,
            title: 'Навыки',
            content: store.skills
        })
    }

    return slides
})

const getReadabilityClass = computed(() => {
    return readabilityScore.value >= 70 ? 'excellent' : 'good'
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

// Achievements
const achievements = ref([
    {
        id: 'complete_profile',
        icon: '🎯',
        title: 'Полный профиль',
        description: 'Заполнены все основные разделы',
        unlocked: false,
        progress: 0
    },
    {
        id: 'github_pro',
        icon: '⚡',
        title: 'GitHub Pro',
        description: 'Подключен GitHub с 5+ проектами',
        unlocked: false,
        progress: 0
    },
    {
        id: 'skills_master',
        icon: '🏆',
        title: 'Мастер навыков',
        description: '10+ технических навыков',
        unlocked: false,
        progress: 0
    },
    {
        id: 'experience_expert',
        icon: '💼',
        title: 'Эксперт опыта',
        description: '3+ записи об опыте работы',
        unlocked: false,
        progress: 0
    }
])

// AI Tabs
const aiTabs = [
    { id: 'generate', name: 'Генерация' },
    { id: 'optimize', name: 'Оптимизация' },
    { id: 'skills', name: 'Навыки' }
]

// Methods
const toggleAIPanel = () => showAIPanel.value = !showAIPanel.value
const toggleAnalytics = () => showAnalytics.value = !showAnalytics.value
const toggleGamification = () => showGamification.value = !showGamification.value
const togglePresentationMode = () => {
    isPresentationMode.value = !isPresentationMode.value
    if (isPresentationMode.value) {
        currentSlide.value = 0
    }
}

// AI Methods
const generateAIText = async () => {
    aiGenerating.value = true
    // Имитация работы AI
    await new Promise(resolve => setTimeout(resolve, 2000))

    const responses = {
        about: `Опытный разработчик с глубокими знаниями современных технологий. Стремлюсь к созданию качественных и масштабируемых решений. Обладаю сильными аналитическими навыками и способностью быстро осваивать новые технологии.`,
        experience: `Разрабатывал и поддерживал веб-приложения, оптимизировал производительность, внедрял лучшие практики разработки. Участвовал в полном цикле разработки от проектирования до deployment.`,
        skills: `JavaScript, TypeScript, Vue.js, React, Node.js, Python, Docker, AWS, Git, CI/CD, REST API, GraphQL, PostgreSQL, MongoDB`
    }

    aiResult.value = responses[selectedAIField.value] || 'Сгенерированный текст появится здесь...'
    aiGenerating.value = false
}

const applyAIText = () => {
    if (selectedAIField.value === 'about') {
        store.updateField('about', aiResult.value)
    }
    aiResult.value = ''
}

const regenerateAIText = () => {
    aiResult.value = ''
    generateAIText()
}

const optimizeResume = async () => {
    optimizationSuggestions.value = [
        { id: 1, text: 'Добавьте больше конкретных цифр и метрик в опыт работы', type: 'experience' },
        { id: 2, text: 'Используйте больше ключевых слов из описания вакансии', type: 'keywords' },
        { id: 3, text: 'Структурируйте навыки по категориям', type: 'skills' }
    ]
}

const applySuggestion = (suggestion) => {
    // Логика применения предложений
    if (suggestion.type === 'skills') {
        showSkillSuggestions.value = true
    }
}

// Skills Methods
const addSuggestedSkill = (skill) => {
    if (!editable.skills.includes(skill)) {
        editable.skills.push(skill)
        saveSkills()
    }
}

const getSkillBubbleStyle = (index) => {
    if (!is3DView.value) {
        // 2D layout
        const row = Math.floor(index / 4)
        const col = index % 4
        return {
            transform: `translate(${col * 120}px, ${row * 60}px)`,
            opacity: highlightedSkill.value === store.skills[index] ? 1 : 0.8
        }
    }

    // 3D spherical layout
    const total = store.skills.length
    const phi = Math.acos(-1 + (2 * index) / total)
    const theta = Math.sqrt(total * Math.PI) * phi

    const radius = 150
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)

    const scale = highlightedSkill.value === store.skills[index] ? 1.2 : 1

    return {
        transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
        opacity: highlightedSkill.value === store.skills[index] ? 1 : 0.7
    }
}

const highlightSkill = (skill) => {
    highlightedSkill.value = skill
}

const focusSkill = (skill) => {
    focusedSkill.value = focusedSkill.value === skill ? null : skill
}

const shuffleSkills = () => {
    // Перемешиваем навыки для анимации
    highlightedSkill.value = null
    focusedSkill.value = null
}

const toggleCloudView = () => {
    is3DView.value = !is3DView.value
}

const addSkillProject = () => {
    if (focusedSkill.value) {
        // Логика добавления проекта с этим навыком
        console.log(`Adding project for skill: ${focusedSkill.value}`)
    }
}

// Timeline Methods
const getTimelineNodeStyle = (index) => {
    const total = store.experience.length
    const position = (index / (total - 1 || 1)) * 80 + 10
    return {
        left: `${position}%`
    }
}

const selectTimelineExperience = (exp) => {
    selectedTimelineExperience.value = exp
}

// Presentation Methods
const nextSlide = () => {
    if (currentSlide.value < presentationSlides.value.length - 1) {
        currentSlide.value++
    }
}

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--
    }
}

// Utility Methods
const hasSkill = (skillName) => {
    return store.skills.includes(skillName)
}

const getYearFromDate = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : 'н.в.'
}

const getPeriodText = (exp) => {
    if (!exp.startDate) return '—'
    const start = new Date(exp.startDate)
    const startStr = start.toLocaleString('ru-RU', { year: 'numeric', month: 'long' })
    if (!exp.endDate) {
        return `${startStr} — По настоящее время`
    } else {
        const end = new Date(exp.endDate)
        const endStr = end.toLocaleString('ru-RU', { year: 'numeric', month: 'long' })
        return `${startStr} — ${endStr}`
    }
}

// Store methods
const saveField = (field) => store.updateField(field, editable[field])

const saveExperience = (id) => {
    const exp = editable.experience.find(e => e.id === id)
    if (exp) store.updateExperience(id, { ...exp })
}

const saveEducation = (id) => {
    const edu = editable.education.find(e => e.id === id)
    if (edu) store.updateEducation(id, { ...edu })
}

const saveSkills = () => {
    store.$state.skills = [...editable.skills]
    store.save()
}

const saveLanguages = () => {
    store.$state.languages = [...editable.languages]
    store.save()
}

const addExperience = () => store.addExperience()
const deleteExperience = (id) => {
    if (confirm('Удалить запись об опыте?')) store.deleteExperience(id)
}

const addEducation = () => store.addEducation()
const deleteEducation = (id) => {
    if (confirm('Удалить запись об образовании?')) store.deleteEducation(id)
}

const addSkill = () => store.addSkill()
const deleteSkill = (index) => {
    if (confirm('Удалить навык?')) store.deleteSkill(index)
}

const addLanguage = () => store.addLanguage()
const deleteLanguage = (index) => {
    if (confirm('Удалить язык?')) store.deleteLanguage(index)
}

const toggleTheme = () => store.toggleTheme()
const togglePreview = () => isPreview.value = !isPreview.value

const triggerAvatarUpload = () => {
    avatarInput.value?.click()
}

const handleAvatarUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            avatarPreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const toggleDateInputs = (exp) => {
    exp.showDates = !exp.showDates
}

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
    // PDF generation logic will be implemented
    console.log('Generating PDF...')
}

const applyRecommendation = (rec) => {
    switch (rec.action) {
        case 'add_skills':
            showSkillSuggestions.value = true
            break
        case 'expand_about':
            selectedAIField.value = 'about'
            showAIPanel.value = true
            break
        case 'add_experience':
            addExperience()
            break
    }
}

onMounted(() => {
    store.initTheme()
})

watch(
    () => store.$state,
    (newState) => {
        Object.assign(editable, {
            fullName: newState.fullName,
            jobTitle: newState.jobTitle,
            salary: newState.salary,
            city: newState.city,
            citizenship: newState.citizenship,
            about: newState.about,
            experience: newState.experience.map(exp => ({
                ...exp,
                showDates: editable.experience.find(e => e.id === exp.id)?.showDates || false
            })),
            education: [...newState.education],
            skills: [...newState.skills],
            languages: [...newState.languages]
        })
    },
    { deep: true }
)
</script>

<style>
.skills-cloud-container {
    position: relative;
    height: 400px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.skills-cloud-container.view-3d {
    perspective: 1000px;
}

.skills-cloud-3d {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
}

.skill-bubble-3d {
    position: absolute;
    padding: 12px 20px;
    background: var(--accent);
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 14px;
    box-shadow: var(--shadow);
    border: 2px solid transparent;
    user-select: none;
}

.skill-bubble-3d:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-hover);
    border-color: var(--accent-hover);
    z-index: 10;
}

.skill-bubble-3d.highlighted {
    transform: scale(1.15);
    background: var(--accent-hover);
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
}

.skill-bubble-3d.focused {
    transform: scale(1.3);
    background: var(--success);
    box-shadow: 0 0 30px rgba(5, 150, 105, 0.5);
    z-index: 20;
}

.cloud-controls {
    display: flex;
    gap: 8px;
}

/* Quick Skill Suggestions */
.skill-suggestions {
    margin-bottom: 16px;
    padding: 16px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
}

.suggestion-category {
    margin-bottom: 12px;
}

.suggestion-category h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
}

.suggestion-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.suggestion-chip {
    padding: 6px 12px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    font-size: 12px;
    cursor: pointer;
    transition: var(--transition);
}

.suggestion-chip:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

/* Skills Count */
.skills-count {
    background: var(--accent);
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.skills-actions {
    display: flex;
    gap: 8px;
}

/* Analytics Keywords */
.keyword-tag {
    position: relative;
    padding: 6px 12px;
    background: var(--bg-body);
    border: 1px solid var(--border);
    border-radius: 16px;
    font-size: 12px;
    cursor: pointer;
    transition: var(--transition);
}

.keyword-tag.has-skill {
    background: var(--accent-light);
    border-color: var(--accent);
    color: var(--accent);
}

.keyword-tag:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
}

.keyword-count {
    margin-left: 4px;
    font-size: 10px;
    opacity: 0.7;
}

/* Skills Demand */
.skills-demand {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demand-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.skill-name {
    min-width: 100px;
    font-size: 14px;
    font-weight: 500;
}

.demand-bar {
    flex: 1;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
}

.demand-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--success));
    border-radius: 4px;
    transition: width 0.3s ease;
}

.demand-percent {
    min-width: 40px;
    font-size: 12px;
    color: var(--text-secondary);
    text-align: right;
}

/* AI Skills Suggestions */
.skills-suggestions {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.skill-category h5 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
}

.skill-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-chip {
    padding: 8px 16px;
    background: var(--bg-body);
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition);
}

.skill-chip:hover {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
    transform: translateY(-1px);
}

:root {
    --bg-body: #fafafa;
    --bg-card: #ffffff;
    --text-primary: #1a1a1a;
    --text-secondary: #666666;
    --text-tertiary: #999999;
    --border: #e0e0e0;
    --border-light: #f0f0f0;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.12);
    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --accent-light: #dbeafe;
    --success: #059669;
    --warning: #d97706;
    --error: #dc2626;
    --radius: 12px;
    --radius-lg: 16px;
    --transition: all 0.2s ease;
}

[data-theme="dark"] {
    --bg-body: #0a0a0a;
    --bg-card: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --text-tertiary: #666666;
    --border: #333333;
    --border-light: #2a2a2a;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.4);
    --accent: #3b82f6;
    --accent-hover: #2563eb;
    --accent-light: #1e3a8a;
}

/* Base Styles */
.ultimate-resume {
    min-height: 100vh;
    margin-top: 200px;
    background: var(--bg-body);
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    transition: var(--transition);
}

/* Super Controls */
.super-controls {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 16px;
    align-items: center;
}

.control-group {
    display: flex;
    gap: 8px;
    background: var(--bg-card);
    padding: 12px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    backdrop-filter: blur(10px);
}

.control-btn {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: var(--bg-card);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    font-size: 18px;
    color: var(--text-secondary);
    border: 1px solid var(--border);
}

.control-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
    color: var(--accent);
    border-color: var(--accent);
}

.control-btn.pdf-btn {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

.control-btn.pdf-btn:hover {
    background: var(--accent-hover);
}

.mega-progress {
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--bg-card);
    padding: 16px 20px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    backdrop-filter: blur(10px);
}

.progress-ring {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: conic-gradient(var(--accent) calc(var(--progress) * 1%), var(--border) 0);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.progress-ring::before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: var(--bg-card);
    border-radius: 50%;
}

.progress-ring span {
    position: relative;
    font-weight: 700;
    font-size: 14px;
    color: var(--text-primary);
}

.progress-stats {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat {
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Panels */
.ai-panel,
.analytics-panel,
.gamification-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    background: var(--bg-card);
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
    z-index: 999;
    overflow-y: auto;
    border-left: 1px solid var(--border);
}

.ai-header,
.analytics-header,
.game-header {
    padding: 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--bg-card);
    position: sticky;
    top: 0;
}

.ai-header h3,
.analytics-header h3,
.game-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
}

.close-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: var(--bg-body);
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: var(--transition);
}

.close-btn:hover {
    background: var(--error);
    color: white;
}

/* AI Panel */
.ai-tabs {
    display: flex;
    padding: 0 24px;
    border-bottom: 1px solid var(--border);
    background: var(--bg-card);
}

.ai-tabs button {
    flex: 1;
    padding: 16px;
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    color: var(--text-secondary);
    font-weight: 500;
    transition: var(--transition);
}

.ai-tabs button.active {
    border-bottom-color: var(--accent);
    color: var(--accent);
}

.ai-content {
    padding: 24px;
}

.ai-section {
    margin-bottom: 32px;
}

.ai-section h4 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
}

.ai-select,
.ai-textarea {
    width: 100%;
    margin: 8px 0;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: inherit;
    transition: var(--transition);
}

.ai-select:focus,
.ai-textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.ai-textarea {
    min-height: 100px;
    resize: vertical;
}

.ai-generate-btn,
.ai-optimize-btn {
    width: 100%;
    padding: 14px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    margin: 16px 0;
    font-weight: 600;
    font-size: 14px;
    transition: var(--transition);
}

.ai-generate-btn:hover:not(:disabled),
.ai-optimize-btn:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-1px);
}

.ai-generate-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.ai-result {
    margin-top: 20px;
    padding: 20px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
}

.ai-result-text {
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: 16px;
}

.ai-actions {
    display: flex;
    gap: 12px;
}

.btn-primary {
    background: var(--accent);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: var(--radius);
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: var(--transition);
}

.btn-primary:hover {
    background: var(--accent-hover);
}

.btn-secondary {
    background: var(--bg-card);
    color: var(--text-primary);
    border: 1px solid var(--border);
    padding: 10px 20px;
    border-radius: var(--radius);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: var(--transition);
}

.btn-secondary:hover {
    background: var(--bg-body);
    border-color: var(--accent);
}

/* Analytics Panel */
.metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 24px;
}

.metric-card {
    padding: 20px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    text-align: center;
    transition: var(--transition);
}

.metric-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

.metric-value {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
}

.metric-value.excellent {
    color: var(--success);
}

.metric-value.good {
    color: var(--warning);
}

.metric-label {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Gamification Panel */
.xp-bar {
    width: 100%;
    height: 8px;
    background: var(--border);
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
}

.xp-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--success));
    border-radius: 4px;
    transition: width 0.3s ease;
}

.xp-text {
    text-align: center;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
}

.achievements-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 24px;
}

.achievement-card {
    padding: 20px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 16px;
    transition: var(--transition);
}

.achievement-card.unlocked {
    border-color: var(--success);
    background: linear-gradient(135deg, var(--bg-body), rgba(5, 150, 105, 0.05));
}

.achievement-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

.achievement-icon {
    font-size: 24px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border-radius: 12px;
}

.achievement-info {
    flex: 1;
}

.achievement-info h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
}

.achievement-info p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
}

/* Skills Cloud */
.skills-cloud-section {
    margin: 0 24px 24px 24px;
}

.skills-cloud-3d {
    position: relative;
    height: 300px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.skill-bubble-3d {
    position: absolute;
    padding: 12px 24px;
    background: var(--accent);
    color: white;
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 14px;
    box-shadow: var(--shadow);
    border: 2px solid transparent;
}

.skill-bubble-3d:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-hover);
    border-color: var(--accent-hover);
}

/* Timeline */
.timeline-section {
    margin: 0 24px 24px 24px;
}

.timeline-3d {
    position: relative;
    margin: 40px 0;
}

.timeline-track {
    position: relative;
    height: 4px;
    background: var(--border);
    margin: 0 60px;
    border-radius: 2px;
}

.timeline-node {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: var(--transition);
}

.timeline-node:hover {
    transform: translate(-50%, -50%) scale(1.1);
}

.node-content {
    background: var(--bg-card);
    padding: 16px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 2px solid transparent;
    text-align: center;
    min-width: 140px;
    transition: var(--transition);
}

.timeline-node:hover .node-content {
    border-color: var(--accent);
    box-shadow: var(--shadow-hover);
}

.node-year {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 4px;
}

.node-company {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
}

/* Job Matcher */
.job-matcher-section {
    margin: 0 24px 24px 24px;
}

.job-matcher {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
}

.match-score {
    text-align: center;
}

.score-ring {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: conic-gradient(var(--success) calc(var(--score) * 1%), var(--border) 0);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto 16px auto;
}

.score-ring::before {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    background: var(--bg-card);
    border-radius: 50%;
}

.score-ring span {
    position: relative;
    font-size: 24px;
    font-weight: 700;
    color: var(--text-primary);
}

.match-score p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Main Resume Styles */
.resume-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 24px 24px 24px;
}

.resume-builder {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 24px;
    margin-top: 24px;
}

.section-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    margin-bottom: 24px;
    transition: var(--transition);
}

.section-card:hover {
    box-shadow: var(--shadow-hover);
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}

.section-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
}

/* Profile Section */
.profile-card {
    text-align: center;
}

.name-input,
.job-input {
    width: 100%;
    border: none;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    text-align: center;
    font-family: inherit;
}

.name-input {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
}

.name-input::placeholder,
.job-input::placeholder {
    color: var(--text-tertiary);
}

.job-input {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
}

.profile-meta {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
    font-size: 15px;
}

.meta-input {
    border: none;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    flex: 1;
    font-family: inherit;
    font-size: 15px;
}

.meta-input::placeholder {
    color: var(--text-tertiary);
}

/* Input Groups */
.input-group {
    display: flex;
    gap: 12px;
    margin: 16px 0;
}

.github-input {
    flex: 1;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: inherit;
    transition: var(--transition);
}

.github-input:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.github-input::placeholder {
    color: var(--text-tertiary);
}

.connect-btn {
    padding: 14px 24px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: var(--transition);
    white-space: nowrap;
}

.connect-btn:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-1px);
}

.connect-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* GitHub Preview */
.github-preview {
    margin-top: 24px;
}

.profile-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.profile-info {
    flex: 1;
}

.profile-info h3 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
}

.bio {
    margin: 0;
    font-size: 15px;
    color: var(--text-secondary);
    line-height: 1.5;
}

/* Skills & Languages */
.skills-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.skill-item {
    display: flex;
    gap: 12px;
    align-items: center;
}

.skill-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: inherit;
    transition: var(--transition);
}

.skill-input:focus {
    outline: none;
    border-color: var(--accent);
}

.skill-input::placeholder {
    color: var(--text-tertiary);
}

/* Buttons */
.add-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--bg-card);
    color: var(--text-primary);
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: var(--transition);
}

.add-btn:hover {
    background: var(--bg-body);
    border-color: var(--accent);
    color: var(--accent);
}

.add-btn.primary {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

.add-btn.primary:hover {
    background: var(--accent-hover);
}

.remove-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: var(--error);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    transition: var(--transition);
}

.remove-btn:hover {
    background: #b91c1c;
    transform: scale(1.1);
}

/* Textareas */
.about-textarea,
.description-textarea {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    background: var(--bg-card);
    color: var(--text-primary);
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
    font-size: 15px;
    line-height: 1.6;
    transition: var(--transition);
}

.about-textarea:focus,
.description-textarea:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.about-textarea::placeholder,
.description-textarea::placeholder {
    color: var(--text-tertiary);
}

/* Timeline Experience */
.timeline {
    position: relative;
}

.timeline-item {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-light);
}

.timeline-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
}

.timeline-content {
    position: relative;
}

.timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 16px;
}

.company-input,
.position-input {
    border: none;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    width: 100%;
    font-family: inherit;
}

.company-input {
    font-size: 18px;
    font-weight: 700;
}

.company-input::placeholder {
    color: var(--text-tertiary);
    font-weight: 700;
}

.position-input {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-secondary);
}

.position-input::placeholder {
    color: var(--text-tertiary);
    font-weight: 600;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.project-card {
    padding: 24px;
    background: var(--bg-body);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
    border-color: var(--accent);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.project-title {
    font-weight: 600;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 16px;
    transition: var(--transition);
}

.project-title:hover {
    color: var(--accent);
}

.project-description {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
}

/* Presentation Mode */
.presentation-mode {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slides-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slide-content {
    text-align: center;
    color: white;
    max-width: 800px;
    padding: 40px;
}

.slide-title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-content h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #a0a0a0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.presentation-controls {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16px;
    align-items: center;
}

.exit-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: var(--radius);
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: var(--transition);
}

.exit-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* VR Mode */
.vr-mode {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vr-environment {
    width: 100%;
    height: 100%;
    perspective: 1000px;
}

.vr-resume-3d {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    transform: translate(-50%, -50%);
}

.vr-section-3d {
    position: absolute;
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    transform-style: preserve-3d;
    transition: transform 0.5s ease;
}

.vr-title-3d {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
}

.vr-content-3d {
    font-size: 18px;
    color: #a0a0a0;
}

.vr-controls {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16px;
}

.vr-exit {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 12px 24px;
    border-radius: var(--radius);
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: var(--transition);
}

.vr-exit:hover {
    background: rgba(255, 255, 255, 0.2);
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

    .super-controls {
        top: 10px;
        right: 10px;
        flex-direction: column;
    }

    .control-group {
        flex-wrap: wrap;
        justify-content: center;
    }

    .mega-progress {
        display: none;
    }

    .ai-panel,
    .analytics-panel,
    .gamification-panel {
        width: 100vw;
    }
}

@media (max-width: 640px) {
    .resume-container {
        padding: 100px 16px 16px 16px;
    }

    .section-card {
        padding: 24px;
    }

    .timeline-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .job-matcher {
        flex-direction: column;
        gap: 24px;
    }

    .skills-cloud-3d {
        height: 200px;
    }

    .slide-title {
        font-size: 2.5rem;
    }

    .slide-content h2 {
        font-size: 1.5rem;
    }
}

/* Utility Classes */
.hidden {
    display: none;
}

.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>