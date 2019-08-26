<template>
  <v-container>
    <v-timeline align-top dense>
      <v-timeline-item color="success lighten-1" icon="mdi-account"
        v-for="(node, i) in nodes" :key="i"
        >
        <v-card :color="color(node)">
          <v-card-title class="title">
            <v-expansion-panels class="pb-2">
              <v-expansion-panel>
                <v-expansion-panel-header class="headline white--text" v-text="node.name" />
                <v-expansion-panel-content class="white secondary--text body-1 ma-2 pa-2" v-text="node" />
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-title>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
  export default {

    props: {
      nodes: Array,
    },

    methods: {
      color ( node ) {
        switch ( node._.gender ) {
          case 'F':
            return 'blue lighten-3'
          case 'M':
            return 'red darken-3'
          default:
            return ''
        }
      },
    },

  }
</script>
