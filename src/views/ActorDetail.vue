<template>
    <div v-if="actor" class="actor-detail">
      <Navbar />
      <div class="detail-container">
        <div class="poster-container">
          <img :src="`https://image.tmdb.org/t/p/w500/${actor.profile_path}`" alt="Actor Poster" class="actor-poster" />
        </div>
        <div class="info-container">
          <h1 class="actor-name">{{ actor.name }}</h1>
          <p class="birth-date">Fecha de nacimiento: {{ actor.birthday }}</p>
          <p class="biography">{{ actor.biography }}</p>
          <div class="known-for">
            <h3>Conocido por:</h3>
            <ul>
              <li v-for="movie in actor.known_for" :key="movie.id">
                {{ movie.title }} ({{ movie.release_date ? movie.release_date.split('-')[0] : 'N/A' }})
              </li>
            </ul>
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
  import { fetchActorDetail } from '../services/api';
  import Navbar from '../components/NavBar.vue';
  
  const actor = ref(null);
  const route = useRoute();
  
  // Cargar detalles del actor usando el ID de la ruta
  const loadActorDetail = async () => {
    const actorId = route.params.id;
    actor.value = await fetchActorDetail(actorId);
  };
  
  onMounted(() => {
    loadActorDetail();
  });
  </script>
  
  <style scoped>
  .actor-detail {
    padding: 20px;
    background-color: #f9f9f9;
  }
  
  .detail-container {
    display: flex;
    max-width: 800px;
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
  
  .actor-poster {
    width: 100%;
    border-radius: 10px;
  }
  
  .info-container {
    flex: 2;
    padding: 20px;
  }
  
  .actor-name {
    font-size: 2rem;
    margin: 0;
    color: #333;
  }
  
  .birth-date {
    font-size: 1rem;
    color: #666;
  }
  
  .biography {
    margin-top: 10px;
    font-size: 1rem;
    line-height: 1.5;
    color: #444;
  }
  
  .known-for {
    margin-top: 20px;
  }
  
  .known-for h3 {
    margin-bottom: 10px;
  }
  
  .known-for ul {
    list-style-type: none;
    padding: 0;
  }
  
  .known-for li {
    margin: 5px 0;
  }
  </style>