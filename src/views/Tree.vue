<template>
  <v-layout wrap>

    <FamilyTree :items="items" v-on:activate-person="activate" v-on:root-person="root" />

    <v-divider vertical />

    <PersonInfo :activePerson="activePerson" v-on:root-person="root" />

  </v-layout>
</template>

<script>

  import FamilyTree from '@/components/FamilyTree'
  import PersonInfo from '@/components/PersonInfo'

  function getBranch( member, ancestor ) {
    member.gen = ancestor ? ancestor.gen + 1 : 0;  // TODO Can be in model?
    return {
      id: member.id,
      name: member.name,
      children: [...member.children.map( child => getBranch( child, member ) )],
      familys: member.familys,
      gen: member.gen,
      age: member.age,
    }
  }

  function* descendantsGenerator ( branch ) {
    yield branch.children.length;
    for ( let child of branch.children ) {
      yield* descendantsGenerator( child );
    }
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function setDescendants ( branch ) {
    branch.desc = [...descendantsGenerator( branch )].reduce( reducer )
    branch.children.map( leaf => setDescendants( leaf ) )
  }

  export default {

    components: {
      FamilyTree,
      PersonInfo,
    },

    data: () => ({
      activePerson: '',
      items: [],
    }),

    methods: {
      activate ( ids ) {
        this.activePerson = ids[0] ? this.$store.getters.memberById( ids[0] ) : ''
      },
      root ( id ) {
        const patron = this.$store.getters.memberById( id );
        let branch = {};
        if ( patron ) {
          branch = getBranch( patron );
          setDescendants( branch )
        }
        this.items = [ branch ]
      },
    },

    created () {
      if ( this.$store.getters.familyPatronPerson )
        this.root( this.$store.getters.familyPatronPerson.id )
    },

  }
</script>
