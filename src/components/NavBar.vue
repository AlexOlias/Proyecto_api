<template>
  <nav>
    <router-link to="/" class="nav-item">INICIO</router-link>
    
    <router-link to="/Series" class="nav-item">SERIES</router-link>

    <router-link to="/Genres" class="nav-item">GÉNEROS</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
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
