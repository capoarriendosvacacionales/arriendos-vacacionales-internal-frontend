<template>
  <!-- Renderiza header solo si el layout no es 'auth' -->
  <header v-if="$route.meta.layout !== 'auth'">
    <AvNavbar />
    <AvSidebar v-if="!menuState.menuState" />
  </header>

  <main class="app-background">
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
    return { menuState }
  },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
footer {
  flex-shrink: 0;
}

/* 🔹 Fondo global */
.app-background {
  flex: 1;
  background: linear-gradient(to bottom, #00bfff, #87cefa, #ffc400, #ffd700);
  background-attachment: fixed; /* 🔹 No se mueve al hacer scroll */
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
