<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
      <!-- Heading Section -->
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-semibold text-gray-700">Create an Account</h2>
        <p class="text-gray-500">Sign up to get started</p>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="signUp" class="space-y-4">
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
          Sign Up
        </button>
      </form>

      <!-- Sign In Link -->
      <p class="mt-4 text-center text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const signUp = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 201) {
      alert('Sign up successful!');

      await router.push('/login');
    }
  } catch (error) {
    console.error('Sign up error:', error);
    alert('An error occurred during sign up.');
  }
};
</script>
