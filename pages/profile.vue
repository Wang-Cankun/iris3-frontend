<template>
  <v-container>
    <section class="section">
      <v-row no-gutters align="start" justify="center">
        <v-col xs="12" md="12" lg="12">
          <v-card>
            <v-card-title class="text-h4 font-weight-regular">
              Profile
            </v-card-title>
            <v-card-text>
              <p>
                <span class="text-h5 text--primary">Email: </span>
                <span class="text-h5 text--primary">{{ profile.email }}</span>
              </p>
              <p>
                <span class="text-h5 text--primary">Name: </span>
                <span class="text-h5 text--primary"
                  >{{ profile.firstName }} {{ profile.lastName }}</span
                >
              </p>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  async fetch() {
    await this.$store.dispatch('fetchProfile', this.loggedInUser.email)
  },
  data() {
    return {
      email: '',
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      profile: (state) => state.profile,
    }),
    authData() {
      return this.$auth.getToken('local')
    },
  },
}
</script>
