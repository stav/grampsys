<template>
  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="localModel"
    v-show="localModel"
    :append-icon="icon"
    :append-outer-icon="closeIcon"
    :prepend-icon="mdiArrowLeftBold"
    @click:prepend="root"
    @click:append-outer="clearActivePerson"
  ></v-text-field>
</template>

<script>
  import { mdiArrowLeftBold, mdiCloseCircle } from '@mdi/js'

  export default {

    props: {
      label: String,
      model: [Object, String],
      icon: String,
      id: String,
    },

    data: () => ({
      mdiArrowLeftBold,
      mdiCloseCircle,
    }),

    computed: {
      localModel () {
        return this.model
      },
      closeIcon () {
        return this.label === 'Name' ? mdiCloseCircle : null
      },
    },

    methods: {
      root () {
        this.$emit('root-person', this.id)
      },
      clearActivePerson () {
        this.$store.commit('activatePerson', '')
      }
    }

  }
</script>
