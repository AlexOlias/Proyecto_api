<template>
  <div>
    <Navbar />
    <div class="carousel-container">
      <h1 class="new-series-title">SERIES NUEVAS</h1>
      <input v-model="searchQuery" placeholder="Buscar series..." />
      <SeriesCarousel :series="newestSeries" />
    </div>

    <h2 class="other-series-title">MÁS SERIES</h2>
    <div class="other-series-container">
      <div class="series-list">
        <div
          v-for="series in filteredOtherSeries"
          :key="series.id"
          class="series-item"
          @click="goToSeriesDetail(series.id)"
        >
          <img
            v-if="series.poster_path"
            :src="`https://image.tmdb.org/t/p/w500/${series.poster_path}`"
            :alt="`Poster de ${series.name}`"
          />
          <h3>{{ series.name }}</h3>
        </div>
      </div>
    </div>

    <Pagination :total-pages="totalPages" @page-changed="loadSeries" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchSeries } from '../services/api';
import SeriesCarousel from '../components/SeriesCarousel.vue';
import Pagination from '../components/Pagination.vue';
import Navbar from '../components/NavBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const allSeries = ref([]); // Almacena todas las series
const totalPages = ref(0);
const currentPage = ref(1);
const searchQuery = ref('');

// Función para cargar las series
const loadSeries = async (page = 1) => {
  try {
    const response = await fetchSeries(page);
    if (response && response.length > 0) {
      allSeries.value = response;
      totalPages.value = 10; // Suponiendo un máximo de 10 páginas (ajusta según la API)
    } else {
      console.warn('No se encontraron series');
      allSeries.value = [];
    }
  } catch (error) {
    console.error("Error fetching series:", error);
    allSeries.value = [];
  }
};

// Computed para filtrar las series más nuevas
const newestSeries = computed(() => {
  return allSeries.value
    .filter(series => series.first_air_date && series.poster_path) // Valida las propiedades
    .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
    .slice(0, 10);
});

// Computed para filtrar todas las series según la búsqueda
const filteredOtherSeries = computed(() => {
  return allSeries.value
    .filter(series => 
      series.first_air_date && 
      series.poster_path && 
      series.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Función para redirigir a la página de detalles de la serie
const goToSeriesDetail = (seriesId) => {
  router.push({ path: `/series/${seriesId}` });
};

// Cargar series al montar el componente
onMounted(() => {
  loadSeries(currentPage.value);
});
</script>

<style scoped>
.other-series-container {
  display: flex;
  flex-wrap: wrap;
}

.series-list {
  display: flex;
  flex-wrap: wrap; /* Permite que las series se envuelvan en varias filas */
  justify-content: center; /* Centra las series en el contenedor */
}

.series-item {
  cursor: pointer;
  margin: 10px;
  text-align: center;
  width: 120px; /* Ajusta el ancho para que quepan más series */
  max-width: 100%; /* Asegúrate de que no exceda el contenedor */
}

.series-item img {
  max-width: 100%; /* Asegúrate de que la imagen se ajuste al contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
}
</style>
