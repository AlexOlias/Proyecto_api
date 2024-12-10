// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.scss';
import '@splidejs/splide/dist/css/splide.min.css'; // Importa los estilos de Splide

createApp(App).use(router).mount('#app');