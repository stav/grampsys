<template>
  <div class="d-flex">
      Grampsys
        <v-chip small class="ml-1" v-text="version.Grampsys" />
      <v-divider vertical class="mx-4" />
      Gramps
        <v-chip small class="ml-1" v-text="version.Gramps" />
        <v-chip small class="ml-1" v-text="version.date" />
  </div>
</template>

<script>
  const GRAMPSYS_VERSION = '2.1.5'

  export default {
    computed: {
      version () {
        return {
          Grampsys: GRAMPSYS_VERSION,
          Gramps: this.$store.state.db?.header?.created?.version,
          date: this.$store.state.db?.header?.created?.date,
        }
      }
    }
  }
</script>
