<template>
  <section>
    <p class="titulo">Home</p>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvHome',
  data() {
    return {
      user: null,
    }
  },
  async beforeMount() {
    try {
      await api.get(import.meta.env.VITE_BACKEND_TEST)
    } catch (error) {
      console.error('Error en la petición:', error)
    }
  },
}
</script>

<style scoped>
.titulo {
  padding-top: 200px;
  font-weight: 500;
  font-size: 23px;
  padding-bottom: 12px;
  color: #005187;
  text-align: center;
}
</style>
