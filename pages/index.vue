<template>
  <v-container>
    <v-row>
      <v-col md="0" lg="1"></v-col>
      <v-row>
        <v-col sm="0" md="0" lg="1"></v-col>
        <v-col lg="10"
          ><img width="530px" src="img/iris3_logo_clip2.svg" />
          <p class="text-h5">
            Integrated Cell-type-specific Regulon ssss Inference Server from
            Single-cell RNA-Seq
          </p></v-col
        >
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="5">
          <img width="500px" src="img/abstract_workflow.jpg"
        /></v-col>
        <v-col lg="5">
          <v-layout column justify-center align-center>
            <v-flex class="text-xs-center" mt-3>
              <v-flex mb-5
                ><p class="title">Find your submitted job</p>
                <v-text-field
                  v-model="searchJobId"
                  width="400px"
                  solo-inverted
                  flat
                  clearble
                  hide-details
                  label="Search you job ID"
                  type="search"
                  prepend-inner-icon="mdi-magnify"
                  class="shrink"
                />
                <v-btn color="primary"> Search</v-btn></v-flex
              >
              <v-flex mb-5
                ><p class="title">New job</p>
                <p class="text-subtitle-1">
                  Submit your data to IRIS3 or check out the example result.
                </p>
                <v-btn to="/submit" color="primary"> Submit</v-btn></v-flex
              >
              <v-flex mb-5>
                <p class="title">Tutorial</p>
                <p class="text-subtitle-1">
                  New to IRIS3? Our detailed tutorial will guide you through the
                  process of using IRIS3.
                </p>
                <v-btn to="/tutorial" color="primary">
                  Learn more</v-btn
                ></v-flex
              >

              <v-flex mb-5
                ><p class="title">News</p>
                <p class="text-subtitle-1">
                  Posted: 8/27/2020
                </p>
                <p>
                  IRIS3 is online!
                </p>
                <v-btn to="/news" color="primary"> More changes</v-btn></v-flex
              >
            </v-flex>
          </v-layout></v-col
        ></v-row
      >
    </v-row>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchJobId: '',
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
