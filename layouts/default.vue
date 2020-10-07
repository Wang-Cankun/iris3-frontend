<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <img
            width="150px"
            max-width="150px"
            height="40px"
            max-height="40px"
            class="mt-2"
            src="img/iris3_logo_v2.png"
          />
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only mx-1">
        <v-btn v-for="item in menuLeft" :key="item.title" :to="item.path" text>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchJobId"
        solo-inverted
        flat
        clearble
        hide-details
        label="Search Job ID"
        type="search"
        prepend-inner-icon="mdi-magnify"
        class="shrink"
      />

      <v-toolbar-items class="hidden-xs-only mx-5">
        <v-btn v-if="searchJobId" color="primary" clearable> Search</v-btn>
        <template v-if="isAuthenticated">
          <v-btn to="/profile" text>
            <v-icon left dark>mdi-face</v-icon>
            My Profile
          </v-btn>
          <v-btn text @click="logout">
            <v-icon left dark>mdi-lock-open</v-icon>
            Logout
          </v-btn>
        </template>
        <template v-else>
          <v-btn to="/register" text>
            <v-icon left dark>mdi-account-plus</v-icon>
            Sign up
          </v-btn>
          <v-btn to="/login" text>
            <v-icon left dark>mdi-lock-open</v-icon>
            Sign in
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      color="primary"
      app
      inset
      absolute
      class="font-weight-light"
      heigth="200"
      width="auto"
      padless
    >
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>

        <v-col class="primary lighten-4 py-4 text-center white--text" cols="12">
          Get connected with us on social networks!

          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-col>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          IRIS3 is developed by <a href="https://u.osu.edu/bmbl/">BMBL</a>, it
          is free and open to all users. | {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Snackbar from '../components/utils/SnackBar'
export default {
  components: {
    snackbar: Snackbar,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      searchJobId: '',
      menuLeft: [
        {
          title: 'Start',
          path: '/submit',
        },
        {
          title: 'Public data',
          path: '/public',
        },
        {
          title: 'Tutorial',
          path: '/tutorial',
        },
        {
          title: 'FAQ',
          path: '/FAQ',
        },
        {
          title: 'About',
          path: '/contact',
        },
      ],
      links: [
        'Video',
        'Publication',
        'Roadmap',
        'Team',
        'Github',
        'Fundings',
        'Contact us',
      ],
      icons: [
        'mdi-google',
        'mdi-facebook',
        'mdi-twitter',
        'mdi-youtube',
        'mdi-github',
      ],
      title: 'IRIS3',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      this.$notifier.showMessage({
        content: 'Logged out.',
        color: '',
      })
      await this.$auth.logout()
    },
  },
}
</script>

<style scoped>
.v-btn--active {
  -webkit-box-shadow: 0 -3px 0 #30588c inset;
  box-shadow: 0 -3px 0 #30588c inset;
}
</style>
