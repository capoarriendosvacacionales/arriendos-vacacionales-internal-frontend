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
        <o-button
          label="Crear cuenta"
          class="boton-crear-cuenta"
          @click="createAccount(crearCuenta)"
        />
        <div v-if="crearCuenta" class="create-user">
          <div class="disclaimer">
            <p>
              Importante! Debes completar tus datos de manera fidedigna. Serán importantes para
              mantener nuestra comunicación contigo y concretar los pagos.
            </p>
          </div>
          <div v-for="field in fields" :key="field.key" class="mb-3">
            <p class="mt-2 mb-1 ml-1">
              <o-tooltip
                v-if="field.key === 'password1'"
                label="La contraseña debe contener 8 dígitos o más, deben ser alphanumericos y tener 1 caracter especial"
                :teleport="teleport"
                position="right"
                multiline
              >
                <i class="mdi mdi-information custom-icon"></i>
              </o-tooltip>
              {{ field.label }}
            </p>

            <o-input
              v-if="field.type !== 'select'"
              :id="field.key"
              v-model="user[field.key]"
              :type="field.type"
              expanded
            />

            <o-select v-else v-model="user[field.key]" expanded>
              <option v-for="option in field.options" :key="option.value" :value="option.label">
                {{ option.label }}
              </option>
            </o-select>

            <p v-if="showErrorsAdd && !user[field.key]" class="error-msg">
              Debes completar este campo
            </p>
            
            <p
              v-if="
                showErrorsAdd &&
                field.key === 'password2' &&
                user.password1 &&
                user.password2 &&
                user.password1 !== user.password2
              "
              class="error-msg"
            >
              Las contraseñas deben ser iguales
            </p>
          </div>
          <o-button label="Crear!" class="boton-crear-cuenta" @click.prevent="createUser" />
        </div>
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
import { userFields } from '@/assets/users'
import { getDefaultUser } from '@/assets/get-default-user'

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
      crearCuenta: false,
      fields: userFields,
      user: getDefaultUser(),
      showErrorsAdd: false,
    }
  },
  methods: {
    createUser() {
      this.isLoading = true
      // Valida que ningun campo obligatorio sea null, devuelve error como texto bajo los objetos y retorna
      this.showErrorsAdd = true
      const hasEmpty = Object.values(this.user).some((v) => v === '' || v === null)
      if (hasEmpty) {
        this.isLoading = false
        return
      }
      this.isLoading = false
    },
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
      } catch {
        this.isCardModalActive = true
        this.tituloMensajeModal = 'Error'
        this.error = 'Usuario o password incorrectas'
        this.isLoading = false
      }
    },
    closeModal() {
      this.isCardModalActive = false
    },
    createAccount() {
      this.crearCuenta = !this.crearCuenta
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
  padding: 70px 30px 50px 30px;
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
.disclaimer {
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  text-align: justify;
  font-size: 14px;
  background-color: hsla(56, 100%, 57%, 0.452);
  border-radius: 5px;
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
  background-color: #0580a9;
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
.create-user {
  margin-top: 10px;
  padding: 20px;
  background-color: rgba(219, 185, 236, 0.487);
}
select {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #c0a6e3;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  appearance: none;
}
.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-left: 4px;
}
.custom-icon {
  font-size: 20px;
}
.tooltip .tooltip-content.is-right.is-multiline {
  width: 200px !important;
}
</style>
