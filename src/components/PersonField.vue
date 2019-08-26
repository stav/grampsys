<template>

  <v-text-field readonly outlined shaped hide-details class="ma-2"
    :label="label"
    v-model="model"
    v-show="model"
    :append-icon="icon"
    prepend-icon="mdi-arrow-left-bold"
    @click:prepend="root"
  ></v-text-field>

</template>

<script>

  export default {

    props: {
      label: String,
      model: [Object, String],
      icon: String,
      id: String,
    },

    methods: {
      root () {
        this.$emit('root-person', this.id);
      }
    }

  }
</script>
