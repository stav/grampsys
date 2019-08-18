<template>
  <v-container>
    <v-timeline align-top dense>
      <v-timeline-item
        v-for="(person, i) in persons"
        :key="i"
        color="success lighten-1"
        icon="mdi-account"
        >
        <v-card :color="person._.gender === 'F' ? 'blue lighten-3' : 'red darken-3'">
          <v-card-title class="title">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="white--text headline"
                  v-text="person.name"
                />
                <v-expansion-panel-content
                  class="white secondary--text body-1 ma-2 pa-2"
                  v-text="person"
                />
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
      persons: Array,
    },
  }
</script>
