<template>
  <v-app dark>
    <v-app-bar app>
      <!-- logo image -->
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

      <!-- dropdown menu -->
      <v-toolbar-items class="hidden-xs-only mx-1">
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">
              Explore
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in exploremenu"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">
              Help
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in helpmenu"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">
              News
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in newsmenu"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">
              Development
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in developmenu"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">
              About
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in aboutmenu"
              :key="item.title"
              :to="item.path"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
      width="auto"
      padless
    >
      <v-row class="mx-16">
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">EXPLORE</p>
          <p v-for="item in exploremenu" :key="item.title">
            <nuxt-link
              :to="item.path"
              style="color: white; text-decoration: none;"
            >
              {{ item.title }}</nuxt-link
            >
          </p>
        </v-col>
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">HELP</p>
          <p v-for="item in helpmenu" :key="item.title">
            <nuxt-link
              :to="item.path"
              style="color: white; text-decoration: none;"
            >
              {{ item.title }}</nuxt-link
            >
          </p>
          <p><v-spacer></v-spacer></p>
        </v-col>
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">NEWS</p>
          <p v-for="item in newsmenu" :key="item.title">
            <nuxt-link
              :to="item.path"
              style="color: white; text-decoration: none;"
            >
              {{ item.title }}</nuxt-link
            >
          </p>
        </v-col>
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">DEVELOPMENT</p>
          <p v-for="item in developmenu" :key="item.title">
            <nuxt-link
              :to="item.path"
              style="color: white; text-decoration: none;"
            >
              {{ item.title }}</nuxt-link
            >
          </p>
        </v-col>
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">ABOUT</p>
          <p v-for="item in aboutmenu" :key="item.title">
            <nuxt-link
              :to="item.path"
              style="color: white; text-decoration: none;"
            >
              {{ item.title }}</nuxt-link
            >
          </p>
        </v-col>
        <v-col col="2">
          <p style="color: white; font-family: Fantasy;">SOCIAL</p>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon dark left>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        IRIS3 (Version V1.2.2) is developed by
        <a href="https://u.osu.edu/bmbl/">BMBL</a>, it is free and open to all
        users. | {{ new Date().getFullYear() }}
      </v-col>
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
      exploremenu: [
        {
          title: 'scRNA-Seq',
          path: '/submit',
        },
        {
          title: 'Multiple scRNA-Seq',
          path: '/submit',
        },
        {
          title: 'scRNA-Seq and scATAC-Seq',
          path: '/submit',
        },
        {
          title: 'Public IRIS3 projects',
          path: '/public',
        },
        {
          title: 'Search',
          path: '/search',
        },
      ],
      helpmenu: [
        {
          title: 'Tutorial',
          path: '/tutorial',
        },
        {
          title: 'Video',
          path: '/video',
        },
        {
          title: 'FAQ',
          path: '/FAQ',
        },
        {
          title: 'User group',
          path: '/usergroup',
        },
      ],
      newsmenu: [
        {
          title: 'News',
          path: '/news',
        },
        {
          title: 'Changing logs',
          path: '/changinglogs',
        },
      ],
      developmenu: [
        {
          title: 'Roadmap',
          path: '/roadmap',
        },
        {
          title: 'Team',
          path: '/team',
        },
        {
          title: 'Collaboration',
          path: '/collaboration',
        },
        {
          title: 'Github',
          path: '/github',
        },
      ],
      aboutmenu: [
        {
          title: 'Publication',
          path: '/publication',
        },
        {
          title: 'Contact',
          path: '/contact',
        },
        {
          title: 'Acknowledgement',
          path: '/acknowledgement',
        },
      ],
      icons: ['mdi-github', 'mdi-youtube', 'mdi-twitter'],
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
