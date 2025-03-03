import { defineStore } from 'pinia'

export const useMenuStateInStore = defineStore('menuStateInStore', {
  state: () => {
    return { menuState: true }
  },
  actions: {
    changeMenuState(value) {
      this.menuState = value
    },
  },
})
