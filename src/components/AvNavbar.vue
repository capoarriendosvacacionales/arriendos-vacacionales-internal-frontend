<template>
  <nav
    class="navbar is-fixed-top custom-color-primary"
    role="navigation"
    aria-label="main navigation"
    id="nav-inicio"
  >
    <div class="navbar-brand">
      <div class="logo-contenedor">
        <img
          src="../assets/logoprincipalredondo.png"
          alt="Logo de Arriendos Vacacionales"
          style="width: 190px; height: auto; padding-top: 6px"
        />
      </div>
      <a
        role="button"
        class="navbar-burger custom-color-white mb-5"
        aria-label="menu"
        aria-expanded="true"
        @click="openAndCloseBurger"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>

    <div class="navbar-center is-hidden-touch">
      <a class="navbar-item menu-text" href="/">Calendario</a>
      <a class="navbar-item menu-text" href="/profile">Perfil</a>
      <a class="navbar-item menu-text" href="properties">Propiedades</a>
    </div>
  </nav>
</template>

<script>
import { useMenuStateInStore } from '@/stores/store'

export default {
  name: 'AvNavbar',
  setup() {
    const menuState = useMenuStateInStore()

    function openAndCloseBurger() {
      const burger = document.querySelector('.navbar-burger')
      burger?.classList.toggle('is-active')
      menuState.changeMenuState(!menuState.menuState)
    }

    return {
      openAndCloseBurger,
    }
  },
}
</script>

<style scoped>
.navbar.is-fixed-bottom,
.navbar.is-fixed-top {
  box-shadow: 0px 1px 20px 1px rgba(10, 10, 10, 0.1);
  min-height: 100px;
  margin: 0 auto;
  top: 30px;
  border-radius: 25px;
  background-color: #005187;
  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 12px 40px rgba(0, 0, 0, 0.15);
}
.navbar-burger {
  margin-top: 28px;
  margin-right: 19px;
}
span {
  color: white;
}
img {
  margin-left: 10px;
}
.navbar-center {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
.navbar-item {
  background-color: transparent !important;
  color: white;
  font-size: 20px;
}
.navbar-item:hover {
  background-color: transparent !important;
  color: #ffcd68 !important;
}
.logo-contenedor {
  margin-left: 40px;
  margin-top: 11px;
  padding-right: 20px;
}
.logo {
  font-family: 'Inter', serif;
  font-optical-sizing: auto;
  font-style: normal;
  color: #ffcd68 !important;
}
.nombre {
  font-weight: 700;
  margin-top: 8px;
  font-size: 21px;
}
.detalle {
  font-size: 19px;
  text-align: center;
}
@media (min-width: 320px) and (max-width: 425px) {
  .navbar.is-fixed-bottom,
  .navbar.is-fixed-top {
    max-width: 300px;
  }
  .logo-contenedor {
    margin-top: 11px;
    margin-left: 30px;
  }
}
@media (min-width: 426px) and (max-width: 1023px) {
  .navbar.is-fixed-bottom,
  .navbar.is-fixed-top {
    max-width: 400px;
  }
  .logo-contenedor {
    margin-top: 11px;
    margin-left: 30px;
  }
}
@media (min-width: 1024px) {
  .navbar.is-fixed-bottom,
  .navbar.is-fixed-top {
    max-width: 600px;
  }
}
</style>
