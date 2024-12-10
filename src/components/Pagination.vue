<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" aria-label="Página anterior">
      Anterior
    </button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" aria-label="Página siguiente">
      Siguiente
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, default: 1 }
});

const emit = defineEmits(['page-changed']);
const currentPage = ref(props.currentPage);

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value++;
    emit('page-changed', currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('page-changed', currentPage.value);
  }
};

watch(() => props.totalPages, (newVal) => {
  if (currentPage.value > newVal) {
    currentPage.value = newVal;
    emit('page-changed', currentPage.value);
  }
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  align-items: center;    /* Alinear verticalmente */
  gap: 10px;              /* Espaciado entre elementos */
  margin-top: 20px;       /* Espacio desde el contenido superior */
  margin-bottom: 0;       /* Asegurar que esté alineado abajo */
  position: relative;     /* Asegurar posición adecuada dentro del flujo */
}

.pagination button {
  padding: 8px 15px;      /* Tamaño compacto */
  font-size: 14px;        /* Texto más pequeño */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #0056b3;
}

.pagination span {
  font-size: 14px; /* Texto compacto */
}

@media (max-width: 600px) {
  .pagination {
    flex-direction: column; /* Apilar los elementos verticalmente */
    gap: 5px;              /* Espaciado reducido */
  }

  .pagination button {
    width: 100%;           /* Hacer los botones más accesibles */
  }
}
</style>
