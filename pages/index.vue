<template>
  <v-row align="center" class="mt-12 mx-6">
    <v-col
      cols="5"
      offset="1"
      class="d-flex flex-column justify-start align-left"
    >
      <p class="text-h2 black--text font-weight-bold text-no-wrap">
        Welcome to DeepMAPS
      </p>

      <p class="text-h6 font-weight-medium mt-6">
        Deep learning based Multi-omics Analysis Portal for Single cells
      </p>
      <v-spacer />
      <v-row class="my-6">
        <v-col cols="4"
          ><v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 8 : 2">
              <v-card-title class="primary--text">View workspaces</v-card-title>
              <v-card-text
                style="overflow-y: auto; height: 12em"
                class="body-1 font-weight-regular"
              >
                <p>
                  Workspaces connect your data to private projects powered by
                  the cloud. Use Workspaces to save data, code, and results
                  easily and securely.
                </p>
              </v-card-text>
              <v-card-actions class="mx-2">
                <v-spacer /><a class="text-decoration-none" href="projects"
                  ><v-btn text>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="
                          d-flex
                          transition-fast-in-fast-out
                          v-card--reveal
                        "
                        style="height: 100%"
                      >
                        Open
                      </div>
                    </v-expand-transition>
                    <v-icon color="primary" size="2em"
                      >mdi-arrow-right</v-icon
                    ></v-btn
                  >
                </a>
              </v-card-actions>
            </v-card></v-hover
          ></v-col
        >
        <v-col cols="4"
          ><v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 8 : 2">
              <v-card-title class="primary--text">View Examples</v-card-title>
              <v-card-text
                style="overflow-y: auto; height: 12em"
                class="body-1 font-weight-regular"
              >
                <p>
                  Browse our gallery of showcase datasets to see DeepMAPS
                  functions.
                </p>
              </v-card-text>
              <v-card-actions class="mx-2">
                <v-spacer /><a class="text-decoration-none" href="projects"
                  ><v-btn text>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="
                          d-flex
                          transition-fast-in-fast-out
                          v-card--reveal
                        "
                        style="height: 100%"
                      >
                        Open
                      </div>
                    </v-expand-transition>
                    <v-icon color="primary" size="2em"
                      >mdi-arrow-right</v-icon
                    ></v-btn
                  >
                </a>
              </v-card-actions>
            </v-card></v-hover
          ></v-col
        >
        <v-col cols="4"
          ><v-hover v-slot="{ hover }">
            <v-card :elevation="hover ? 8 : 2">
              <v-card-title class="primary--text">Browse data</v-card-title>
              <v-card-text
                style="overflow-y: auto; height: 12em"
                class="body-1 font-weight-regular"
              >
                <p>Access all public datasets collected in DeepMAPS.</p>
              </v-card-text>
              <v-card-actions class="mx-2">
                <v-spacer /><a class="text-decoration-none" href="projects"
                  ><v-btn text>
                    <v-expand-transition>
                      <div v-if="hover" class="d-flex" style="height: 100%">
                        Open
                      </div>
                    </v-expand-transition>
                    <v-icon color="primary" size="2em"
                      >mdi-arrow-right</v-icon
                    ></v-btn
                  >
                </a>
              </v-card-actions>
            </v-card></v-hover
          ></v-col
        >
      </v-row>

      <p class="text-h6 font-weight-regular mt-6">
        <a href="tutorial" class="text-decoration-none">
          Find how-to's, documentation, video tutorials, and discussion forums
          <v-icon color="primary" size="1.2em">mdi-open-in-new</v-icon>
        </a>
      </p>
      <v-row class="mt-6">
        <v-col cols="9">
          <span class="justify-left font-weight-bold">Cite us: </span>
          <a
            href="https://doi.org/10.1093/nar/gkaa394"
            target="_blank"
            class="text-decoration-none black--text"
          >
            {{ citeus }} <v-icon size="1.2em">mdi-open-in-new</v-icon>
          </a>
        </v-col></v-row
      >
    </v-col>
    <v-col
      cols="4"
      offset="1"
      class="d-flex flex-column justify-space-around align-left"
    >
      <v-row>
        <v-col cols="6"
          ><v-card height="24em" elevation="1" background-color="grey lighten-5"
            ><v-img contain src="img/abstract1.jpg"></v-img> </v-card
        ></v-col>
        <v-col cols="6"
          ><v-card height="24em" elevation="1"
            ><v-img contain src="img/abstract2.png"></v-img></v-card
        ></v-col>
        <v-col cols="6"
          ><v-card elevation="1">
            <v-carousel
              cycle
              height="12em"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-row class="fill-height" align="center" justify="center">
                  <v-col cols="6" align="right" justify="center"
                    ><v-icon color="primary" size="5em">
                      {{ slide.icon }}</v-icon
                    ></v-col
                  >
                  <v-col cols="6">
                    <p class="text-h3 my-0">
                      {{ slide.number }}
                    </p>
                    <p class="text-h5 my-0">{{ slide.name }}</p>
                  </v-col>
                </v-row>
                <template v-if="slide.name !== 'jobs running'">
                  <p class="text-body-1 px-2" align="right">
                    as of
                    {{ currentDate }}
                  </p>
                </template>
              </v-carousel-item>
            </v-carousel></v-card
          ></v-col
        >
        <v-col cols="6">
          <v-card elevation="1">
            <client-only>
              <div
                style="overflow-y: auto; height: 12em"
                class="viewer_options"
              >
                <script
                  id="clustrmaps"
                  type="text/javascript"
                  src="//cdn.clustrmaps.com/map_v2.js?cl=2d78ad&w=a&t=tt&d=y6edmNGXh1CPbChW0tW9Ahz11iiWoeE4HDc-yFfav5Y&cmo=3acc3a&cmn=ff5353&ct=1565C0&co=ffffff"
                ></script>
              </div> </client-only></v-card
        ></v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchJobId: '',
      email: '',
      password: '',
      slides: [
        { number: '1.1M', name: 'cells', icon: 'mdi-circle-double' },
        { number: '12', name: 'tissues', icon: 'mdi-brain' },
        { number: '19', name: 'projects', icon: 'mdi-clipboard-list-outline' },
        { number: '6', name: 'jobs running', icon: 'mdi-calendar-check' },
      ],

      citeus:
        'Ma, A., et al. (2020). IRIS3: integrated cell-type-specific regulon inference server from single-cell RNA-Seq, Nucleic Acids Research, gkaa394',
    }
  },
  computed: {
    bannerMessage() {
      const ver = this.$store.getters.appVersion
      return `DeepMAPS v${ver} is currently under development. Please let us know if there are any bugs, issues, or suggestions via qin.ma@osumc.edu.`
    },
    currentDate() {
      const date = new Date()
      return `${date.toLocaleString('en-us', {
        month: 'short',
      })} ${date.getDate()} ${date.getFullYear()} `
    },
  },
  mounted() {
    this.$notifier.showAlert({ content: this.bannerMessage, color: 'accent' })
  },
  methods: {
    showSnackbar(msg, col) {
      this.$notifier.showMessage({ content: msg, color: col })
    },
  },
  head() {
    return {
      title: 'DeepMAPS',
      meta: [
        {
          hid: 'DeepMAPS',
          name: 'DeepMAPS',
          content:
            'Deep learning based Multi-omics Analysis Portal for Single cells',
        },
      ],
    }
  },
}
</script>

<style scoped>
#tsparticles {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
}
</style>
