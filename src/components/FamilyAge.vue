<template>
  <v-chip
    v-text="age"
    color="primary" text-color="white" title="Years since birth" class="ml-1"
  />
</template>

<script>
  export default {
    props: {
      age: Number,
    }
  }
</script>
