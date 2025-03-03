<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 px-4">
    <div class="max-w-xl w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Grammar Checker</h2>
      <div class="space-y-4">
        <div class="border p-2 rounded-md h-48 overflow-auto">
          <p v-html="highlightedText"></p>
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
const errors = ref([]);

// Fetch grammar corrections and errors from the backend
const checkAndCorrectGrammar = async () => {
  try {
    if (!text.value) {
      errors.value = [];
      return;
    }
    const response = await axios.post('http://localhost:5000/api/check-grammar', {
      text: text.value,
    });
    // Store errors from response
    errors.value = response.data.errors || [];
  } catch (error) {
    console.error('Error checking grammar:', error);
  }
};

// Debounced function to limit API calls while typing
const debouncedChecking = debounce(checkAndCorrectGrammar, 900);

// Computed property that returns the text with highlighted error words
const highlightedText = computed(() => {
  let html = text.value;
  // Loop over each error and wrap the wrong word in a span with a tooltip
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
</style>
