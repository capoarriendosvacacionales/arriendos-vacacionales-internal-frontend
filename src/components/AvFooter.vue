<template>
  <div class="footer has-background-primary has-text-white" id="contacto-footer">
    <div class="content has-text-centered">
      <h1 class="title">Contacto</h1>
      <div class="social-icons">
        <a href="https://wa.me/56985651244" target="_blank" rel="noopener noreferrer">
          <i class="mdi mdi-whatsapp whatsapp-icon"></i>
        </a>
        <a href="mailto:ventas@arriendosvacacionales.com" class="email-link">
          <i class="mdi mdi-email email-icon"></i>
        </a>
      </div>
      <div class="social-icons">
        <a
          class="referencia"
          href="https://www.facebook.com/share/EJAtLdrzkfDuoxdy/"
          target="_blank"
        >
          <i class="mdi mdi-facebook custom-icon"></i>
        </a>
        <a
          class="referencia"
          href="https://www.instagram.com/capopropiedades?igsh=d3U5bzlrMm1tbGo4"
          target="_blank"
        >
          <i class="mdi mdi-instagram custom-icon"></i>
        </a>
        <a href="https://www.capopropiedades.cl" target="_blank">
          <img
            src="../assets/capo.png"
            alt="Logo de Capó Propiedades"
            class="mt-1"
            style="width: 60px; height: 63px; padding-top: 6px"
          />
        </a>
      </div>
    </div>
    <div class="section-parrafo">
      <a class="terms pb-3" href="/terms.html" target="_blank"
        >Términos y condiciones <i class="mdi mdi-open-in-new"></i
      ></a>
      <p class="parrafo pt-3">© 2024 Todos los derechos reservados.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvFooter',
  data() {
    return {
      isCardModalActive: false,
      transferData:
        'Capo Gestión Inmobiliaria SPA,Banco Santander,Cuenta Corriente 8577293-7,Rut: 77.477.151-4,romina.ramirez@capopropiedades.cl'.replace(
          /,/g,
          '\n',
        ),
      confirmacionEmail: '',
    }
  },
  methods: {
    async copyToClipboard() {
      await navigator.clipboard.writeText(this.transferData)
      this.confirmacionEmail = 'Datos copiados!'
    },
  },
}
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 20px;
  background-color: #005187 !important;
  color: white;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.title {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-size: 25px;
  color: #ffcd68;
  margin-top: 15px;
  text-align: center;
  font-weight: 500;
}
.section-parrafo {
  text-align: center;
}
.parrafo {
  color: white;
  font-size: 18px;
}
.terms {
  color: #ffcd68;
  font-size: 18px;
}
.social-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 60px;
}
.custom-icon {
  font-size: 50px;
}
.referencia {
  color: white;
}
.transfer-button {
  background-color: #ffcd68;
  color: #005187;
}
.titulo-interno {
  margin: 0 !important;
  padding: 0 !important;
  text-align: left;
  color: #333;
}
.parrafo-interno {
  margin: 0 !important;
  padding-bottom: 10px !important;
  text-align: left;
  color: #333;
}
.whatsapp-icon {
  font-size: 50px;
  color: #25d366;
}
.email-icon {
  font-size: 50px;
}
.email-link {
  color: white;
  text-decoration: none;
}
.email-link:hover,
.email-link:visited,
.email-link:focus,
.email-link:active {
  color: white; /* Asegura que el color permanezca blanco en todos los estados */
}
@media (max-width: 346px) {
  .parrafo,
  .terms {
    font-size: 14px;
  }
}
</style>
