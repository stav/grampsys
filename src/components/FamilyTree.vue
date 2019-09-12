<template>
  <v-flex>

    <div class="family-tree">

      <v-btn large text icon @click="clear" title="Clear">
        <v-icon large color="grey darken-1">mdi-close-circle-outline</v-icon>
      </v-btn>

      <v-btn large text icon @click="reset" title="Reset">
        <v-icon large color="grey darken-1">mdi-folder-sync-outline</v-icon>
      </v-btn>

      <v-btn large text icon @click="$refs.treeview.updateAll(true)" title="Open All">
        <v-icon large color="grey darken-1">mdi-folder-open-outline</v-icon>
      </v-btn>

      <v-btn large text icon @click="$refs.treeview.updateAll(false)" title="Close All">
        <v-icon large color="grey darken-1">mdi-folder-outline</v-icon>
      </v-btn>

    </div>

    <v-card class="mx-auto">

      <v-sheet class="pa-4 primary">
        <v-text-field flat clearable solo-inverted hide-details
          v-model="search"
          label="Search Company Directory"
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>

      <v-card-text>
        <v-treeview dense rounded hoverable color="primary"
          ref="treeview"
          :active="active"
          :items="items"
          :search="search"
          :open.sync="open"
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
            <div>
              <div v-if="item.type==='INDIVIDUAL'">
                <span v-text="item.name" @click.stop="activate(item.id)" />
                <span v-text="item.id" class="ml-2 secondary--text text--lighten-1" title="Gramps Id" />
              </div>
              <div v-if="item.type==='FAMILY'">
                <v-card class="d-flex flex-wrap">

                  <v-btn outlined color="red" class="mr-1"
                    @click.stop="activate(item.father.id)"
                    :title="item.father.name"
                    v-if="item.father"
                    >
                    <v-icon left>mdi-face</v-icon>
                    {{ item.father.name }}
                  </v-btn>

                  <v-btn outlined color="blue" class="mr-1"
                    @click.stop="activate(item.mother.id)"
                    :title="item.mother.name"
                    v-if="item.mother"
                    >
                    <v-icon left>mdi-face-woman</v-icon>
                    {{ item.mother.name }}
                  </v-btn>

                  <span v-text="item.id" class="ml-2 secondary--text text--lighten-1" title="Gramps Id" />
                </v-card>
              </div>
            </div>
          </template>

        </v-treeview>
      </v-card-text>
    </v-card>

  </v-flex>
</template>

<script>

  export default {

    props: {
      items: Array,
    },

    data: () => ({
      open: [],
      active: [],
      search: null,
    }),

    methods: {
      activate ( id ) {
        this.active = [ id ];
        this.$emit('activate-person', this.active );
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
