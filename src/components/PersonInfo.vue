<template>
  <v-flex xs12 md6>
    <div class="info-screen" v-show="activePerson">

      <InfoField label="Name"       :model="activePerson.name"   icon="mdi-account"/>
      <InfoField label="Birth Date" :model="activePerson.dob"    icon="mdi-calendar-today"/>
      <InfoField label="Age"        :model="activePerson.age"    icon="mdi-update"/>
      <InfoField label="Father"     :model="activePerson.father" icon="mdi-account"/>
      <InfoField label="Mother"     :model="activePerson.mother" icon="mdi-account"/>

       <v-card flat class="ma-2"
        v-for="(family, i) in activePerson.familys"
        :key="i"
        >
        <v-card-title>
          <InfoField
            :label="relation(family)"
            :model="spouse(activePerson, family).name"
            icon="mdi-human-male-female"
          />
        </v-card-title>
        <v-card-text v-if="family.children.length">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Children</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list nav rounded shaped>
                  <v-list-item v-for="(child, j) in family.children" :key="j">
                    <v-list-item-icon>
                      <v-icon>mdi-face</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="child.name"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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

  export default {

    components: {
      InfoField,
    },

    props: {
      activePerson: [Object, String],
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
    },

  }
</script>

<style>
  .info-screen {
    position: sticky;
    top: 7px;
  }
</style>
