import Vue from 'vue'
import Vuex from 'vuex'
import { Person, Member } from '@/data/models';
import { webStorageDatabaseFactory } from '@/data/browser';
import { database as publicDatabase } from '../public/gramps.json';

import log from '@/data/log';

Vue.use(Vuex)

function getOldestMalePerson ( db, events ) {
  if ( !db ) return;
  const
    people = db.people.person,
    mapped = people.map( person => new Person(person, events) ),
    soborn = mapped.filter( person => person.dob ),
    sorted = soborn.sort( (a, b) => ('' + a.dob).localeCompare(b.dob) );

  return sorted[0]
}

export default new Vuex.Store({

  state: {

    db: null,
    webStorageDatabase: '',

  },

  getters: {

    appDatabaseEmpty ( state ) {
      return state.db === null
    },

    publicDatabaseEmpty ( state ) {
      if (
        publicDatabase &&
        publicDatabase.events   && publicDatabase.events.event    && publicDatabase.events.event.length  &&
        publicDatabase.people   && publicDatabase.people.person   && publicDatabase.people.person.length &&
        publicDatabase.families && publicDatabase.families.family && publicDatabase.families.family.length
      ) return false;
      else return true
    },

    familyPatron ( state, getters ) {
      const patron = getOldestMalePerson( state.db, getters.events );
      return patron ? new Member( patron, getters ) : undefined
    },

    memberById ( state, getters ) {
      return ( id ) => new Member( new Person(state.db.people.person.find( p => p.id === id ), getters.events), getters )
    },

    personByHandle ( state, getters ) {
      return ( handle ) => new Person(state.db.people.person.find( p => p.handle === handle ), getters.events)
    },

    familyByHandle ( state ) {
      return ( handle ) => state.db.families.family.find( f => f.handle === handle )
    },

    allPeople ( state, getters ) {
      return (getters.appDatabaseEmpty ? [] : state.db.people.person)
        .map( person => new Person(person, getters.events) )
    },

    bornPeople ( state, getters ) {
      return getters.allPeople
        .filter( person => person.dob )
        .sort( (a, b) => ('' + a.dob).localeCompare(b.dob) )
    },

    unbornPeople ( state, getters ) {
      return getters.allPeople
        .filter( person => !person.dob )
    },

    /*
     * events
     *
     * Public file database events map with handle as the key
     *
     * Example list:
     *
     *   _dafb69389cc268ca202225bfa10 → { handle: "_dafb69389cc268ca202225bfa10", change: "1504833356", id: "E0000", … }
    ​​​ *   _dafb696950427b6635e0aacc420 → { handle: "_dafb696950427b6635e0aacc420", change: "1504833375", id: "E0001", … }
    ​​​ *   _dafb90107f5414a56ca26a1accd → { handle: "_dafb90107f5414a56ca26a1accd", change: "1504837429", id: "E0002", … }
    ​​​ *   _dafb9049f741c454ad0263d3851 → { handle: "_dafb9049f741c454ad0263d3851", change: "1538777118", id: "E0003", … }
     *
     * Example entry:
     *
     *   <key>:
     *    "_dafb69389cc268ca202225bfa10"
    ​​​​ *
     *   <value>:
     *    ​​​​​id: "E0000"
     *    ​​​​​type: "Birth"
     *    ​​​​​place: { hlink: "_dafb692976a7108efb419dd963" }
     *    ​​​​​handle: "_dafb69389cc268ca202225bfa10"
     *    ​​​​​change: "1504833356"
     *    ​​​​​dateval: { val: "1965-12-26" }
     */
    events ( state, getters ) {
      let event_map = new Map();
      const events = getters.appDatabaseEmpty ? [] : state.db.events.event;
      for (let event of events) {
        event_map.set(event.handle, event)
      }
      return event_map
    },

  },

  actions: {

    setupDatabase ({ getters, commit }) {
      const webStorageDb = webStorageDatabaseFactory();
      log.object('store setupDatabase: webStorageDb', webStorageDb)
      if ( webStorageDb ) {
        // Load web storage database
        commit('loadDatabase', webStorageDb)
      }
      else if ( !getters.publicDatabaseEmpty ) {
        // Load public database
        commit('loadPublicDatabase')
      }
      else {
        // We need to upload a database file
        console.log('No data found, click the upload button to upload a gramps JSON export')
      }
    },

    loadDataFile ( {commit}, datafile ) {
      let db = null;
      try {
        db = JSON.parse( datafile ).database;
      }
      catch (e) {
        console.log('store loadDataFile:', e, 'Cannot load datafile', datafile)
        return
      }
      commit('loadDatabase', db)
      commit('loadWebStorageDatabase', db)
      localStorage.setItem('datafile', datafile)
    },

  },

  mutations: {

    loadDatabase ( state, database ) {
      console.log('store loadDatabase: database', database)
      state.db = database;
      // this.dispatch('queueInfo', 'db updated');
    },

    clearDatabase ( state ) {
      state.db = null;
    },

    loadPublicDatabase ( state ) {
      console.log('store loadPublicDatabase: publicDatabase', publicDatabase)
      // const database = { header: 3, events: 100, people: 32, families: 80, danuek: 'winter' };
      state.db = publicDatabase;
    },

    loadWebStorageDatabase ( state , db) {
      console.log('store loadWebStorageDatabase: db', db)
      state.webStorageDatabase = db;
    },

    webStorageLoad ( state ) {
      const webStorageDb = webStorageDatabaseFactory();
      console.log('store webStorageLoad: webStorageDb', webStorageDb)
      if ( webStorageDb )
        state.db = webStorageDb;
    },

    webStorageClear ( state ) {
      state.webStorageDatabase = null;
      localStorage.removeItem('datafile')
    },

  },

})
