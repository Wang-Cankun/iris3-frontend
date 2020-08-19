<template>
  <section class="section">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="text-center">My profile</h1>
      </v-flex>
      <div class="content">
        <p>
          <strong>Username:</strong>
          {{ loggedInUser.info.username }}
        </p>
        <p>
          <strong>Info:</strong>
          {{ loggedInUser.info.info }}
        </p>
        <p>
          <strong>Jobid:</strong>
          {{ loggedInUser.info.jobid }}
        </p>
      </div>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>
