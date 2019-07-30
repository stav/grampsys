<template>
  <Timeline
    :persons="people"
    title="Timeline"
    subtitle="Only people with a known birth date or at least a birth year are included"
    icon="mdi-playlist-check"
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
      people: People.born,
    }),
  }
</script>
