<template>
  <v-container
    fluid
    fill-height
    text-center
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logoA.png')"
          class="my-3"
          height="200"
          contain
          title="Logo ripped off from vuetifyjs.com"
        ></v-img>

        <h1 class="display-2 font-weight-bold mb-3">
          The Almeroth Family Tree
        </h1>

        <p class="subheading font-weight-regular">
          For updates and collaboration with other family members
          please send e-mail to
          <a href="mailto:steven.almeroth@gmail.com" target="_blank">
            Steven Michael</a>
        </p>

        <p>
          Check out
          <router-link to="/tree">the family tree</router-link> or
          <router-link to="/timeline">the timeline</router-link>
        </p>

      </v-flex>
    </v-layout>
  </v-container>
</template>
