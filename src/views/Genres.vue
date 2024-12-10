<template>
  <nav>
    <router-link to="/" class="nav-item">INICIO</router-link>
    <router-link to="/Series" class="nav-item">SERIES</router-link>
    <router-link to="/Genres" class="nav-item">GÉNEROS</router-link>
  </nav>
  <div>
    <h2>Géneros</h2>
    <div class="genres-container">
      <div 
        class="genre-card" 
        v-for="genre in genres" 
        :key="genre.id" 
        @click="loadContentByGenre(genre.id)"
      >
        <h3>{{ genre.name }}</h3>
      </div>
    </div>

    <div v-if="movies.length || series.length">
      <h3 v-if="movies.length">Películas en el género seleccionado:</h3>
      <div class="movies-list" v-if="movies.length">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
      <h3 v-if="series.length">Series en el género seleccionado:</h3>
      <div class="series-list" v-if="series.length">
        <SeriesCard v-for="serie in series" :key="serie.id" :serie="serie" />
      </div>
    </div>
    <div v-else>
      <p>No hay contenido disponible para este género.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchGenres, fetchMoviesByGenre, fetchSeriesByGenre } from '../services/api';
import MovieCard from '../components/MovieCard.vue';
import SeriesCard from '@/components/SeriesCard.vue';

const genres = ref([]);
const movies = ref([]);
const series = ref([]);

// Cargar géneros al montar el componente
onMounted(async () => {
  try {
    genres.value = await fetchGenres();
  } catch (error) {
    console.error('Error al cargar géneros:', error);
  }
});

// Función para obtener películas y series por género
const loadContentByGenre = async (genreId) => {
  try {
    movies.value = await fetchMoviesByGenre(genreId);
    series.value = await fetchSeriesByGenre(genreId);
  } catch (error) {
    console.error('Error al cargar contenido por género:', error);
  }
};
</script>

<style scoped>
.genres-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.genre-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.genre-card:hover {
  background-color: #f0f0f0;
}

.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

nav {
  background-color: #333;
  padding: 10px;
}

.nav-item {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}

.nav-item:hover {
  text-decoration: underline;
}
</style>
