<template>
  <v-dialog scrollable max-width="500" v-model="loader">

    <template v-slot:activator="{ on }">
      <v-btn v-on="on" title="Load database" :color="appDatabaseEmpty ? 'primary' : 'secondary'">
        <v-icon v-text="mdiFolderAccount" />
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline accent" primary-title>
        <v-icon class="mr-2" v-text="mdiFolderAccount" />
        Load database
      </v-card-title>

      <v-card-text>
        <v-file-input
          id="datafile"
          v-model="file"
          label="Data File"
          @change="inquire()"
        ></v-file-input>
        <p v-text="datafile"></p>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success"
          @click="load()"
          :disabled="!datafile"
          >
          Load
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
  import { mdiFolderAccount } from '@mdi/js'
  // import log from '@/data/log';

  let reader = new FileReader();

  export default {

    data: () => ({
      file: [],
      datafile: '',
      loader: false,
      mdiFolderAccount,
    }),

    computed: {
      appDatabaseEmpty () {
        return this.$store.getters.appDatabaseEmpty
      },
    },

    methods: {
      inquire () {
        const self = this;
        reader.onload = ( e => { self.datafile = e.target.result} );
        if ( this.file ) {
          reader.readAsText(this.file)
        } else {
          self.datafile = '';
        }
      },
      load () {
        this.$store.dispatch('loadDataFile', this.datafile)
        // log.datafile('Database load: datafile')
        this.loader = false
      },
    },

  }
</script>
