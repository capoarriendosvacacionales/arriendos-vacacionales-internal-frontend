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
        <o-modal v-model:active="isErrorCardModalActive" :width="330" scroll="clip">
          <div class="notification">
            <div class="container">
              <i class="mdi mdi-close-circle mdi-main"></i>
              <p class="error-detail">{{ error }}</p>
              <i class="mdi mdi-close-circle-outline mdi-close" @click="closeModal"></i>
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
      isErrorCardModalActive: false,
    }
  },
  async beforeMount() {
    try {
      this.isLoading = true

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
      this.isLoading = false
      console.error('Error en la petición:', error)
    }
  },
  methods: {
    async saveProfile() {
      try {
        this.isLoading = true

        if (this.bankAccount === '' || this.bank === '' || this.typeAccount === '') {
          this.isErrorCardModalActive = true
          this.error = 'Los campos Banco, Tipo de cuenta y Número de cuenta son obligatorios.'
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
          this.ok = 'Los datos fueron actualizados!'
        }
        this.isLoading = false
      } catch (error) {
        this.isErrorCardModalActive = true
        this.error = `Error: ${error}`
        this.isLoading = false
      }
    },
    closeModal() {
      this.isErrorCardModalActive = false
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
span {
  margin-top: 3px;
  font-size: 14px;
  color: red;
  float: right;
}
.notification {
  background-color: hsl(348deg 88.3% 67.24%);
  padding: 5px 14px 0 0;
  border-radius: 30px;
  text-align: center;
}
.mdi-main {
  margin: auto 0;
  padding-left: 25px;
  font-size: 50px;
  color: #fff;
}
.container {
  display: flex;
}
.error-detail {
  color: #fff;
  margin: 20px 15px 25px 20px;
  text-align: justify;
}
.mdi-close {
  float: right;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
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
