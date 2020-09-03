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
                <span class="text-h5 text--primary">{{
                  loggedInUser.info.username
                }}</span>
              </p>
              <p>
                <span class="text-h5 text--primary">Info: </span>
                <span class="text-h5 text--primary">{{
                  loggedInUser.info.info
                }}</span>
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <p><span class="text-h5 text--primary">Public Jobs </span></p>
              <div class="d-flex flex-row">
                <v-card
                  v-for="(n, i) in loggedInUser.info.jobid_private.length"
                  :key="n"
                  class="mr-3"
                >
                  <v-hover v-slot:default="{ hover }" open-delay="0">
                    <v-card
                      :elevation="hover ? 2 : 0"
                      :class="{ 'on-hover': hover }"
                    >
                      <v-card-title primary-title>
                        ID: {{ loggedInUser.info.jobid_private[i] }}
                      </v-card-title>
                      <v-card-text>
                        <p class="my-2">
                          <span class="text--secondary">Species: </span>
                          <span class="text--primary">Human</span>
                        </p>
                        <p class="my-2">
                          <span class="text--secondary">Status: </span>
                          <span class="text--primary">Complete</span>
                        </p>
                        <span class="text--primary"
                          >Description message xxxxx
                        </span>
                      </v-card-text>
                      <v-card-actions>
                        <a
                          :href="
                            'https://bmbl.bmi.osumc.edu/iris3/results.php?jobid=' +
                            loggedInUser.exp
                          "
                          target="_blank"
                          style="text-decoration: none;"
                          ><v-btn color="secondary" text>Open</v-btn></a
                        >

                        <v-btn color="secondary" text>
                          Manage
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-card>
              </div>
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
  async asyncData({ store, error, params }) {
    try {
      await store.dispatch('user/fetchProfile')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'ERROR CODE 503, using async await for single motif',
      })
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      profile: (state) => state.user.profile,
    }),
  },
}
</script>
