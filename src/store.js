import Vue from 'vue'
import Vuex from 'vuex'
import { Person, Member } from '@/data/models';
import { database as publicDatabase } from '../public/gramps.json';

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

    familyPatron ( state, getters ) {
      const patron = getOldestMalePerson( state.db );
      return patron ? new Member( patron, getters ) : undefined
    },

    memberById ( state, getters ) {
      return ( id ) => new Member( new Person(state.db.people.person.find( p => p.id === id )), getters )
    },

    personByHandle ( state ) {
      return ( handle ) => new Person(state.db.people.person.find( p => p.handle === handle ))
    },

    familyByHandle ( state ) {
      return ( handle ) => state.db.families.family.find( f => f.handle === handle )
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
        state.db = null;
      },

    loadPublicDatabase ( state ) {
        // const database = { header: 3, events: 100, people: 32, families: 80, danuek: 'winter' };
        state.db = publicDatabase;
      },

    loadDatabase ( state, database ) {
        state.db = database;
        // this.dispatch('queueInfo', 'db updated');
      },

  },

})
