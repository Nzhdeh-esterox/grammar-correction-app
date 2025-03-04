<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
      <!-- Heading Section -->
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-semibold text-gray-700">Welcome Back</h2>
        <p class="text-gray-500">Login to access your account</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
              v-model="username"
              type="email"
              id="username"
              placeholder="Enter your email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition duration-200"
        >
          Login
        </button>
        <span v-if="errorMsg" class="text-red-500"> {{errorMsg}} </span>
      </form>

      <!-- Sign Up Link -->
      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMsg = ref('');

const login = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, {
      username: username.value,
      password: password.value
    });

    const data = response.data;

    if (data.token) {
      localStorage.setItem('token', data.token);

      await router.push('/dashboard');
    } else {
      errorMsg.value = 'An error occurred during login.';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMsg.value = 'An error occurred during login.';
  }
};

watch([username, password], () => {
  if (errorMsg.value) {
    errorMsg.value = ''; // Clear error message when input changes
  }
});

</script>
