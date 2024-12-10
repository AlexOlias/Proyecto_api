<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    RouterView
  }
})
</script>

<style>
/* Estilos globales o específicos para el componente */
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  
}

.movie-list-container {
  display: flex; /* Asegúrate de que el contenedor sea flexible */
  justify-content: center; /* Centra el contenido horizontalmente */
  padding: 0; /* Elimina el padding si causa espacio adicional */
  margin: 20px 0; /* Espacio vertical entre el buscador y la lista de películas */
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 00px; /* Espacio entre las portadas */
  text-align: center;
  max-width: 1000px; /* Ajusta el ancho máximo según sea necesario */
  margin: 0 auto; /* Centra la lista de películas */
}

.movie-item {
  width: 150px; /* Ajusta el tamaño según sea necesario */
  text-align: center;
}

.movie-item img {
  width: 100%; /* Ajusta la imagen al contenedor */
  border-radius: 8px; /* Opcional: bordes redondeados */
}
</style>