<template>
  <v-container>
    <v-row>
      <!-- Header Text -->
      <v-row>
        <p class="text-h4 text-center">
          IRIS3: Integrated Cell-type-specific Regulon Inference Server from
          Single-cell sequencing data
        </p>
      </v-row>
    </v-row>

    <!-- three buttons -->
    <v-row justify="space-between">
      <v-btn
        to="/newproject"
        color="primary"
        rounded
        height="100"
        width="300"
        x-large
        >Create new project</v-btn
      >
      <v-btn
        to="/public"
        color="primary"
        rounded
        height="100"
        width="300"
        x-large
        >Public data</v-btn
      >
      <v-btn
        to="/tutorial"
        color="primary"
        rounded
        height="100"
        width="300"
        x-large
        >Tutorial</v-btn
      >
    </v-row>

    <!-- Display window  -->
    <v-row>
      <v-col lg="6">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Intro Card  -->
      <v-col lg="6">
        <v-card color="blue lighten-3" height="140"
          ><p class="title-h4 text-center">
            Single-cell and cell-type regulon (Intro)
          </p></v-card
        >
        <v-card color="white" height="20" outlined></v-card>
        <v-card color="blue lighten-3" height="140"
          ><p class="title-h4 text-center">IRIS3 functions (Intro)</p></v-card
        >
        <v-card color="white" height="25" outlined
          ><p class="text-left color:blue">
            # of submitted jobs
          </p></v-card
        >
        <v-card color="white" height="25" outlined
          ><p class="text-left color:blue">
            # of created projects
          </p></v-card
        >
        <v-card color="white" height="25" outlined
          ><p class="text-left color:blue">
            # of public data
          </p></v-card
        >
        <v-card color="white" height="25" outlined
          ><p class="text-left color:blue">
            # of visits
          </p></v-card
        >
      </v-col>
    </v-row>

    <!-- Others  -->
    <v-row>
      <v-col lg="12">
        <v-card color="blue lighten-3" height="140"
          ><p class="title-h4 text-center">
            News
          </p></v-card
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="12">
        <v-card color="blue lighten-3" height="140"
          ><p class="title-h4 text-center">
            Changing logs
          </p></v-card
        >
      </v-col>
    </v-row>
    <v-row>
      <v-layout justify-center align-center>
        <client-only>
          <div class="viewer_options">
            <script
              id="clustrmaps"
              type="text/javascript"
              src="//cdn.clustrmaps.com/map_v2.js?d=y6edmNGXh1CPbChW0tW9Ahz11iiWoeE4HDc-yFfav5Y&cl=ffffff&w=a"
            ></script>
          </div>
        </client-only>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }
  },
  methods: {
    showSnackbar(msg, col) {
      this.$notifier.showMessage({ content: msg, color: col })
    },
  },
  head() {
    return {
      title: 'IRIS3',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Integrated Cell-type-specific Regulon Inference Server from Single-cell RNA-Seq',
        },
      ],
    }
  },
}
</script>

<style scoped>
.viewer_options {
  width: 300px !important;
  max-width: 300px !important;
}
</style>
