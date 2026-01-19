<template>
  <section>
    <div class="div-principal">
      <o-loading v-model:active="isLoading" :full-page="isFullPage">
        <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
      </o-loading>

      <div class="card">
        <o-collapse :open="false" expanded trigger-class="trigger">
          <template #trigger="{ open }">
            <h1 class="titulo">
              <o-icon class="flecha" :icon="open ? 'chevron-down' : 'chevron-right'" />
              Mi perfil
            </h1>
          </template>

          <p class="field mt-4 mb-1">Nombres</p>
          <input class="input mb-3" type="text" v-model="firstName" disabled />

          <p class="field mb-1">Apellidos</p>
          <input class="input mb-3" type="text" v-model="lastName" disabled />

          <p class="field mb-1">Email</p>
          <input class="input mb-3" type="text" v-model="email" disabled />

          <p class="field mb-1">Fecha de nacimiento</p>
          <input class="input mb-3" type="text" v-model="birthDate" disabled />

          <p class="important" v-show="!dni && email">Campo obligatorio!</p>
          <p class="field mb-1">RUT / Pasaporte</p>
          <input class="input mb-3" type="text" v-model="dni" />

          <p class="important" v-show="!address && email">Campo obligatorio!</p>
          <p class="field mb-1">Dirección</p>
          <input class="input mb-3" type="text" v-model="address" />

          <p class="important" v-show="!municipality && email">Campo obligatorio!</p>
          <p class="field mb-1">Comuna</p>

          <o-select class="mb-3" v-model="municipality" expanded>
            <option v-for="option in listMunicipalities" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <p class="important pt-3" v-show="!resortTown && email">Campo obligatorio!</p>
          <p class="field mt-3 mb-1">Ciudad</p>

          <o-select v-model="resortTown" expanded>
            <option v-for="option in listResortTowns" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <p class="important pt-3" v-show="!region && email">Campo obligatorio!</p>
          <p class="field mt-3 mb-1">Región</p>

          <o-select v-model="region" expanded>
            <option v-for="option in listRegions" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <p class="important pt-3" v-show="!country && email">Campo obligatorio!</p>
          <p class="field mt-3 mb-1">País</p>

          <o-select v-model="country" expanded>
            <option v-for="option in listCountries" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <p class="important pt-3" v-show="!phone && email">Campo obligatorio!</p>
          <p class="field mt-3 mb-1">Fono</p>
          <input class="input mb-3" type="text" v-model="phone" />

          <p class="important" v-show="!bank && email">Campo obligatorio!</p>
          <p class="field mb-1">Banco</p>

          <o-select v-model="bank" expanded>
            <option v-for="option in listBanks" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <p class="important" v-show="!accountNumber && email">Campo obligatorio!</p>
          <p class="field mt-3 mb-1">Nº de cuenta</p>
          <input id="accountNumber" class="input mb-3" type="text" v-model="accountNumber" />

          <p class="important" v-show="!accountType && email">Campo obligatorio!</p>
          <p class="field mb-1">Tipo de cuenta</p>

          <o-select v-model="accountType" expanded>
            <option v-for="option in listAccountTypes" :key="option.value" :value="option.label">
              {{ option.label }}
            </option>
          </o-select>

          <o-button label="Guardar" class="boton" @click="saveProfile()" />
          <o-button label="Cerrar sesión" class="boton-logout" @click="logout()" />
        </o-collapse>
      </div>

      <div class="card sub-card">
        <o-collapse :open="false" expanded trigger-class="trigger">
          <template #trigger="{ open }">
            <h1 class="titulo">
              <o-icon class="flecha" :icon="open ? 'chevron-down' : 'chevron-right'" />
              Cambiar contraseña
            </h1>
          </template>

          <p class="field mt-4 mb-1">Ingresa tu contraseña actual</p>
          <input class="input mb-3" type="password" v-model="lastPassword" />

          <p class="field mb-1">
            <o-tooltip
              label="La contraseña debe comenzar con mayúscula, contener 8 dígitos o más, incluir al menos una minúscula, un número, un símbolo y no contener espacios"
              position="right"
              multiline
            >
              <i class="mdi mdi-information custom-icon pr-1"></i>
            </o-tooltip>

            <span class="password-span">Ingresa tu nueva contraseña</span>
          </p>
          <input class="input mb-3" type="password" v-model="newPassword" />

          <p class="field mb-1">Confirma tu nueva contraseña</p>
          <input class="input mb-3" type="password" v-model="confirmNewPassword" />

          <o-button label="Cambiar contraseña" class="boton" @click="changePassword()" />
        </o-collapse>
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
import api from '../api/api'
import { listMunicipalities } from '@/assets/municipalities'
import { listResortTowns } from '@/assets/resort-town'
import { listRegions } from '@/assets/regions'
import { listCountries } from '@/assets/countries'
import { listBanks } from '@/assets/banks'
import { listAccountTypes } from '@/assets/account-types'

export default {
  name: 'AvProfile',
  data() {
    return {
      firstName: null,
      lastName: null,
      birthDate: null,
      email: null,
      bank: null,
      accountNumber: null,
      accountType: null,
      dni: null,
      address: null,
      municipality: null,
      resortTown: null,
      region: null,
      country: null,
      phone: null,
      error: null,
      ok: null,
      isLoading: false,
      isFullPage: false,
      isCardModalActive: false,
      mensajeModal: null,
      tituloMensajeModal: null,
      listMunicipalities,
      listResortTowns,
      listRegions,
      listCountries,
      listBanks,
      listAccountTypes,
      lastPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    }
  },
  async beforeMount() {
    try {
      this.isLoading = true

      const userId = localStorage.getItem('id')
      /* const getProfile = await api.get(`${import.meta.env.VITE_BACKEND_GET_PROFILE}?id=${userId}`) */

      const getProfile = await api.get(import.meta.env.VITE_BACKEND_GET_PROFILE, {
        params: { id: userId },
      })

      this.firstName = getProfile.data.firstName
      this.lastName = getProfile.data.lastName
      this.birthDate = getProfile.data.birthDate
      this.email = getProfile.data.email
      this.accountNumber = getProfile.data.accountNumber
      this.bank = getProfile.data.bank
      this.accountType = getProfile.data.accountType
      this.dni = getProfile.data.dni
      this.address = getProfile.data.address
      this.municipality = getProfile.data.municipality
      this.resortTown = getProfile.data.resortTown
      this.region = getProfile.data.region
      this.country = getProfile.data.country
      this.phone = getProfile.data.phone

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
      // Evita dobles clics y llamadas dobles
      if (this.isLoading) return

      this.isLoading = true
      this.error = null
      this.ok = null

      const isEmpty = (value) => value === undefined || value === null || value === ''

      if (
        isEmpty(this.accountNumber) ||
        isEmpty(this.bank) ||
        isEmpty(this.accountType) ||
        isEmpty(this.dni) ||
        isEmpty(this.address) ||
        isEmpty(this.municipality) ||
        isEmpty(this.resortTown) ||
        isEmpty(this.region) ||
        isEmpty(this.country) ||
        isEmpty(this.phone)
      ) {
        this.error = 'Completa todos los campos obligatorios.'
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.isLoading = false
        return // 🔥 ahora SÍ DETIENE TODO
      }
      try {
        const userId = localStorage.getItem('id')
        const body = {
          userId: userId,
          bank: this.bank,
          accountNumber: this.accountNumber,
          accountType: this.accountType,
          dni: this.dni,
          address: this.address,
          municipality: this.municipality,
          resortTown: this.resortTown,
          region: this.region,
          country: this.country,
          phone: this.phone,
        }
        /* const updateProfile = await api.patch(`${import.meta.env.VITE_BACKEND_PATCH_PROFILE}`, body) */
        const updateProfile = await api.patch(import.meta.env.VITE_BACKEND_PATCH_PROFILE, body)
        if (updateProfile.data.id) {
          this.error = null
          this.tituloMensajeModal = 'Excelente'
          this.ok = 'Perfil actualizado!'
        }
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.ok = null
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.error = error
        this.isLoading = false
      }
    },
    async changePassword() {
      if (this.isLoading) return

      this.isLoading = true
      this.error = null
      this.ok = null

      const isEmpty = (value) => value === undefined || value === null || value === ''

      if (
        isEmpty(this.lastPassword) ||
        isEmpty(this.newPassword) ||
        isEmpty(this.confirmNewPassword)
      ) {
        this.error = 'Completa todos los campos de contraseña.'
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.isLoading = false
        return
      }

      const isValidPassword = this.validatePassword()
      if (!isValidPassword) return

      try {
        const id = localStorage.getItem('id')
        const user = localStorage.getItem('user')
        const body = {
          id: id,
          email: user,
          lastPassword: this.lastPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmNewPassword,
        }
        const changePassword = await api.patch(import.meta.env.VITE_BACKEND_PATCH_PASSWORD, body)

        if (changePassword) {
          this.error = null
          this.tituloMensajeModal = 'Excelente'
          this.ok = 'Password actualizada!'
        }
        this.isLoading = false
        this.isCardModalActive = true
      } catch (error) {
        this.ok = null
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.error = error.response.data.message
        console.log('changePassword error raw:', error)
        console.log('backend payload:', error?.response?.data)
      } finally {
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
    validatePassword() {
      const passwordRegex =
        /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{}\]:;'",.<>/?|`~])\S{7,}$/

      if (this.newPassword !== this.confirmNewPassword) {
        this.error = 'Las contraseñas no coinciden.'
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.isLoading = false
        return false
      }

      if (this.newPassword === this.lastPassword) {
        this.error = 'La nueva contraseña no puede ser igual a la actual.'
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.isLoading = false
        return false
      }

      if (!passwordRegex.test(this.newPassword)) {
        this.error =
          'La contraseña debe comenzar con mayúscula, incluir al menos una minúscula, un número y un símbolo, tener mínimo 8 caracteres y no contener espacios.'
        this.tituloMensajeModal = 'Error'
        this.isCardModalActive = true
        this.isLoading = false
        return false
      }

      return true
    },
  },
}
</script>

<style scoped>
.div-principal {
  margin-bottom: 30px;
  text-align: center;
}
.field {
  text-align: left;
}
.titulo {
  font-weight: 500;
  font-size: 23px;
  /* padding-bottom: 12px; */
  color: #005187;
  text-align: center;
}
.card {
  /* margin: 180px auto; */
  padding: 30px;
  border-radius: 30px;
  width: 350px !important;
  /* max-width: calc(500px - 60px) !important; */
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
.important {
  font-size: 14px;
  color: red;
  margin-top: 3px;
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
.flecha {
  margin-right: 5px;
}
.sub-card {
  margin-top: 50px !important;
}
.custom-icon {
  font-size: 20px;
  cursor: pointer;
}
.password-span {
  margin-top: 2px;
}
@media (min-width: 320px) and (max-width: 768px) {
  .div-principal {
    text-align: center;
  }
  .card {
    margin-top: 210px;
  }
}
@media (min-width: 769px) {
  .card {
    margin-top: 210px;
    width: 500px !important;
  }
  .table-wrapper .table-inner.is-mobile td {
    width: 360px !important;
  }
}
</style>
