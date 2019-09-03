<template>
  <v-flex xs12 md6>
    <div class="info-screen" v-show="activePerson">

      <PersonField icon="mdi-account"        label="Name"         :model="activePerson.name" :id="activePerson.id" v-on:root-person="root" />
      <InfoField   icon="mdi-calendar-today" label="Birth Date"   :model="activePerson.dob"  />
      <InfoField   icon="mdi-calendar-today" label="Death Date"   :model="activePerson.dod"  />
      <InfoField   icon="mdi-update"         label="Age at Death" :model="activePerson.aad"  />
      <InfoField   icon="mdi-update"         label="Age"          :model="activePerson.age"  />
      <InfoField   icon="mdi-update"         label="Generation"   :model="activePerson.genx" />
      <PersonField icon="mdi-account"        label="Father"       :model="father.name"       :id="father.id"       v-on:root-person="root" />
      <PersonField icon="mdi-account"        label="Mother"       :model="mother.name"       :id="mother.id"       v-on:root-person="root" />

       <v-card flat class="ma-2"
        v-for="(family, i) in activePerson.familys" :key="i"
        >
        <v-card-title>
          <PersonField
            icon="mdi-human-male-female"
            :label="relation(family)"
            :model="spouse(activePerson, family).name"
            :id="spouse(activePerson, family).id"
            v-on:root-person="root"
          />
        </v-card-title>
        <v-card-text v-if="family.children.length">
          <v-list nav rounded shaped>
            <v-list-item v-for="(child, j) in family.children" :key="j">
              <v-list-item-content>
                <PersonField icon="mdi-face" label="Child" :model="child.name" :id="child.id" v-on:root-person="root" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

       <v-card flat class="ma-2">
        <v-card-text>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Data</v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="body-2 font-weight-light grey--text pa-4 text-center"
                  v-text="activePerson"
                ></p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>

    </div>
  </v-flex>
</template>

<script>

  import InfoField from '@/components/InfoField';
  import PersonField from '@/components/PersonField';

  export default {

    components: {
      InfoField,
      PersonField,
    },

    props: {
      activePerson: [Object, String],
    },

    computed: {
      father () {
        return this.activePerson.father||{}
      },
      mother () {
        return this.activePerson.mother||{}
      },
    },

    methods: {
      spouse ( member, family) { // TODO Relocate to models
        const
          handle = member._._.handle,  // TODO dunder
          father = family.father ? family.father.hlink : undefined,
          mother = family.mother ? family.mother.hlink : undefined,
          spouse = handle === father ? mother : father;
        if ( spouse ) {
          return this.$store.getters.personByHandle( spouse )
        }
        return {}
      },
      relation ( family ) {
        if ( family && family.rel && family.rel.type ) {
          if ( family.rel.type != 'Unknown' ) {
            return family.rel.type
          }
        }
        return 'Relation'
      },
      root ( id ) {
        this.$emit('root-person', id);
      },
    },

  }
</script>

<style>
  .info-screen {
    position: sticky;
    top: 7px;
  }
</style>
