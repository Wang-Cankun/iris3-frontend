<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">Tutorial</p>
        <ul>
          <li v-for="(item, idx) in countries" :key="idx">
            <div>Country: {{ item.name }}</div>
            <div>Capital: {{ item.capital }}</div>
          </li>
        </ul>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    countries: {
      prefetch: false,
      query: gql`
        {
          countries {
            name
            capital
          }
        }
      `,
    },
  },
  data() {
    return {
      eg1: 1,
      countries: '',
    }
  },
}
</script>
