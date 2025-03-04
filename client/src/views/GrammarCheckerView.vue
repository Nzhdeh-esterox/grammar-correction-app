<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-4">
    <div class="max-w-xl w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Grammar Checker</h2>
      <div class="space-y-4">
        <div class="border p-2 rounded-md h-20 overflow-auto flex items-center justify-center">
          <p v-if="!isLoading" v-html="highlightedText"></p>
          <div v-else class="loader"></div>
        </div>
        <textarea
            v-model="text"
            @input="debouncedChecking"
            placeholder="Type your text here..."
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-48"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { debounce } from '../utils/debounce';

const text = ref('');
const previousText = ref('');
const errors = ref([]);
const isLoading = ref(false);

const checkAndCorrectGrammar = async () => {
  try {
    const trimmedText = text.value.trim();

    if (!trimmedText || trimmedText === previousText.value) {
      return;
    }

    isLoading.value = true;

    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/check-grammar`, {
      text: text.value,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    previousText.value = trimmedText;
    errors.value = response.data.errors || [];
  } catch (error) {
    console.error('Error checking grammar:', error);
  } finally {
    isLoading.value = false;
  }
};

// Debounced function to limit API calls while typing
const debouncedChecking = debounce(checkAndCorrectGrammar, 900);

// Computed property that returns the text with highlighted error words
const highlightedText = computed(() => {
  let html = text.value;
  errors.value.forEach((error) => {
    const regex = new RegExp(`\\b(${error.word})\\b`, 'gi');
    html = html.replace(
        regex,
        `<span class="highlight" title="${error.explanation}">$1</span>`
    );
  });

  html = html.replace(/\n/g, '<br>');
  return html;
});
</script>

<style>
.highlight {
  color: darkred;
}

/* 🔹 Simple Loader */
.loader {
  width: 24px;
  height: 24px;
  border: 3px solid #3498db;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
