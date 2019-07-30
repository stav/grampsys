<template>

  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="model"
    v-show="model"
    :append-icon="icon"
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
