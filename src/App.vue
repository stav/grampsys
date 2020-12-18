<template>
  <v-app id="inspire">

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <nav-item title="Home"     target="/"         :icon="mdiHome"           />
        <nav-item title="Tree"     target="/tree"     :icon="mdiAccountDetails" />
        <nav-item title="Timeline" target="/timeline" :icon="mdiPlaylistCheck"  />
        <nav-item title="Database" target="/database" :icon="mdiFolderAccount"  />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left collapse-on-scroll color="secondary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon to="/" title="Home"><v-icon v-text="mdiHome" /></v-btn>
      <v-toolbar-title :icon="mdiHome">
        <span class="white--text">Almeroth Family Tree</span>
      </v-toolbar-title>
      <v-spacer />
      <database-loader />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-footer app absolute>
      <span>&copy; 2020 Steven Almeroth</span>
      <v-spacer />
      <versions />
    </v-footer>

  </v-app>
</template>

<script>
  import NavItem from '@/components/NavItem'
  import Versions from '@/components/Versions'
  import DatabaseLoader from '@/components/DatabaseLoader'
  import { mdiHome, mdiAccountDetails, mdiPlaylistCheck, mdiFolderAccount } from '@mdi/js'
  import log from '@/data/log'

  export default {

    components: {
      versions: Versions,
      'nav-item': NavItem,
      'database-loader': DatabaseLoader,
    },

    data: () => ({
      drawer: null,
      mdiAccountDetails,
      mdiFolderAccount,
      mdiPlaylistCheck,
      mdiHome,
    }),

    created () {
      this.$vuetify.theme.dark = true;
      this.$store.dispatch('setupDatabase')
      log.store('App created: store:', this.$store)
    },

  }
</script>
