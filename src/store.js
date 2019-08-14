import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    db: null,

  },

  getters: {

    databaseEmpty ( state ) {
      return state.db === null
    },

  },

  actions: {

    seekDatabase ({ commit }) {
      const
        datafile = localStorage.getItem('datafile'),
        database = JSON.parse(datafile);
      commit('loadDatabase', database.database)
    },

  },

  mutations: {

    loadDatabase ( state, database ) {
        state.db = database;
        // this.dispatch('queueInfo', 'db updated');
      },

  },

})
