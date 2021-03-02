<template>
  <v-app dark>
    <v-app-bar app>
      <!-- logo image -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
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
    </v-app-bar>

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
          class="font-weight-light"
          absolute
          padless
        >
          <v-container>
            <v-row>
              <v-col md="8" offset-md="2">
                <v-row class="mx-16">
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">EXPLORE</p>
                    <p v-for="item in exploreMenu" :key="item.title">
                      <nuxt-link
                        :to="item.path"
                        style="
                          color: white;
                          text-decoration: none;
                          font-size: 12px;
                        "
                      >
                        {{ item.title }}</nuxt-link
                      >
                    </p>
                  </v-col>
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">HELP</p>
                    <p v-for="item in helpmenu" :key="item.title">
                      <nuxt-link
                        :to="item.path"
                        style="
                          color: white;
                          text-decoration: none;
                          font-size: 12px;
                        "
                      >
                        {{ item.title }}</nuxt-link
                      >
                    </p>
                    <p><v-spacer></v-spacer></p>
                  </v-col>
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">NEW</p>
                    <p v-for="item in newsmenu" :key="item.title">
                      <nuxt-link
                        :to="item.path"
                        style="
                          color: white;
                          text-decoration: none;
                          font-size: 12px;
                        "
                      >
                        {{ item.title }}</nuxt-link
                      >
                    </p>
                  </v-col>
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">
                      DEVELOPMENT
                    </p>
                    <p v-for="item in developmenu" :key="item.title">
                      <nuxt-link
                        :to="item.path"
                        style="
                          color: white;
                          text-decoration: none;
                          font-size: 12px;
                        "
                      >
                        {{ item.title }}</nuxt-link
                      >
                    </p>
                  </v-col>
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">ABOUT</p>
                    <p v-for="item in aboutmenu" :key="item.title">
                      <nuxt-link
                        :to="item.path"
                        style="
                          color: white;
                          text-decoration: none;
                          font-size: 12px;
                        "
                      >
                        {{ item.title }}</nuxt-link
                      >
                    </p>
                  </v-col>
                  <v-col col="1">
                    <p class="font-weight-bold" style="color: white">SOCIAL</p>
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
                <!-- Version and Data information -->
                <v-divider></v-divider>
                <v-col class="lighten-2 py-4 text-center" cols="12">
                  IRIS3 (v1.2.2) is developed by
                  <a class="BMBL" href="https://u.osu.edu/bmbl/">BMBL</a>, it is
                  free and open to all users. |
                  {{ new Date().getFullYear() }}
                </v-col>
                <login-dialog
                  :dialog.sync="loginDialog"
                  @close="loginDialog = false"
                ></login-dialog>
                <register-dialog
                  :dialog.sync="registerDialog"
                  @close="registerDialog = false"
                ></register-dialog>
              </v-col>
            </v-row>
          </v-container>
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
        {
          title: 'Pi chart',
          path: '/pichart',
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
        {
          title: 'Bar plot',
          path: '/barplot',
        },
        {
          title: 'Sanky plot',
          path: '/sankey',
        },
        {
          title: 'Regression curve',
          path: '/regression',
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
        {
          title: 'Clustering plot',
          path: '/clustering',
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
        {
          title: 'Heatmap',
          path: '/heatmap',
        },
        {
          title: 'Box plot',
          path: '/boxplot',
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
a.BMBL {
  color: black;
}
a.BMBL:hover {
  color: rgb(221, 6, 6);
}
.v-btn--active {
  -webkit-box-shadow: 0 -3px 0 #30588c inset;
  box-shadow: 0 -3px 0 #30588c inset;
}

.tcontainer {
  width: 100%;
  overflow: hidden;
}

.ticker-wrap {
  width: 100%;
  padding-left: 100%;
  background-color: #eee;
}

@keyframes ticker {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

.ticker-move {
  display: inline-block;
  white-space: nowrap;
  padding-right: 100%;
  animation-timing-function: linear;
  animation: ticker 40s infinite;
}

.ticker-move:hover {
  animation-play-state: paused;
}

.ticker-item {
  display: inline-block;
  padding: 0 40px;
  font-size: 20px;
}
</style>
