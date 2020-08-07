<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title width="300px" class="mr-5">
        <router-link to="/" tag="span" style="cursor: pointer;">
          <span class="app-bar-title display-1">{{ title }}</span>
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
        <v-btn v-for="item in menuRight" :key="item.title" :to="item.path" text>
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
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
  </v-app>
</template>

<script>
export default {
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
      menuRight: [
        {
          icon: 'mdi-face',
          title: 'Sign Up',
          path: '/signup',
        },
        {
          icon: 'mdi-lock-open',
          title: 'Sign In',
          path: '/signin',
        },
      ],
      title: 'IRIS3',
    }
  },
}
</script>

<style scoped>
.v-btn--active {
  -webkit-box-shadow: 0 -2px 0 #3740ff inset;
  box-shadow: 0 -2px 0 #3740ff inset;
}
</style>
