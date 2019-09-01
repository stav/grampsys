<template>
  <v-card>

    <v-tabs icons-and-text v-model="currentTab">
      <v-tab href="#tab-1"> Dated    <v-icon>mdi-playlist-check</v-icon></v-tab>
      <v-tab href="#tab-2"> Unknown  <v-icon>mdi-playlist-edit </v-icon></v-tab>
      <v-tab href="#tab-3"> Everyone <v-icon>mdi-playlist-star </v-icon></v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item v-for="tab in tabs" :key="tab.index" :value="'tab-' + tab.index">
        <v-card flat>
          <v-card-title>{{ tab.text }}</v-card-title>
          <v-card-text>
            <Timeline :nodes="tab.people"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </v-card>
</template>

<script>
  import Timeline from '@/components/Timeline'

  function dateObject ( year ) {
    return {
      _: {},
      dob: ''+year,
      name: year,
    }
  }

  export default {

    components: {
      Timeline
    },

    props: {
      tab: String,
    },

    data: () => ({
      currentTab: null,
    }),

    computed: {
      bornPeople () {
        if ( this.$store.getters.bornPeople.length ) {
          const dates_old = [...Array(16)].map( (_,i) => dateObject( i * 10 + 1840 ) );
          const dates_new = [...Array(20)].map( (_,i) => dateObject( i + 2000 ) );
          const dates = [...dates_old, ...dates_new];
          const people = this.$store.getters.bornPeople;
          return [ ...dates, ...people ].sort( (a, b) => a.dob > b.dob )
        }
        else
          return []
      },
      tabs () {
        return [
          {index: 1, people: this.bornPeople                 , text: 'A chronological listing of family members with a known birthdate, or at least a birth year'},
          {index: 2, people: this.$store.getters.unbornPeople, text: 'A chronological listing of family members without a known birthdate'},
          {index: 3, people: this.$store.getters.allPeople   , text: 'A chronological listing of all family members'},
        ]
      },
    },

    mounted () {
      if ( this.tab )
        this.currentTab = this.tab;
    },

  }
</script>
