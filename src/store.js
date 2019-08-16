import Vue from 'vue'
import Vuex from 'vuex'
import { database as db } from '../public/gramps.json';

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

    clearDatabase ( state ) {
        console.log('store clearDatabase: state.db', state.db)
        state.db = null;
      },

    loadPublicDatabase ( state ) {
        // const database = { header: 3, events: 100, people: 32, families: 80, danuek: 'winter' };
        state.db = db;
        console.log('store loadDatabase: state.db', state.db)
      },

    loadDatabase ( state, database ) {
        state.db = database;
        console.log('store loadDatabase: state.db', state.db)
        // this.dispatch('queueInfo', 'db updated');
      },

  },

})
