<template>

  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="model"
    v-show="model"
    :append-icon="icon"
    prepend-icon="mdi-circle-small"
  ></v-text-field>

</template>

<script>

  export default {

    props: {
      label: String,
      model: [String, Number],
      icon: String,
    },

  }
</script>
