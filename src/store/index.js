import {createStore} from "vuex";

const store = createStore({
  state: {
    station_data:{}
  },
  mutations: {
    saveStationData(state,station_data){
      state.station_data = station_data
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
