<template>
  <v-row>
    <v-container>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-img class="white--text align-center" src="">
            <v-card-title class="justify-center">
              <h1 class="text-h1 black--text font-weight-bold text-no-wrap">
                <strong>DeepMAPS</strong>
              </h1>
            </v-card-title>

            <v-card-title class="justify-center">
              <div class="typewriter black--text font-italic">
                Deep learning based Multi-omics Analysis Portal for Single cells
              </div>
            </v-card-title>

            <!-- Data monitor section -->
            <v-row class="mt-2">
              <v-col cols="8" offset="2">
                <v-row class="text-center black--text font-weight-medium">
                  <v-col> Functions </v-col>
                  <v-col> Created Projects </v-col>
                  <v-col> Submitted jobs </v-col>
                  <v-col> Data source </v-col>
                </v-row>
                <v-row class="text-center primary--text">
                  <v-col> 20+ </v-col>
                  <v-col> 3 </v-col>
                  <v-col> 10 </v-col>
                  <v-col> 3 </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- Create your own project and explore -->
            <v-row class="mt-6 py-6">
              <v-col offset="2">
                <v-btn to="/upload" color="primary" elevation="2" x-large
                  >Create your own project</v-btn
                >
              </v-col>
              <v-col class="justify-center">
                <v-btn to="/public" outlined elevation="2" x-large
                  >Explore our projects</v-btn
                >
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-container>

    <!-- Search job ID section -->
    <v-container>
      <v-col cols="8" offset="2">
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="searchJobId"
              outlined
              clearable
              label="Search your job ID"
              type="search"
              prepend-inner-icon="mdi-magnify"
            />
          </v-col>
          <v-col class="ml-4">
            <v-btn color="primary" height="55">Search</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="justify-center">scRNA-Seq</v-card-title>
              <v-col>
                <v-row justify="center" class="mb-1">
                  <v-btn to="/submit/single-rna/example">Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn plain>Learn more</v-btn>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title class="justify-center"
                >Multiple scRNA-Seq</v-card-title
              >
              <v-col>
                <v-row justify="center" class="mb-1">
                  <v-btn to="/submit/multiple-rna/example">Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn plain>Learn more</v-btn>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title class="justify-center"
                >scRNA-Seq & scATAc-Seq</v-card-title
              >
              <v-col>
                <v-row justify="center" class="mb-1">
                  <v-btn to="/submit/multiome/example">Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn plain>Learn more</v-btn>
                </v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-container>

    <!-- image display window and sign in -->
    <v-container>
      <v-row>
        <v-col>
          <v-card outlined>
            <v-card-title class="justify-center test-h2 font-weight-bold"
              >Cite us</v-card-title
            >
            <v-card-text class="justify-center test-h4 font-weight-medium">{{
              citeus
            }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Visiting monitor -->
    <v-container>
      <v-col cols="2" offset="5">
        <client-only>
          <div class="viewer_options">
            <script
              id="clustrmaps"
              type="text/javascript"
              src="//cdn.clustrmaps.com/map_v2.js?cl=2d78ad&w=a&t=tt&d=y6edmNGXh1CPbChW0tW9Ahz11iiWoeE4HDc-yFfav5Y&co=ffffff&cmo=3acc3a&cmn=ff5353&ct=1565C0"
            ></script>
          </div>
        </client-only>
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchJobId: '',
      email: '',
      password: '',
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
      citeus:
        'Ma, A., et al. (2020). IRIS3: integrated cell-type-specific regulon inference server from single-cell RNA-Seq, Nucleic Acids Research, gkaa394',
    }
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
