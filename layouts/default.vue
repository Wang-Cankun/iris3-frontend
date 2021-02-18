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
            <v-btn v-bind="attrs" elevation="0" v-on="on"> Explore </v-btn>
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

        <!-- <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" elevation="0" v-on="on"> News </v-btn>
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
        </v-menu> -->

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
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchJobId"
        solo-inverted
        flat
        clearable
        hide-details
        label="Search Job ID"
        type="search"
        prepend-inner-icon="mdi-magnify"
        class="shrink"
      />

      <v-toolbar-items class="hidden-xs-only mx-5">
        <v-btn
          v-if="searchJobId"
          color="primary"
          clearable
          @click="openJobUrl(searchJobId)"
        >
          Search</v-btn
        >
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

    <v-carousel show-arrows-on-hover height="200">
      <v-carousel-item>
        <p>this is news</p>
      </v-carousel-item>
    </v-carousel>

    <v-main>
      <nuxt />
    </v-main>

    <!--footer start here-->
    <div>
      <v-card>
        <v-footer
          color="primary"
          app
          inset
          absolute
          class="font-weight-light"
          width="70%"
          padless
        >
          <v-row class="mx-16">
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">EXPLORE</p>
              <p v-for="item in exploreMenu" :key="item.title">
                <nuxt-link
                  :to="item.path"
                  style="color: white; text-decoration: none; font-size: 12px;"
                >
                  {{ item.title }}</nuxt-link
                >
              </p>
            </v-col>
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">HELP</p>
              <p v-for="item in helpmenu" :key="item.title">
                <nuxt-link
                  :to="item.path"
                  style="color: white; text-decoration: none; font-size: 12px;"
                >
                  {{ item.title }}</nuxt-link
                >
              </p>
              <p><v-spacer></v-spacer></p>
            </v-col>
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">NEW</p>
              <p v-for="item in newsmenu" :key="item.title">
                <nuxt-link
                  :to="item.path"
                  style="color: white; text-decoration: none; font-size: 12px;"
                >
                  {{ item.title }}</nuxt-link
                >
              </p>
            </v-col>
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">DEVELOPMENT</p>
              <p v-for="item in developmenu" :key="item.title">
                <nuxt-link
                  :to="item.path"
                  style="color: white; text-decoration: none; font-size: 12px;"
                >
                  {{ item.title }}</nuxt-link
                >
              </p>
            </v-col>
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">ABOUT</p>
              <p v-for="item in aboutmenu" :key="item.title">
                <nuxt-link
                  :to="item.path"
                  style="color: white; text-decoration: none; font-size: 12px;"
                >
                  {{ item.title }}</nuxt-link
                >
              </p>
            </v-col>
            <v-col col="1">
              <p class="font-weight-bold" style="color: white;">SOCIAL</p>
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                icon
                dark
                left
              >
                <v-icon size="24px">
                  {{ icon }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-col
            class="primary lighten-2 py-4 text-center white--text rounded-b-xl"
            cols="12"
          >
            IRIS3 (v1.2.2) is developed by
            <a href="https://u.osu.edu/bmbl/">BMBL</a>, it is free and open to
            all users. | {{ new Date().getFullYear() }}
          </v-col>
          <login-dialog
            :dialog.sync="loginDialog"
            @close="loginDialog = false"
          ></login-dialog>
          <register-dialog
            :dialog.sync="registerDialog"
            @close="registerDialog = false"
          ></register-dialog>
        </v-footer>
      </v-card>
    </div>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Snackbar from '../components/utils/SnackBar'
import LoginDialog from '../components/utils/LoginDialog'
import RegisterDialog from '../components/utils/RegisterDialog'
export default {
  components: {
    snackbar: Snackbar,
    'login-dialog': LoginDialog,
    'register-dialog': RegisterDialog,
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
          title: 'scRNA-Seq',
          path: '/upload',
        },
        {
          title: 'Multiple scRNA-Seq',
          path: '/upload',
        },
        {
          title: 'scRNA-Seq and scATAC-Seq',
          path: '/upload',
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
    openLoginDialog() {
      this.loginDialog = true
    },
    openRegisterDialog() {
      this.registerDialog = true
    },
    openJobUrl(url) {
      this.$router.push(`submit/${url}`)
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
