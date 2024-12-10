<template>
  <div>
    <Navbar />
    <div class="carousel-container">
      <h1 class="new-movies-title">PELÍCULAS NUEVAS</h1>
      <input v-model="searchQuery" placeholder="Buscar películas..." />
      <MovieCarousel :movies="newestMovies" />
    </div>

    <h2 class="other-movies-title">MÁS PELÍCULAS</h2>
    <div class="other-movies-container">
      <div class="movie-list">
        <div v-for="movie in filteredOtherMovies" :key="movie.id" class="movie-item" @click="goToMovieDetail(movie.id)">
          <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Movie Poster" />
          <h3>{{ movie.title }}</h3>
        </div>
      </div>
    </div>

    <Pagination :total-pages="totalPages" @page-changed="loadMovies" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { fetchMovies } from '../services/api';
import MovieCarousel from '../components/MovieCarousel.vue';
import Pagination from '../components/Pagination.vue';
import Navbar from '../components/NavBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const allMovies = ref([]); // Almacena todas las películas
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref('');

// Función para cargar las películas
const loadMovies = async (page = 1) => {
  try {
    const response = await fetchMovies(page);
    allMovies.value = response.results; // Almacena todas las películas
    totalPages.value = response.total_pages;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Computed para filtrar las películas más nuevas
const newestMovies = computed(() => {
  return allMovies.value
    .filter(movie => movie.release_date)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 10);
});

// Computed para filtrar todas las películas según la búsqueda
const filteredOtherMovies = computed(() => {
  return allMovies.value
    .filter(movie => movie.release_date && movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Función para redirigir a la página de detalles de la película
const goToMovieDetail = (movieId) => {
  router.push({ path: `/movie/${movieId}` });
};

// Cargar películas al montar el componente
onMounted(() => {
  loadMovies(currentPage.value);
});

// Watcher para actualizar la búsqueda
watch(searchQuery, () => {
  // No es necesario llamar a loadMovies aquí, ya que estamos filtrando desde allMovies
});
</script>

<style scoped>
.other-movies-container {
  display: flex;
  flex-wrap: wrap;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
}

.movie-item {
  cursor: pointer;
  margin: 10px;
  text-align: center;
}

.movie-item img {
  max-width: 100%;
  height: auto;
}
</style>