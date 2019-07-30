<template>

    <v-flex>
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
          <span v-text="item.name"></span>
          <span v-text="item.id" class="ml-2 secondary--text text--lighten-1" title="Gramps Id"></span>
        </template>

      </v-treeview>
    </v-flex>

</template>

<script>

  import log from '@/data/log';

  export default {

    props: {
      items: Array,
    },

    methods: {
      activate ( ids ) {
        this.$emit('activate-person', ids);
      },
    },

    created () {
      log.datafile('* FamilyTree created: datafile')
    },

    // beforeMount () {
    //   log.db('  Tree beforeMount: db', db)
    // },

    // mounted () {
    //   log.db('  Tree mounted: db', db)
    // },

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
