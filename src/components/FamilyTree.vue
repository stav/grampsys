<template>
  <v-flex>

    <v-btn large text icon class="ma-2" @click="clear" title="Clear">
      <v-icon large color="grey darken-1">mdi-close-circle-outline</v-icon>
    </v-btn>
    <v-btn color="secondary" class="grey--text text--lighten-1 mt-1" @click="reset"> Reset </v-btn>

    <v-treeview dense rounded hoverable activatable color="primary"
      :items="items"
      @update:active="activate"
      >

      <template v-slot:prepend="{ item, open }">

        <v-icon>
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>

        <v-chip
          color="secondary" text-color="white" title="Generation"
          >{{ item.gen }}
        </v-chip>

        <v-badge color="success" overlap title="descendants">
          <template v-slot:badge>
            <span v-text="item.desc" v-if="item.desc"></span>
          </template>
          <v-chip
            color="primary" text-color="white" title="Years since birth"
            >{{ item.age }}
          </v-chip>
        </v-badge>

        <v-icon large color="grey">mdi-account</v-icon>

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
  .v-treeview-node {
    margin-top: 20px;
  }
  .v-treeview {
    position: sticky;
    top: 7px;
  }
</style>
