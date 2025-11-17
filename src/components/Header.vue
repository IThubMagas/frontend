<template>
    <header class="header">
        <div class="header-container">
            <div class="logo">
                HRhub
            </div>

            <nav class="nav">
                <div class="nav-bl">
                    <router-link to="/" class="nav-link">Главная</router-link>
                    <router-link to="/services" class="nav-link">Специалисты</router-link>
                    <router-link to="/about" class="nav-link">О нас</router-link>
                </div>
                <router-link to="/auth" class="login-link">
                    <span class="login-text">Вход</span>
                </router-link>
            </nav>

        </div>
    </header>
</template>

<script setup>
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200..900&display=swap');

.header {
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    border-radius: 8px;
    top: 0;
    z-index: 1000;
}

.header-container {
    max-width: 1260px;
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
}

.logo {
    font-family: "Unbounded", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 32px;
    font-weight: 600;
    color: #5E61FF;
    letter-spacing: -0.5px;
}

.nav {
    display: flex;
    gap: 113px;
    align-items: center;
}

.nav-bl {
    display: flex;
    gap: 26px;
}

.nav-link {
    text-decoration: none;
    color: #2d3748;
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;
    position: relative;
    padding: 10px;
}

.nav-link:hover {
    color: #667eea;
}

.login-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    background: #5E61FF;
    color: white;
    padding: 10px 40px;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.login-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.login-text {
    font-size: 16px;
}
</style>