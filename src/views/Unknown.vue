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
  import people   from '@/data/people'

  export default {
    components: {
      Timeline
    },
    data: () => ({
      people: people.unborn,
    }),
  }
</script>
