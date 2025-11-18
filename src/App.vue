<template>
  <Header></Header>
  <router-view />
</template>

<script setup>
import Header from './components/Header.vue';
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