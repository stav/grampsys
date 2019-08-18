<template>
  <v-container fluid>

    <v-layout text-center wrap>
      <v-flex xs12>
        <v-icon x-large>mdi-folder-account</v-icon>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3"> Database </h1>
        <p> Database mogrification </p>
      </v-flex>
    </v-layout>

    <v-card class="mb-9" color="indigo darken-3">
      <v-card-title class="d-block mb-3 px-4 py-2 primary">
        App: Vuex Store
      </v-card-title>
      <v-card-text>
        <div class="mb-9 monospace" v-text="appStoreDatabase.header"></div>
        <v-slider label="Events"   v-model="appStoreDatabase.events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="People"   v-model="appStoreDatabase.people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="Families" v-model="appStoreDatabase.families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="warning" @click="appStoreDatabaseClear"> Clear </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-9">
      <v-card-title class="d-block mb-3 px-4 py-2 primary">
        Public File: <span class="monospace">gramps.json</span>
      </v-card-title>
      <v-card-text>
        <div class="mb-9 monospace" v-text="publicFileDatabase.header"></div>
        <v-slider label="Events"   v-model="publicFileDatabase.events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="People"   v-model="publicFileDatabase.people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="Families" v-model="publicFileDatabase.families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="publicFileDatabaseLoad"> Load </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mb-9">
      <v-card-title class="d-block mb-3 px-4 py-2 primary">
        Web Storage
      </v-card-title>
      <v-card-text>
        <div class="mb-9 monospace" v-text="webStorage"></div>
        <v-slider label="Events"   v-model="webStorage.events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="People"   v-model="webStorage.people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="Families" v-model="webStorage.families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
      </v-card-text>
      <v-card-actions>
        <v-btn>Click</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
  import dbFileHeader from '@/data'
  import publicFileEvents from '@/data/events'
  import people   from '@/data/people'
  import families from '@/data/families'

  import log from '@/data/log';

  function getWebStorage () {
    const datafile = localStorage.getItem('datafile');
    if ( datafile ) {
      const database = JSON.parse(datafile);
      if ( database ) {
        return database.database
      }
    }
  }

  const dbWebStorage = getWebStorage();

  export default {

    data: () => ({
      publicFileDatabase: {
        header: dbFileHeader,
        events: publicFileEvents.size,
        people: people.all.length,
        families: families.length,
      },
    }),

    computed: {
      appStoreDatabase () {
        const store = this.$store;
        // console.log('Database appStoreDatabase: store.state.db', store.getters.databaseEmpty, store.state.db)
        return {
          header:   store.getters.databaseEmpty ? 'empty' : store.state.db.header,
          events:   store.getters.databaseEmpty ? 0 : store.state.db.events.event.length,
          people:   store.getters.databaseEmpty ? 0 : store.state.db.people.person.length,
          families: store.getters.databaseEmpty ? 0 : store.state.db.families.family.length,
        }
      },
      max () {
        const
          db = this.publicFileDatabase,
          max = Math.max(
            db.events,
            db.people,
            db.families
          );
        return Math.ceil( max / 100 ) * 100
      },
      webStorage () {
        return {
          events: dbWebStorage ? dbWebStorage.events.event.length : 0,
          people: dbWebStorage ? dbWebStorage.people.person.length : 0,
          families : dbWebStorage ? dbWebStorage.families.family.length : 0,
        }
      },
    },

    methods: {
      appStoreDatabaseClear () {
        // console.log(this)
        this.$store.commit('clearDatabase')
      },
      publicFileDatabaseLoad () {
        // console.log(this)
        this.$store.commit('loadPublicDatabase')
      },
    },

    // created () {
    //   log.object('Database created: events', publicFileEvents)
    // },

  }
</script>

<style>
  .monospace {
    font-family: monospace;
  }
</style>
