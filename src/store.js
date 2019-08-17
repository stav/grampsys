import Vue from 'vue'
import Vuex from 'vuex'
import { Person, Member } from '@/data/models';
import { database as db } from '../public/gramps.json';

Vue.use(Vuex)

function getOldestMalePerson ( vuexdb ) {
  if ( !vuexdb ) return;
  const
    people = vuexdb.people.person,
    mapped = people.map( person => new Person(person) ),
    soborn = mapped.filter( person => person.dob ),
    sorted = soborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) );

  return sorted[0]
}

export default new Vuex.Store({

  state: {

    db: null,

  },

  getters: {

    databaseEmpty ( state ) {
      return state.db === null
    },

    familyPatron ( state ) {
      const patron = getOldestMalePerson( state.db );
      return patron ? new Member( patron ) : undefined
    }

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
