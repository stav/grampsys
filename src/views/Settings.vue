<template>
  <v-container fluid>

    <v-layout text-center wrap>
      <v-flex xs12>
        <v-icon x-large>mdi-settings</v-icon>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3"> Settings </h1>
        <p> Database mogrification </p>
      </v-flex>
    </v-layout>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title v-text="header" class="mb-5" />
          <v-card-text>
            <v-slider label="Events"   v-model="events"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
            <v-slider label="People"   v-model="people"   :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
            <v-slider label="Families" v-model="families" :min="0" :max="max" readonly thumb-label="always" class="mt-3" />
          </v-card-text>
          <v-card-actions>
            <v-btn>Click</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import {header} from '@/data'
  import events   from '@/data/events'
  import people   from '@/data/people'
  import families from '@/data/families'

  export default {

    data: () => ({
      header: header(),
      events: events.size,
      people: people.all.length,
      families: families.length,
    }),

    computed: {
      max () {
        const max = Math.max( this.events, this.people );
        return Math.ceil( max / 100 ) * 100
      },
    },

  }
</script>
