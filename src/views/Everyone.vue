<template>
  <Timeline
    :persons="people"
    title="Everyone"
    subtitle="All people in the database are included here"
    icon="mdi-playlist-star"
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
      people: people.all,
    }),
  }
</script>
