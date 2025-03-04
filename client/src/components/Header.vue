<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 shadow-lg flex justify-between items-center">
    <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
      Grammar Correction App
    </h1>
    <button
        @click="logout"
        class="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out"
    >
      Logout
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');

  router.push('/login');
};
</script>

<style>
</style>