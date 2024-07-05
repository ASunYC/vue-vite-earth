import { createStore } from "vuex";

const store = createStore({
  state: {
    componentsVue: [],
  },
  mutations: {
    dis(state, guid) {
      state.componentsVue.forEach((item, index) => {
        if (item.guid == guid) {
          state.componentsVue.splice(index, 1)
        }
      })
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store
