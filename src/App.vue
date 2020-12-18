<template>
  <v-app id="inspire">

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <NavItem title="Home"     target="/"         :icon="mdiHome"           />
        <NavItem title="Tree"     target="/tree"     :icon="mdiAccountDetails" />
        <NavItem title="Timeline" target="/timeline" :icon="mdiPlaylistCheck"  />
        <NavItem title="Database" target="/database" :icon="mdiFolderAccount"  />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left collapse-on-scroll color="secondary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon to="/" title="Home"><v-icon v-text="mdiHome" /></v-btn>
      <v-toolbar-title :icon="mdiHome">
        <span class="white--text">Almeroth Family Tree</span>
      </v-toolbar-title>
      <v-spacer/>
      <DatabaseLoader/>
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
      Grampsys <v-chip small class="ml-1" v-text="version.Grampsys" />
      <v-divider vertical class="mx-4" />
      Gramps <v-chip small class="ml-1" v-text="version.Gramps" />
      <v-divider vertical class="mx-4" />
      Data <v-chip small class="ml-1" v-text="version.date" />
    </v-footer>

  </v-app>
</template>

<script>
  import NavItem from '@/components/NavItem'
  import DatabaseLoader from '@/components/DatabaseLoader'
  import { mdiHome, mdiAccountDetails, mdiPlaylistCheck, mdiFolderAccount } from '@mdi/js'
  import log from '@/data/log'

  export default {

    components: {
      NavItem,
      DatabaseLoader,
    },

    data: () => ({
      drawer: null,
      mdiAccountDetails,
      mdiFolderAccount,
      mdiPlaylistCheck,
      mdiHome,
    }),

    computed: {
      version () {
        return {
          Grampsys: '2.1.3',
          Gramps: this.$store.state.db?.header?.created?.version,
          date: this.$store.state.db?.header?.created?.date,
        }
      },
    },

    created () {
      this.$vuetify.theme.dark = true;
      this.$store.dispatch('setupDatabase')
      log.store('App created: store:', this.$store)
    },

  }
</script>
