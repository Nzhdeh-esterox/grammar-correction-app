import { createApp } from 'vue';
import App from './App.vue';
import './index.css'; // Tailwind CSS
import router from './router'; // Import the router

const app = createApp(App);

app.use(router); // Use the router
app.mount('#app');