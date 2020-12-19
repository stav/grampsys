<template>
  <v-card>
    <v-toolbar>
      <v-btn large text icon @click="clear" title="Clear">
        <v-icon large color="grey darken-1" v-text="mdiCloseCircleOutline" />
      </v-btn>

      <v-btn large text icon @click="reset" title="Reset">
        <v-icon large color="grey darken-1" v-text="mdiFolderSyncOutline" />
      </v-btn>

      <v-btn large text icon @click="$refs.treeview.updateAll(true)" title="Open All">
        <v-icon large color="grey darken-1" v-text="mdiFolderOpenOutline" />
      </v-btn>

      <v-btn large text icon @click="$refs.treeview.updateAll(false)" title="Close All">
        <v-icon large color="grey darken-1" v-text="mdiFolderOutline" />
      </v-btn>

      <v-text-field flat clearable solo-inverted hide-details
        v-model="search"
        label="Search"
        :clear-icon="mdiCloseCircleOutline"
      ></v-text-field>
    </v-toolbar>

    <v-treeview dense rounded hoverable color="primary"
      ref="treeview"
      :active="active"
      :items="items"
      :search="search"
      :open.sync="open"
      >
      <!-- Arrow is not customized -->

      <!-- Folder icon, age chip, descendants badge -->
      <template v-slot:prepend="{ item, open }">
        <v-icon>{{ open ? mdiFolderOpen : mdiFolder }}</v-icon>
        <family-person :item="item" />
      </template>

      <!-- Names & Id -->
      <template v-slot:label="{ item }">
        <span
          v-if="item.type==='INDIVIDUAL'"
          v-text="item.name"
          @click.stop="activate(item.id)"
        />
        <span
          v-if="item.type==='FAMILY'"
        >
          <v-btn outlined color="red" class="mr-1"
            @click.stop="activate(item.father.id)"
            :title="item.father.name"
            v-if="item.father"
            >
            <v-icon left v-text="mdiFace" /> {{ item.father.name }}
          </v-btn>

          <v-btn outlined color="blue" class="mr-1"
            @click.stop="activate(item.mother.id)"
            :title="item.mother.name"
            v-if="item.mother"
            >
            <v-icon left v-text="mdiFaceWoman" /> {{ item.mother.name }}
          </v-btn>
        </span>
        <span v-text="item.id" class="ml-2 secondary--text text--lighten-1" title="Gramps Id" />
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
  import {
    mdiAccount,
    mdiCloseCircleOutline,
    mdiFace,
    mdiFaceWoman,
    mdiFolder,
    mdiFolderOpen,
    mdiFolderOpenOutline,
    mdiFolderOutline,
    mdiFolderSyncOutline,
    mdiHumanMaleFemale,
  } from '@mdi/js'
  import FamilyPerson from '@/components/FamilyPerson'

  export default {

    components: {
      'family-person': FamilyPerson,
    },

    props: {
      items: Array,
    },

    data: () => ({
      mdiAccount,
      mdiCloseCircleOutline,
      mdiFace,
      mdiFaceWoman,
      mdiFolder,
      mdiFolderOpen,
      mdiFolderOpenOutline,
      mdiFolderOutline,
      mdiFolderSyncOutline,
      mdiHumanMaleFemale,
      open: [],
      active: [],
      search: null,
    }),

    methods: {
      activate ( id ) {
        this.active = [ id ];
        this.$store.dispatch('activatePerson', id)
      },
      clear () {
        this.$emit('root-clear');
      },
      reset () {
        this.$emit('root-reset');
      },
    },

  }
</script>

<style>
  .family-tree {
    position: sticky;
    top: -7px;
    z-index: 1;
  }
  .v-treeview-node {
    margin-top: 20px;
  }
  .v-treeview {
    position: sticky;
    top: 7px;
  }
  .v-treeview-node__label {
    cursor: pointer;
  }
</style>
