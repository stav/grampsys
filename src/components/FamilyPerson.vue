<template>
  <span>
    <v-badge color="success" overlap title="descendants" v-if="item.desc">
      <template v-slot:badge>
        <span v-text="item.desc"></span>
      </template>
      <family-age :age="item.age" />
    </v-badge>

    <family-age :age="item.age" v-else />

    <v-icon large color="grey" class="ml-1"
      v-text="item.type==='FAMILY' ? mdiHumanMaleFemale : mdiAccount"
    />
  </span>
</template>

<script>
  import FamilyAge from '@/components/FamilyAge'
  import {
    mdiAccount,
    mdiHumanMaleFemale,
  } from '@mdi/js'

  export default {

    components: {
      'family-age': FamilyAge,
    },

    props: {
      item: Object,
    },

    data: () => ({
      mdiAccount,
      mdiHumanMaleFemale,
    }),

  }
</script>
