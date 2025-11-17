<template>
  <Header></Header>
  <router-view />
</template>

<script setup>

import Header from './components/Header.vue';

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