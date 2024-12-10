<template>
  <div class="series-card">
    <router-link :to="`/series/${series.id}`">
      <img v-if="series.poster_path" :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`" :alt="series.name" />
      <h3>{{ series.name }}</h3>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  series: Object,
});
</script>

<style scoped>
.series-card {
  text-align: center;
}

.series-card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.series-card h3 {
  margin-top: 8px;
  font-size: 1.2rem;
}
</style>