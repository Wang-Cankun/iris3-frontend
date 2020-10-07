<template>
  <v-container>
    <v-row class="my-6">
      <!-- Header Text -->
      <v-row>
        <p class="text-h4 text-center">
          IRIS3: Integrated Cell-type-specific Regulon Inference Server from
          Single-cell sequencing data
        </p>
      </v-row>
    </v-row>

    <!-- three buttons -->
    <v-row class="my-6" justify="space-between">
      <v-btn
        to="/submit"
        color="primary"
        rounded
        height="100"
        width="300"
        x-large
        >new project</v-btn
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

    <v-row class="my-6">
      <v-col>
        <!-- Display window  -->
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="auto"
        >
          <v-carousel-item>
            <v-img max-width="500" src="img/abstract_workflow.jpg"></v-img>
          </v-carousel-item>
          <v-carousel-item
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img max-width="500" src="img/workflow2.png"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col>
        <!-- Intro Card  -->
        <v-card class="mb-6" height="300" outlined shaped
          ><v-card-title>
            What is cell-type-specific regulon?
          </v-card-title>
          <v-card-text>
            IRIS3 (Integrated Cell-type-specific Regulon Inference Server from
            Single-cell RNA-Seq) is an integrated web server for
            cell-type-specific regulon(CTSR) prediction from Human or Mouse
            Single-cell RNA-Seq data. We reasoned that a CTSR can be used to
            reliably characterize and distinguish the corresponding cell type
            from the others and holds the ability to be combined with other
            computational or experimental analyses for biomedical studies. These
            CTSRs can aid in the elucidation of regulatory mechanisms and allow
            reliable constructions of global transcriptional regulation networks
            encoded in a specific cell type.
          </v-card-text>
        </v-card>
        <v-card height="320" outlined shaped
          ><v-card-title>The unique features of IRIS3</v-card-title>
          <v-card-text>
            (1) It is an all-in-one framework that provides for CTSR
            identification, incorporating biclustering for cell-type-specific
            gene module detection and de novo motif prediction for potential
            novel regulons discovery; (2) It provides informative regulon
            interpretations in support of the in-depth analysis of heterogeneous
            regulatory mechanisms; (3) It is equipped with a user-friendly web
            interface that requires no programming knowledge, with a simple
            submission process, comprehensive scRNA-Seq data analysis
            functionalities, and highly-interactive visualizations. (4) It
            substantially improves the elucidation of regulatory mechanisms and
            allows reliable constructions of global transcriptional regulation
            networks encoded in a specific cell type.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- News  -->
    <v-row class="my-6">
      <v-col lg="12">
        <v-card outlined height="220" shaped>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                <p class="text-h5">
                  NEWS
                </p>
              </div>
              <!-- THe most updated news add here -->

              <v-list-item-title class="headline mb-1">
                5/2/2020
              </v-list-item-title>
              <v-list-item-subtitle
                >The manuscript IRIS3: Integrated Cell-type-specific Regulon
                Inference Server from Single-cell RNA-Seq has been officially
                accepted by Nucleic Acids Research!</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              ><v-img src="img/news-icon.jpg"></v-img
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text>
              More+
            </v-btn>
          </v-card-actions></v-card
        >
      </v-col>
    </v-row>

    <!-- Changing logs  -->
    <v-row class="my-6">
      <v-col lg="12">
        <v-card outlined height="360" shaped>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                <p class="text-h5">
                  CHANGING LOGS
                </p>
              </div>
              <!-- THe most recent updates add here -->
              <v-list-item-title class="headline mb-1">
                8/3/2020 v1.2.5
              </v-list-item-title>
              <v-list-item-subtitle
                >Added citaion in the notification email.</v-list-item-subtitle
              >
              <v-list-item-title class="headline mt-4 mb-1">
                7/28/2020 v1.2.4
              </v-list-item-title>
              <v-list-item-subtitle
                >Fixed errors when users upload 10X un-filtered matrix (~730k
                cells).</v-list-item-subtitle
              >

              <v-list-item-title class="headline mt-4 mb-1">
                7/8/2020 v1.2.3
              </v-list-item-title>
              <v-list-item-subtitle
                >Fixed errors when users upload cell label file without
                headers.</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Fixed errors when users upload cell label file with numeric row
                names generated in R.</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Added more options in the selection box on submit
                page.</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar
              ><v-img src="img/update-icon.jpg"></v-img
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text>
              More+
            </v-btn>
          </v-card-actions></v-card
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
    return {}
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
