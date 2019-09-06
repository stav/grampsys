<template>
  <v-layout wrap>

    <FamilyTree :items="items" @activate-person="activate" @root-reset="reset" @root-clear="clear" />

    <v-divider vertical />

    <PersonInfo :activePerson="activePerson" @root-person="rootId" />

  </v-layout>
</template>

<script>

  import FamilyTree from '@/components/FamilyTree'
  import PersonInfo from '@/components/PersonInfo'

  function getMemberBranch( member ) {
    return {
      id: member.id,
      name: member.name,
      type: 'INDIVIDUAL',
      children: [...member.familys.map( family => getFamilyBranch( family ) )],
      familys: member.familys,
      gen: member.gen,
      age: member.age,
    }
  }

  function getFamilyBranch( family ) {
    const father = family.father ? family.father.name : '';
    const mother = family.mother ? family.mother.name : '';
    return {
      id: family.id,
      name: `${father}, ${mother}`,
      type: 'FAMILY',
      father: family.father,
      mother: family.mother,
      children: [...family.children.map( child => getMemberBranch( child ) )],
      familys: [],
      gen: family.gen,
      age: family.age,
    }
  }

  function* descendantsGenerator ( branch ) {
    if ( branch.id.startsWith('F') ) {
      yield branch.children.length;
    }
    for ( let child of branch.children ) {
      yield* descendantsGenerator( child );
    }
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  function setDescendants ( branch ) {
    branch.desc = [...descendantsGenerator( branch )].reduce( reducer, 0 )
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
        if ( ids.length && ids[0] && ids[0].startsWith('I') ) {
          this.activePerson = this.$store.getters.memberById( ids[0] );
        }
        else
          this.activePerson = '';
      },
      rootId ( id ) {
        this.rootRoots([{ id }])
      },
      rootFamily ( family ) {
        let branch = getFamilyBranch( family );
        setDescendants( branch )
        this.items.push( branch )
      },
      rootFamilyId ( root ) {
        const family = this.$store.getters.familyById( root.id );
        if ( family ) {
          this.root( getFamilyBranch( family ))
        }
      },
      rootPerson ( root ) {
        const patron = this.$store.getters.memberById( root.id );
        if ( patron ) {
          this.root( getMemberBranch( patron ))
        }
      },
      rootRoots ( roots ) {
        for ( let root of roots ) {
          if ( root.id.startsWith('I') )
            this.rootPerson( root );
          else
            this.rootFamilyId( root );
        }
      },
      root ( branch ) {
        setDescendants( branch )
        this.items.push(  branch )
      },
      clear () {
        this.items = [];
      },
      reset () {
        const getters = this.$store.getters;
        this.clear()

        if ( getters.roots )
          this.rootRoots( getters.roots );

        else {
          this.rootFamily( this.$store.getters.oldestFamily )
        }

        if ( this.items.length === 0 && getters.familyPatronPerson )
          this.rootId( getters.familyPatronPerson.id );
      },
    },

    created () {
      this.reset()
    },

  }
</script>
