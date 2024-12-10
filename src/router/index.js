// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MovieDetail from '../views/MovieDetail.vue';
import Genres from '../views/Genres.vue'; // Añadido
import Series from '../views/Series.vue'; // Añadido
import SeriesDetail from '../views/SeriesDetail.vue'; // Asegúrate de importar SeriesDetail

const routes = [
  { path: '/', component: Home },
  { path: '/movie/:id', component: MovieDetail, props: true },
  { path: '/series/:id', component: SeriesDetail, props: true }, // Ruta para detalles de la serie
  { path: '/genres', component: Genres }, // Ruta para Géneros
  { path: '/series', component: Series }, // Ruta para Series
  { path: '/actor/:id',name: 'ActorDetail',component: () => import('../views/ActorDetail.vue'),},
  
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;