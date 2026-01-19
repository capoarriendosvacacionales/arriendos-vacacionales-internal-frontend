<template>
  <section class="auth-page">
    <o-loading v-model:active="isLoading" :full-page="isFullPage">
      <i class="mdi mdi-reload mdi-36px mdi-spin"></i>
    </o-loading>
    <div class="card">
      <h1 class="titulo">Restablecer contraseña</h1>

      <p v-if="!token" class="error">
        Link inválido o incompleto. Solicita nuevamente la recuperación.
      </p>

      <div v-else>
        <p class="mb-1">Ingresa una nueva contraseña</p>
        <input class="input mb-3" type="password" v-model="newPassword" required />
        <p class="mb-1">Repite la nueva contraseña</p>
        <input class="input" type="password" v-model="confirmPassword" required />

        <p v-if="error" class="error">{{ error }}</p>
        <div v-if="okTitle" class="ok">
          <p class="ok-title">{{ okTitle }}</p>
          <p class="ok-subtitle">{{ okSubtitle }}</p>
        </div>

        <o-button label="Actualizar contraseña" class="boton" @click="changePassword()" />
      </div>
    </div>
  </section>
</template>

<script>
import api from '../api/api.js'

export default {
  name: 'ResetPasswordView',
  data() {
    return {
      token: null,
      newPassword: '',
      confirmPassword: '',
      isLoading: false,
      error: null,
      ok: null,
    }
  },
  mounted() {
    // token viene por query: /reset-password?token=...
    const t = this.$route.query.token
    this.token = typeof t === 'string' && t.length > 0 ? t : null
  },
  methods: {
    validatePassword() {
      const passwordRegex =
        /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{}\]:;'",.<>/?|`~])\S{7,}$/

      if (this.newPassword !== this.confirmPassword) {
        this.isLoading = false
        this.error = 'Las contraseñas no coinciden.'
        return false
      }

      if (!passwordRegex.test(this.newPassword)) {
        this.isLoading = false
        this.error =
          'La nueva contraseña debe comenzar con mayúscula, incluir minúscula, número y símbolo, mínimo 8 caracteres y sin espacios.'
        return false
      }

      return true
    },

    async changePassword() {
      this.isLoading = true
      this.error = null
      this.ok = null

      if (!this.token) {
        this.error = 'Link inválido o incompleto.'
        return
      }

      if (!this.validatePassword()) return

      try {
        const resp = await api.post('/auth/reset-password', {
          token: this.token,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        })

        if (resp.data === true) {
          this.okTitle = 'Contraseña actualizada!'
          this.okSubtitle = 'Redirigiendo al login...'
          this.error = null
          this.newPassword = ''
          this.confirmPassword = ''

          setTimeout(() => {
            this.$router.push({ name: 'login' })
          }, 3000)
        } else {
          this.isLoading = false
          this.error = 'No fue posible actualizar la contraseña.'
        }
      } catch (e) {
        this.isLoading = false
        const backendMessage = e?.response?.data?.message
        this.error = Array.isArray(backendMessage)
          ? backendMessage.join(', ')
          : backendMessage || 'No fue posible actualizar la contraseña.'
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped>
.auth-page {
  padding: 70px 30px 50px 30px;
}
.card {
  margin: 0px auto 0;
  padding: 30px;
  border-radius: 30px;
  width: calc(500px - 60px) !important;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.title {
  margin: 0 0 14px;
}
.error {
  margin: 10px 0 0 0;
  max-width: calc(500px - 60px) !important;
  color: #b00020;
  text-align: center;
}
.ok {
  margin: 10px 0;
  max-width: calc(500px - 60px) !important;
  color: white;
  background-color: hsl(117, 81%, 34%);
  padding: 20px;
  text-align: center;
}
.links {
  margin-top: 12px;
  text-align: center;
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
.ok-title {
  font-weight: 500;
  font-size: 21px;
  margin-bottom: 6px;
  text-align: center;
}

.ok-subtitle {
  font-size: 18px;
  opacity: 0.8;
  text-align: center;
}
</style>
