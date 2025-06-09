<template>
  <section>
    <div class="div-principal">
      <o-loading v-model:active="isLoading" :full-page="isFullPage">
        <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
      </o-loading>
      <div class="card">
        <h1 class="titulo">Mi perfil</h1>
        <p class="mb-1">Nombres</p>
        <input class="input mb-3" type="text" v-model="firstName" disabled />
        <p class="mb-1">Apellidos</p>
        <input class="input mb-3" type="text" v-model="lastName" disabled />
        <p class="mb-1">Email</p>
        <input class="input mb-3" type="text" v-model="email" disabled />
        <p class="mb-1">Fecha de nacimiento</p>
        <input class="input mb-3" type="text" v-model="birthDate" disabled />
        <p class="mb-1">Banco<span v-show="!bank && email"> Campo obligatorio!</span></p>
        <input class="input mb-3" type="text" v-model="bank" />
        <p class="mb-1">
          Nº de cuenta<span v-show="!bankAccount && email"> Campo obligatorio!</span>
        </p>
        <input class="input mb-3" type="text" v-model="bankAccount" />
        <p class="mb-1">
          Tipo de cuenta<span v-show="!typeAccount && email"> Campo obligatorio!</span>
        </p>
        <input class="input mb-3" type="text" v-model="typeAccount" />
        <o-button label="Guardar" class="boton" @click="saveProfile()" />
        <o-button label="Cerrar sesión" class="boton-logout" @click="logout()" />
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
    </div>
  </section>
</template>
<script>
import api from '../api/api'
export default {
  name: 'AvProfile',
  data() {
    return {
      firstName: null,
      lastName: null,
      birthDate: null,
      email: null,
      bankAccount: null,
      bank: null,
      typeAccount: null,
      error: null,
      ok: null,
      isLoading: false,
      isFullPage: false,
      isCardModalActive: false,
      mensajeModal: null,
      tituloMensajeModal: null,
    }
  },
  async beforeMount() {
    try {
      this.isLoading = true

      console.log(import.meta.env.VITE_BACKEND_GET_PROFILE)

      const userId = localStorage.getItem('id')
      const getProfile = await api.get(`${import.meta.env.VITE_BACKEND_GET_PROFILE}?id=${userId}`)

      this.firstName = getProfile.data.firstName
      this.lastName = getProfile.data.lastName
      this.birthDate = getProfile.data.birthDate
      this.email = getProfile.data.email
      this.bankAccount = getProfile.data.bankAccount
      this.bank = getProfile.data.bank
      this.typeAccount = getProfile.data.typeAccount
      this.isLoading = false
    } catch (error) {
      this.isCardModalActive = true
      this.error = error
      this.tituloMensajeModal = 'Error'
      this.isLoading = false
    }
  },
  methods: {
    async saveProfile() {
      try {
        this.isLoading = true

        if (this.bankAccount === '' || this.bank === '' || this.typeAccount === '') {
          this.isCardModalActive = true
          this.error = 'Los campos Banco, Tipo de cuenta y Número de cuenta son obligatorios.'
          this.tituloMensajeModal = 'Error'
          this.isLoading = false
          return
        }

        const userId = localStorage.getItem('id')
        const body = {
          userId: userId,
          bank: this.bank,
          bankAccount: this.bankAccount,
          typeAccount: this.typeAccount,
        }
        const updateProfile = await api.patch(`${import.meta.env.VITE_BACKEND_PATCH_PROFILE}`, body)
        if (updateProfile.data.id) {
          this.tituloMensajeModal = 'Excelente'
          this.ok = 'Perfil actualizado!'
        }
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    closeModal() {
      this.isCardModalActive = false
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('id')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.div-principal {
  margin-bottom: 30px;
}
.titulo {
  font-weight: 500;
  font-size: 23px;
  padding-bottom: 12px;
  color: #005187;
  text-align: center;
}
.card {
  margin: 180px auto;
  padding: 30px;
  border-radius: 30px;
  max-width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.boton {
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
.boton-logout {
  margin-top: 20px;
  padding: 13px;
  width: 100%;
  max-width: 500px;
  color: white;
  background-color: #f70;
  font-size: 18px;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
span {
  margin-top: 3px;
  font-size: 14px;
  color: red;
  float: right;
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
  margin-top: 8px;
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
@media (min-width: 320px) and (max-width: 523px) {
  .card {
    margin: 160px 10% 0 10%;
  }
}
@media (min-width: 769px) {
  .table-wrapper .table-inner.is-mobile td {
    width: 360px !important;
  }
}
</style>
