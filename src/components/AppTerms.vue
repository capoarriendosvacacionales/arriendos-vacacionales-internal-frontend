<template>
  <main>
    <AvSidebar v-if="!menuState.menuState" />
    <AvTerms />
  </main>
  <footer>
    <AvFooter />
  </footer>
</template>

<script>
import AvFooter from './AvFooter.vue'
import AvTerms from './AvTerms.vue'
import AvSidebar from './AvSidebar.vue'
import { useMenuStateInStore } from '@/stores/store'

export default {
  components: {
    AvTerms,
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

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>
