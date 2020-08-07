<template>
  <v-layout column justify-center align-center>
    <v-flex class="text-xs-center" mt-5>
      <h1>Welcome to IRIS3</h1>
    </v-flex>
    <v-flex class="text-xs-center" mt-3>
      <blockquote class="blockquote text-xs-center">
        Integrated Cell-type-specific Regulon Inference Server from Single-cell
        RNA-Seq
      </blockquote>
    </v-flex>
    <v-flex sm6 class="text-xs-center" ma-5>
      <v-btn color="primary" to="/submit">Submit</v-btn>
      <v-btn color="secondary" to="/signup">Sign Up</v-btn>
      <v-btn to="/signin">Sign In</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: 'IRIS3',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Integrated Cell-type-specific Regulon Inference Server from Single-cell RNA-Seq',
        },
      ],
    }
  },
}
</script>
