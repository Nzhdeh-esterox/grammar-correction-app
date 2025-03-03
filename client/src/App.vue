<template>
  <div>
    <Header v-if="!isAuthPage" />
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Header from './components/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/signup';
});
</script>

<style>
</style>