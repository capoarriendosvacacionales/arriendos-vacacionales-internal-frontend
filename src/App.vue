<template>
  <!-- Renderiza header solo si el layout no es 'auth' -->
  <header v-if="$route.meta.layout !== 'auth'">
    <AvNavbar />
    <AvSidebar v-if="!menuState.menuState" />
  </header>
  <main>
    <router-view :key="$route.path"></router-view>
  </main>
  <footer v-if="$route.meta.layout !== 'auth'">
    <AvFooter />
  </footer>
</template>

<script>
import AvNavbar from './components/AvNavbar.vue'
import AvFooter from './components/AvFooter.vue'
import AvSidebar from './components/AvSidebar.vue'
import { useMenuStateInStore } from '@/stores/store'

export default {
  name: 'App',
  components: {
    AvNavbar,
    AvFooter,
    AvSidebar,
  },
  setup() {
    const menuState = useMenuStateInStore()
    return {
      menuState,
    }
  },
}
</script>

<style>
/* Aseguramos que html, body y el contenedor principal ocupen el 100% de la altura */
html,
body,
#app {
  height: 100%;
  margin: 0;
}
/* Convertimos el contenedor principal en flex con dirección de columna */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
/* El header y footer ocupan su altura natural */
header,
footer {
  flex-shrink: 0;
}
/* El main se expande para ocupar el espacio restante */
main {
  flex: 1;
}
</style>
