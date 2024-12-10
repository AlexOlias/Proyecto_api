<template>
    <div v-if="series" class="series-detail">
      <Navbar />
      <div class="detail-container">
        <div class="poster-container">
          <img :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`" alt="Series Poster" class="series-poster" />
        </div>
        <div class="info-container">
          <h1 class="series-title">{{ series.name }}</h1>
          <p class="first-air-date">Fecha de estreno: {{ series.first_air_date }}</p>
          <p class="overview">{{ series.overview }}</p>
          <div class="additional-info">
            <p><strong>Calificación:</strong> {{ series.vote_average }} / 10</p>
            <p><strong>Número de temporadas:</strong> {{ series.number_of_seasons }}</p>
            <p><strong>Número de episodios:</strong> {{ series.number_of_episodes }}</p>
            <p><strong>Géneros:</strong> {{ series.genres.map(genre => genre.name).join(', ') }}</p>
          </div>
          <div class="cast">
            <h3>Elenco:</h3>
            <div class="cast-list">
              <ActorCard 
                v-for="actor in series.credits.cast" 
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
  import { useRoute, useRouter } from 'vue-router';
  import { fetchSeriesDetail } from '../services/api';
  import Navbar from '../components/NavBar.vue';
  import ActorCard from '../components/ActorCard.vue'; // Asegúrate de importar el componente ActorCard
  
  const series = ref(null);
  const route = useRoute();
  const router = useRouter();
  
  // Cargar detalles de la serie usando el ID de la ruta
  const loadSeriesDetail = async () => {
    const seriesId = route.params.id;
    series.value = await fetchSeriesDetail(seriesId);
  };
  
  onMounted(() => {
    loadSeriesDetail();
  });
  </script>
  
  <style scoped>
  .series-detail {
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
  
  .series-poster {
    width: 100%;
    border-radius: 10px;
  }
  
  .info-container {
    flex: 2;
    padding: 20px;
  }
  
  .series-title {
    font-size: 2rem;
    margin: 0;
    color: #333;
  }
  
  .first-air-date {
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