<template>

  <v-list-item :to="target">

    <v-list-item-action>
      <v-icon v-text="icon"></v-icon>
    </v-list-item-action>

    <v-list-item-content color="white">
      <v-list-item-title v-text="title"></v-list-item-title>
    </v-list-item-content>

  </v-list-item>

</template>

<script>

  export default {

    props: {
      target: String,
      title: String,
      icon: String,
    },

  }
</script>
