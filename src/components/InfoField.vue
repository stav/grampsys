<template>
  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="localModel"
    v-show="localModel"
    :append-icon="icon"
    :prepend-icon="mdiCircleSmall"
  ></v-text-field>
</template>

<script>
  import { mdiCircleSmall } from '@mdi/js'

  export default {

    props: {
      label: String,
      model: [String, Number],
      icon: String,
    },

    data: () => ({
      mdiCircleSmall,
    }),

    computed: {
      localModel () {
        return this.model
      },
    },

  }
</script>
