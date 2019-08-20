<template>
  <v-container fluid>

    <v-card class="mb-9" color="indigo darken-3">
      <v-card-title class="d-block mb-3 px-4 py-2 primary">
        App: Vuex Store
      </v-card-title>
      <v-card-text>
        <div class="mb-9 monospace" v-text="appStoreDatabaseInfo.header"></div>
        <v-slider label="Events"   v-model="appStoreDatabaseInfo.events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="People"   v-model="appStoreDatabaseInfo.people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="Families" v-model="appStoreDatabaseInfo.families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
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
        <div class="mb-9 monospace" v-text="publicFileDatabaseInfo.header"></div>
        <v-slider label="Events"   v-model="publicFileDatabaseInfo.events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="People"   v-model="publicFileDatabaseInfo.people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
        <v-slider label="Families" v-model="publicFileDatabaseInfo.families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
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
  import { database as publicFileDatabase } from '../../public/gramps.json';

  // import log from '@/data/log';

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
      publicFileDatabaseInfo: {
        header:   publicFileDatabase.header,
        events:   publicFileDatabase.events.event.length,
        people:   publicFileDatabase.people.person.length,
        families: publicFileDatabase.families.family.length,
      },
    }),

    computed: {
      appStoreDatabaseInfo () {
        const
          db = this.$store.state.db,
          appDatabaseEmpty = this.$store.getters.appDatabaseEmpty;
        // console.log('Database appStoreDatabaseInfo: store.state.db', store.getters.appDatabaseEmpty, store.state.db)
        return {
          header:   appDatabaseEmpty ? 'empty' : db.header,
          events:   appDatabaseEmpty ?  0      : db.events.event.length,
          people:   appDatabaseEmpty ?  0      : db.people.person.length,
          families: appDatabaseEmpty ?  0      : db.families.family.length,
        }
      },
      max () {
        const
          pdb = this.publicFileDatabaseInfo,
          adb = this.appStoreDatabaseInfo,
          max = Math.max(
            pdb.events, pdb.people, pdb.families,
            adb.events, adb.people, adb.families,
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
