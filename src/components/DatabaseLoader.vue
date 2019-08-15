<template>

  <v-dialog scrollable max-width="500" v-model="database">

    <template v-slot:activator="{ on }">
      <v-btn v-on="on" title="Load database" v-show="databaseEmpty">
        <v-icon>mdi-folder-account</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline accent" primary-title>
        <v-icon class="mr-2">mdi-folder-account</v-icon>
        Load database
      </v-card-title>

      <v-card-text>
        <v-file-input
          id="datafile"
          v-model="file"
          label="Data File"
          @change="inquire()"
        ></v-file-input>
        <p v-text="datafileCandidate"></p>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success"
          @click="load()"
          :disabled="!datafileCandidate"
          >
          Load
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>

</template>

<script>
  import log from '@/data/log';

  let reader = new FileReader();

  export default {

    data: () => ({
      datafileCandidate: '',
      datafile: '',
      file: [],
      database: false,
    }),

    computed: {
      databaseEmpty () {
        return this.$store.getters.databaseEmpty
      },
    },

    methods: {
      inquire () {
        const self = this;
        reader.onload = ( e => { self.datafileCandidate = e.target.result} );
        if ( this.file ) {
          reader.readAsText(this.file)
        } else {
          self.datafileCandidate = '';
        }
      },
      load () {
        this.datafile = this.datafileCandidate
        localStorage.setItem('datafile', this.datafile)
        log.datafile('Database load: datafile')
        this.database = false
      },
    },

    created () {
      log.store('Database created:', this.$store)
    },

  }
</script>
