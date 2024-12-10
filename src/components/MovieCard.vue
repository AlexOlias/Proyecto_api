<template>
  <div class="movie-card">
    <router-link :to="`/${isSeries ? 'series' : 'movie'}/${movie.id}`">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Poster" />
      <h3>{{ isSeries ? movie.name : movie.title }}</h3> <!-- Muestra 'name' para series y 'title' para películas -->
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  movie: Object,
  isSeries: { type: Boolean, default: false } // Prop para determinar si es una serie
});
</script>

<style scoped>
.movie-card {
  width: 200px; /* Ajusta según sea necesario */
}
.movie-card img {
  max-width: 100%;
  height: auto;
}
</style>