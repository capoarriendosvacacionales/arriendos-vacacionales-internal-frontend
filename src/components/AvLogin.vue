<template>
  <section>
    <div class="div-principal">
      <div class="card">
        <h1 class="titulo">Inicio de sesión</h1>
        <p class="mb-1">Usuario</p>
        <input
          class="input mb-3"
          type="text"
          placeholder="Correo electrónico"
          v-model="username"
          required
        />
        <p class="mb-1">Password</p>
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <o-button
          label="Iniciar sesión"
          class="boton"
          @click="login"
        />
        <o-button
          label="Crear cuenta"
          class="boton-crear-cuenta"
        />
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  name: 'AvLogin',
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(import.meta.env.VITE_AUTH_URL, {
          username: this.username,
          password: this.password,
        });
        const token = response.data.access_token;
        localStorage.setItem('access_token', token);
        this.$router.push({ name: 'calendar' });
      } catch (error) {
        console.error('Error en login:', error);
      }
    },
  }
}
</script>
<style scoped>
section {
  min-height: 100vh;
  background: linear-gradient(to bottom, #00bfff, #27c6fa, #ffc400, #ffd700);
}
.div-principal {
  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
}
.card {
  margin: 0px auto 0;
  padding: 30px;
  border-radius: 30px;
  max-width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.titulo {
  font-weight:500;
  font-size: 23px;
  padding-bottom: 12px;
  color: #005187;
  text-align: center;
}
.boton {
  margin-top: 20px;
  padding: 13px;
  width: 100%;
  max-width: 500px;
  color: white;
  background-color: #027cce;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.boton-crear-cuenta {
  margin-top: 20px;
  padding: 13px;
  width: 100%;
  max-width: 500px;
  color: white;
  background-color: #b116febe;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
</style>
