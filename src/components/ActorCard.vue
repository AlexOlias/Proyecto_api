<!-- src/components/ActorCard.vue -->
<template>
    <div class="actor-card">
      <router-link :to="`/actor/${actor.id}`">
        <img v-if="actor.profile_path" :src="`https://image.tmdb.org/t/p/w500/${actor.profile_path}`" alt="Actor" class="actor-poster" />
        <h3>{{ actor.name }}</h3>
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    actor: Object,
  });
  </script>
  
  <style scoped>
.actor-list {
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  gap: 10px; 
}

.actor-item {
  width: 80px; 
  text-align: center; 
}

.actor-item img {
  width: 100%; 
  height: auto; 
  border-radius: 50%; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.actor-item h4 {
  font-size: 0.8rem; 
  margin-top: 5px; 
}

.actor-poster {
  width: 30%; /* Cambia este valor a lo que desees, por ejemplo, 80% o un valor en píxeles */
  border-radius: 10px;
}

.actor-card {
  width: 120px; /* Ajusta el ancho según sea necesario */
  text-align: center;
  margin: 10px; /* Espacio entre las tarjetas */
}

.actor-card img {
  max-width: 100%; /* Asegúrate de que la imagen se ajuste al contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 10px; /* Bordes redondeados para la imagen */
}
</style>
