<template>
  <Header v-if="!isAuthPage"></Header>
  <router-view />
  <Footer v-if="!isAuthPage"></Footer>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isAuthPage = computed(() => {
  return route.name === 'Auth' || route.path === '/auth';
});

import axios from 'axios';
const token = localStorage.getItem('token') || sessionStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: #E9E9E9;
}
</style>