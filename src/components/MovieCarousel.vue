<template>
  <Splide
    :options="splideOptions"
    class="splide"
  >
    <SplideSlide v-for="movie in movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </SplideSlide>
  </Splide>
</template>

<script setup>
import { defineProps } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import MovieCard from './MovieCard.vue';

const props = defineProps({
  movies: Array,
});

const splideOptions = {
  type: 'loop',
  perPage: 6,
  breakpoints: {
    600: {
      perPage: 1,
    },
    900: {
      perPage: 2,
    },
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 1000px; /* Ancho máximo */
  width: 100%; /* Permite que el contenedor use el 100% del espacio disponible */
  justify-content: center; /* Centra el contenedor del carrusel */
  margin-right: 180px;         /* Espacio vertical alrededor del carrusel */
  margin-top: 40px;
}

.carousel-items {
  display: flex;
  justify-content: center; /* Centra los elementos del carrusel */
  flex-wrap: nowrap;       /* Evita que los elementos se envuelvan */
}

.movie-card {
  margin: 0 30px; /* Espaciado entre tarjetas */
}
</style>
