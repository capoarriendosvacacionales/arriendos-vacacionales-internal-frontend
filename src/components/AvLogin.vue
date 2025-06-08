<template>
  <section>
    <div class="div-principal">
      <o-loading v-model:active="isLoading" :full-page="isFullPage">
        <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
      </o-loading>
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
        <input class="input" type="password" placeholder="Password" v-model="password" required />
        <o-button label="Iniciar sesión" class="boton" @click="login" />
        <o-button label="Crear cuenta" class="boton-crear-cuenta" />
      </div>
      <o-modal v-model:active="isCardModalActive" :width="330" scroll="clip">
        <div
          class="notification"
          :style="{
            'background-color': error ? 'hsl(348deg 88.3% 67.24%)' : 'hsl(117, 81%, 34%)',
          }"
        >
          <div class="container-modal">
            <h1 class="titulo-modal">{{ tituloMensajeModal }}</h1>
            <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal()"></i>
          </div>
          <div>
            <p class="notification-detail">{{ error ? error : ok }}</p>
          </div>
        </div>
      </o-modal>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AvLogin',
  data() {
    return {
      username: null,
      password: null,
      isCardModalActive: null,
      error: null,
      ok: null,
      isLoading: false,
      tituloMensajeModal: null,
      isFullPage: false,
    }
  },
  methods: {
    async login() {
      try {
        this.isLoading = true
        const response = await axios.post(import.meta.env.VITE_AUTH_URL, {
          username: this.username,
          password: this.password,
        })
        const idUser = response.data.id
        const username = response.data.username
        const token = response.data.access_token
        localStorage.setItem('access_token', token)
        localStorage.setItem('user', username)
        localStorage.setItem('id', idUser)
        this.$router.push({ name: 'calendar' })
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isCardModalActive = true
        this.tituloMensajeModal = 'Error'
        this.error = 'Usuario o password incorrectas'
        this.isLoading = false
      }
    },
    closeModal() {
      this.isCardModalActive = false
    },
  },
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
  font-weight: 500;
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
.notification {
  padding: 0;
  padding-bottom: 3px;
  border-radius: 30px;
  text-align: center;
}
.notification-detail {
  color: #fff;
  flex: 1; /* Ocupa el espacio sobrante */
  text-align: center; /* O center, según prefieras */
  padding: 7px 20px 15px 20px;
}
.mdi-close {
  position: absolute;
  margin-top: 10px;
  right: 12px;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
.container-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.titulo-modal {
  font-size: 23px;
  font-weight: 500;
  color: #fff;
  padding-top: 8px;
}
</style>
