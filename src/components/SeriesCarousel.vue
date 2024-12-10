<template>
    <Splide
      :options="splideOptions"
      class="splide"
    >
      <SplideSlide v-for="series in series" :key="series.id">
        <SeriesCard :series="series" />
      </SplideSlide>
    </Splide>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import SeriesCard from './SeriesCard.vue'; 
  
  const props = defineProps({
    series: Array, 
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
    max-width: 1000px;
    width: 100%;
    justify-content: center;
    margin-right: 180px;
    margin-top: 40px;
  }
  
  .carousel-items {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
  }
  
  .series-card {
    margin: 0 30px;
  }
  </style>
  