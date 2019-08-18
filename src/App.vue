<template>
  <v-app id="inspire">

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense>
        <NavItem title="Home"     target="/"         icon="mdi-home"           />
        <NavItem title="Tree"     target="/tree"     icon="mdi-account-details"/>
        <NavItem title="Timeline" target="/timeline" icon="mdi-playlist-check" />
        <NavItem title="Unknown"  target="/unknown"  icon="mdi-playlist-edit"  />
        <NavItem title="Everyone" target="/everyone" icon="mdi-playlist-star"  />
        <NavItem title="Database" target="/database" icon="mdi-folder-account" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left collapse-on-scroll color="secondary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon to="/" title="Home"><v-icon>mdi-home</v-icon></v-btn>
      <v-toolbar-title icon="mdi-home">
        <span class="white--text">Almeroth Family Tree</span>
      </v-toolbar-title>
      <v-spacer/>
      <DatabaseLoader/>
    </v-app-bar>

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>

  </v-app>
</template>

<script>
  import NavItem from '@/components/NavItem'
  import DatabaseLoader from '@/components/DatabaseLoader'
  import log from '@/data/log';

  export default {

    components: {
      NavItem,
      DatabaseLoader,
    },

    data: () => ({
      drawer: null,
    }),

    created () {
      this.$vuetify.theme.dark = true;

      // if ( this.$store.getters.databaseEmpty ) {
      //   this.$store.dispatch('seekDatabase')
      //   log.store('App created get:', this.$store)
      // }
    },

  }
</script>
