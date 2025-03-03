<template>
  <section>
    <p class="titulo">Perfil</p>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvProfile',
  data() {
    return {
      user: null,
    }
  },
  async beforeMount() {
  try {

    const response = await api.get(import.meta.env.VITE_BACKEND_TEST);
    console.log(response.data);
  } catch (error) {
    console.error('Error en la petición:', error);
  }
},

}
</script>

<style scoped>
.titulo {
  padding-top: 200px;
  font-weight:500;
  font-size: 23px;
  padding-bottom: 12px;
  color: #005187;
  text-align: center;
}
</style>
