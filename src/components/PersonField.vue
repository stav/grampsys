<template>
  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="localModel"
    v-show="localModel"
    :append-icon="icon"
    :prepend-icon="mdiArrowLeftBold"
    @click:prepend="root"
  ></v-text-field>
</template>

<script>
  import { mdiArrowLeftBold } from '@mdi/js'

  export default {

    props: {
      label: String,
      model: [Object, String],
      icon: String,
      id: String,
    },

    data: () => ({
      mdiArrowLeftBold,
    }),

    computed: {
      localModel () {
        return this.model
      },
    },

    methods: {
      root () {
        this.$emit('root-person', this.id);
      }
    }

  }
</script>
