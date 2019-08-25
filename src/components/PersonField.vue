<template>

  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="model.name"
    v-if="model.id"
    :append-icon="icon"
    prepend-inner-icon="mdi-arrow-left-bold"
    @click:prepend-inner="root"
  ></v-text-field>

</template>

<script>

  export default {

    props: {
      label: String,
      model: [Object, String],
      icon: String,
    },

    methods: {
      root () {
        this.$emit('root-person', this.model.id);
      }
    }

  }
</script>
