<template>
  <v-flex>

    <div class="family-tree">
      <v-btn large text icon class="ma-2" @click="clear" title="Clear">
        <v-icon large color="grey darken-1">mdi-close-circle-outline</v-icon>
      </v-btn>
      <v-btn color="secondary" class="grey--text text--lighten-1 mt-1" @click="reset"> Reset </v-btn>
    </div>

    <v-treeview dense rounded hoverable activatable color="primary"
      :items="items"
      @update:active="activate"
      >

      <template v-slot:prepend="{ item, open }">

        <v-icon>{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>

        <v-badge color="success" overlap title="descendants">
          <template v-slot:badge>
            <span v-text="item.desc" v-if="item.desc"></span>
          </template>
          <v-chip
            color="primary" text-color="white" title="Years since birth" class="ml-1"
            v-text="item.age"
            />
        </v-badge>

        <v-icon large color="grey" class="ml-1"
          v-text="item.type==='FAMILY' ? 'mdi-human-male-female' : 'mdi-account'"
        />

      </template>

      <template v-slot:label="{ item }">
        <span v-text="item.name" />
        <span v-text="item.id" class="ml-2 secondary--text text--lighten-1" title="Gramps Id" />
      </template>

    </v-treeview>

  </v-flex>
</template>

<script>

  export default {

    props: {
      items: Array,
    },

    methods: {
      activate ( id ) {
        this.$emit('activate-person', id);
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
</style>
