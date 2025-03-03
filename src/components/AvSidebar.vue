<template>
  <section class="oruga-sidebar">
    <div class="sidebar-layout">
      <o-sidebar :mobile="mobile" :expand-on-hover="expandOnHover" :reduce="reduce" active>
        <section class="menu-sidebar">
          <a class="navbar-item menu-text" href="/">Calendario</a>
          <a class="navbar-item menu-text" href="profile">Perfil</a>
          <a class="navbar-item menu-text" href="properties">Propiedades</a>
        </section>
      </o-sidebar>
    </div>
  </section>
</template>

<script></script>

<style scope>
.oruga-sidebar {
  position: fixed; /* Fija la sidebar a la pantalla */
  top: 105px; /* Margen superior de 90px */
  left: 50%; /* Posiciona el lado izquierdo al 50% de la pantalla */
  transform: translateX(-50%); /* Centra la sidebar ajustando hacia la izquierda */
  height: 180px; /* Altura total menos el margen superior */
  z-index: 1000; /* Asegura que esté sobre otros elementos */
  border-radius: 0 0 25px 25px; /* Redondea solo las esquinas inferiores */
  border-color: #005187;
}
.sidebar .sidebar-content {
  top: 5px;
  border-radius: 0 0 25px 25px; /* Redondea solo las esquinas inferiores */
}
.menu-sidebar {
  padding-top: 1em;
  text-align: center;
}
.menu-text {
  color: #ffcd68;
  font-size: 20px;
  padding-bottom: 10px;
}
@media (min-width: 320px) and (max-width: 425px) {
  .oruga-sidebar {
    width: 300px;
  }
  .sidebar .sidebar-content {
    background-color: #005187;
    width: 300px;
  }
}
@media (min-width: 426px) and (max-width: 1023px) {
  .oruga-sidebar {
    background-color: transparent !important;
    width: 400px;
  }
  .sidebar .sidebar-content {
    background-color: #005187;
    width: 400px;
  }
}
</style>
