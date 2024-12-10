<template>
  <div v-if="movie" class="movie-detail">
    <Navbar />
    <div class="detail-container">
      <div class="poster-container">
        <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
      </div>
      <div class="info-container">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="release-date">Fecha de lanzamiento: {{ movie.release_date }}</p>
        <p class="overview">{{ movie.overview }}</p>
        <div class="additional-info">
          <p><strong>Calificación:</strong> {{ movie.vote_average }} / 10</p>
          <p><strong>Duración:</strong> {{ movie.runtime }} minutos</p>
          <p><strong>Géneros:</strong> {{ movie.genres.map(genre => genre.name).join(', ') }}</p>
        </div>
        <div class="cast">
          <h3>Elenco:</h3>
          <div class="cast-list">
            <ActorCard 
              v-for="actor in movie.credits.cast" 
              :key="actor.id" 
              :actor="actor" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchMovieDetail } from '../services/api';
import Navbar from '../components/NavBar.vue';
import ActorCard from '../components/ActorCard.vue'; // Asegúrate de importar el componente ActorCard

const movie = ref(null);
const route = useRoute();

// Cargar detalles de la película usando el ID de la ruta
const loadMovieDetail = async () => {
  const movieId = route.params.id;
  try {
    movie.value = await fetchMovieDetail(movieId);
  } catch (error) {
    console.error('Error al cargar los detalles de la película:', error);
    
  }
};

onMounted(() => {
  loadMovieDetail();
});
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  background-color: #f9f9f9;
}

.detail-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.poster-container {
  flex: 1;
  padding: 20px;
}

.movie-poster {
  width: 100%;
  border-radius: 10px;
}

.info-container {
  flex: 2;
  padding: 20px;
}

.movie-title {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

.release-date {
  font-size: 1rem;
  color: #666;
}

.overview {
  margin-top: 10px;
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
}

.additional-info {
  margin-top: 20px;
  font-size: 1rem;
  color: #555;
}

.additional-info p {
  margin: 5px 0;
}

.cast {
  margin-top: 20px;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>