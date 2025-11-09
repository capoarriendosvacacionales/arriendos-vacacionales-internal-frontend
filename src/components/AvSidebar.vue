<template>
  <section class="oruga-sidebar">
    <div class="sidebar-layout">
      <o-sidebar :mobile="mobile" :expand-on-hover="expandOnHover" :reduce="reduce" active>
        <section class="menu-sidebar">
          <a class="navbar-item menu-text" href="profile">Mi perfil</a>
          <a class="navbar-item menu-text" href="/">Mi calendario</a>
          <a class="navbar-item menu-text" href="properties">Mis propiedades</a>
        </section>
      </o-sidebar>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    mobile: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      expandOnHover: false,
      reduce: false,
    }
  },
}
</script>

<style scope>
.oruga-sidebar {
  position: fixed; /* Fija la sidebar a la pantalla */
  top: 111px; /* Margen superior de 90px */
  left: 50%; /* Posiciona el lado izquierdo al 50% de la pantalla */
  transform: translateX(-50%); /* Centra la sidebar ajustando hacia la izquierda */
  height: 180px; /* Altura total menos el margen superior */
  z-index: 1000; /* Asegura que esté sobre otros elementos */
  border-radius: 0 0 25px 25px; /* Redondea solo las esquinas inferiores */
}
.sidebar .sidebar-content {
  top: 5px;
  border-radius: 0 0 25px 25px; /* Redondea solo las esquinas inferiores */
}
.menu-sidebar {
  padding-top: 1em;
  text-align: center;
  background-color: transparent !important;
}
.menu-text {
  color: #ffcd68;
  font-size: 20px;
  padding-bottom: 10px;
}
@media (min-width: 320px) and (max-width: 425px) {
  .oruga-sidebar {
    width: 280px;
    top: 173px;
  }
  .sidebar .sidebar-content {
    background-color: #0cc2fff6;
    width: 280px;
    border-radius: 25px;
  }
}
@media (min-width: 426px) and (max-width: 1023px) {
  .oruga-sidebar {
    top: 173px;
    width: 280px;
    background-color: transparent !important;
  }
  .sidebar .sidebar-content {
    background-color: #0cc2fff6;
    border-radius: 25px;
    width: 280px;
  }
}
</style>
