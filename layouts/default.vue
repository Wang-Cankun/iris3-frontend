<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <img
            width="180px"
            max-width="180px"
            height="40px"
            max-height="40px"
            class="mt-2"
            src="img/iris3_logo_clip2.svg"
          />
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-xs-only mx-5">
        <v-btn v-for="item in menuLeft" :key="item.title" :to="item.path" text>
          <v-icon left dark>{{ item.icon }}</v-icon>
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
            Register
          </v-btn>
          <v-btn to="/login" text>
            <v-icon left dark>mdi-lock-open</v-icon>
            Login
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      app
      inset
      absolute
      class="font-weight-light"
      heigth="200"
      width="auto"
    >
      <v-col class="text-center" cols="12">
        IRIS3 is developed by <a href="https://u.osu.edu/bmbl/">BMBL</a>, it is
        free and open to all users. |
        {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import snackbar from '~/components/utils/Snackbar'
export default {
  components: {
    snackbar,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      searchJobId: '',
      menuLeft: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Submit',
          path: '/submit',
        },
        {
          icon: 'mdi-account-question',
          title: 'Tutorial',
          path: '/tutorial',
        },
        {
          icon: 'mdi-newspaper',
          title: 'News',
          path: '/news',
        },
        {
          icon: 'mdi-account-box',
          title: 'Contact',
          path: '/contact',
        },
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
