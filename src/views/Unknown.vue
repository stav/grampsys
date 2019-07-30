<template>
  <Timeline
    :persons="people"
    title="Unknown"
    subtitle="People with no known date of birth"
    icon="mdi-playlist-edit"
  />
</template>

<script>
  import Timeline from '@/components/Timeline'
  import People   from '@/data/People'

  export default {
    components: {
      Timeline
    },
    data: () => ({
      people: People.unborn,
    }),
  }
</script>
