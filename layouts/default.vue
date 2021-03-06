<template>
  <v-app dark>
    <v-app-bar app>
      <!-- logo image -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="title">DeepMAPS</span>
        </router-link>
      </v-toolbar-title>

      <!-- dropdown menu -->
      <v-toolbar-items class="hidden-xs-only mx-1">
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on">Explore</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in exploreMenu"
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
            <v-btn v-bind="attrs" elevation="0" v-on="on"> Help </v-btn>
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
            <v-btn v-bind="attrs" elevation="0" v-on="on"> NEWS </v-btn>
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
            <v-btn v-bind="attrs" elevation="0" v-on="on"> Development </v-btn>
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

        <div v-show="false">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" elevation="0" v-on="on"> About</v-btn>
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
        </div>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only mx-5">
        <v-text-field
          v-model="searchJobId"
          solo-inverted
          flat
          clearable
          hide-details
          label="Search project ID"
          type="search"
          prepend-inner-icon="mdi-magnify"
          class="shrink mt-2"
        />
        <a
          v-if="searchJobId"
          class="text-decoration-none"
          :href="'submit/multiome/' + searchJobId"
          ><v-btn clearable color="primary" class="mt-3">Search</v-btn>
        </a>

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
          <v-btn text @click="openRegisterDialog">
            <v-icon left dark>mdi-account-plus</v-icon>
            Sign up
          </v-btn>
          <v-btn text @click="openLoginDialog">
            <v-icon left dark>mdi-lock-open</v-icon>
            Sign in
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <alert top></alert>
      <nuxt />
    </v-main>

    <!--footer start here-->

    <v-footer
      app
      inset
      class="font-weight-light grey lighten-3"
      absolute
      padless
    >
      <v-container fluid>
        <span>
          DeepMAPS (v{{ $store.getters.appVersion }}) is developed by
          <a class="text-decoration-none" href="https://u.osu.edu/bmbl/">BMBL</a
          >, it is free and open to all users. | {{ new Date().getFullYear() }}
        </span>
        <span v-for="icon in icons" :key="icon.name" icon>
          <a class="text-decoration-none" :href="icon.url" :target="icon.url"
            ><v-btn text
              ><v-icon color="primary" size="2em">{{
                icon.name
              }}</v-icon></v-btn
            ></a
          >
        </span>
      </v-container>
    </v-footer>
    <fab></fab>
    <login-dialog
      :dialog.sync="loginDialog"
      @close="loginDialog = false"
    ></login-dialog>
    <register-dialog
      :dialog.sync="registerDialog"
      @close="registerDialog = false"
    ></register-dialog>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import fab from '../components/utils/Fab'
import Snackbar from '../components/utils/SnackBar'
import Alert from '../components/utils/Alert'
import LoginDialog from '../components/utils/LoginDialog'
import RegisterDialog from '../components/utils/RegisterDialog'
export default {
  components: {
    alert: Alert,
    snackbar: Snackbar,
    'login-dialog': LoginDialog,
    'register-dialog': RegisterDialog,
    fab,
  },
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
      clipped: false,
      drawer: false,
      fixed: false,
      searchJobId: '',
      exploreMenu: [
        {
          title: 'New project',
          path: '/upload/single-rna',
        },
        {
          title: 'Browse projects',
          path: '/projects',
        },
      ],
      helpmenu: [
        {
          title: 'Tutorial',
          path: '/tutorial',
        },
        {
          title: 'FAQ',
          path: '/FAQ',
        },
      ],
      newsmenu: [
        {
          title: 'Changelog',
          path: '/changelog',
        },
      ],
      developmenu: [
        {
          title: 'Team',
          path: '/team',
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
      icons: [
        {
          name: 'mdi-github',
          url: 'https://github.com/OSU-BMBL',
        },
        {
          name: 'mdi-youtube',
          url: 'https://www.youtube.com/channel/UCgk6f-MU7sJ-_XqWEtDWBfg',
        },
        {
          name: 'mdi-twitter',
          url: 'https://twitter.com/QinMaBMBL',
        },
      ],
      title: 'DeepMAPS',
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
    this.socket.on('jobProgress', (msg) => {
      /* Handle event */
      console.log(msg)
      // this.progress = msg
    })
  },
  methods: {
    async logout() {
      this.$notifier.showMessage({
        content: 'Logged out.',
        color: 'success',
      })
      await this.$auth.logout()
    },
    openLoginDialog() {
      this.loginDialog = true
    },
    openRegisterDialog() {
      this.registerDialog = true
    },
    openJobUrl(url) {
      this.$router.push(`submit/multiome/${url}`)
    },
  },
}
</script>
