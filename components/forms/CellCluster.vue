<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined hover>
          <v-row>
            <v-col cols="2">
              <v-card class="mt-6" outlined hover color="blue-grey lighten-5">
                <p class="subtitle-1 font-weight-bold text-center">
                  Cell clustering Prarmeters
                </p>
                <div v-if="idents != ''">
                  <p class="subtitle-2 text--primary mx-4">
                    Set Cell Identity for CTSR identification:
                  </p>
                  <v-autocomplete
                    v-model="currentIdent"
                    class="ml-4"
                    :items="idents"
                    label="Select identity"
                  ></v-autocomplete>
                </div>
                <p class="ml-4 title-h4">
                  Number of dimensions
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Determine the ‘dimensionality’ of the dataset, the top
                      principal components represent a robust compression of the
                      dataset. Default: 20.
                    </p>
                  </v-tooltip>
                </p>
                <v-text-field
                  v-model="nPCs"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">
                  Resolution
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Resolution for clustering in Seurat (form 0-1). Larger
                      number will generate more clusters and smaller number will
                      generate less clusters. Default: 0.5.
                    </p>
                  </v-tooltip>
                </p>
                <v-text-field
                  v-model="resolution"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row justify="center">
                  <v-btn
                    class="ma-2"
                    color="Primary"
                    width="200"
                    rounded
                    @click="runCellCluster()"
                    >Update</v-btn
                  >
                </v-row>
                <!--
                <div v-if="clusterResult !== ''">
                  <p class="ml-4 title-h4">
                    Bicluster overlap rate
                  </p>
                  <v-text-field
                    v-model="qubic_f"
                    class="px-6"
                    outlined
                    background-color="white"
                  ></v-text-field>
                  <p class="ml-4 title-h4">
                    Maximum bicluster number
                  </p>
                  <v-text-field
                    v-model="qubic_o"
                    class="px-6"
                    outlined
                    background-color="white"
                  ></v-text-field>
                  <p class="ml-4 title-h4">
                    Minimum cell number
                  </p>
                  <v-text-field
                    v-model="qubic_k"
                    class="px-6"
                    outlined
                    background-color="white"
                  ></v-text-field>
                  <p class="ml-4 title-h4">
                    Motif finding upstream promoter region
                  </p>
                  <v-text-field
                    v-model="promoter_length"
                    class="px-6"
                    outlined
                    background-color="white"
                  ></v-text-field>
                  <v-row justify="center">
                    <v-btn
                      color="Primary"
                      width="300"
                      rounded
                      @click="runQubic()"
                      >Run CTSR identification</v-btn
                    >
                  </v-row>
                </div>
                -->
              </v-card></v-col
            >
            <v-col cols="9">
              <div v-if="clusterResult !== ''">
                <p>Number of clusters: {{ clusterResult.n_seurat_clusters }}</p>
                <grid-layout
                  :layout.sync="layout"
                  :col-num="6"
                  :row-height="300"
                  :is-draggable="true"
                  :is-resizable="true"
                  :is-mirrored="false"
                  :vertical-compact="true"
                  :margin="[10, 10]"
                  :use-css-transforms="true"
                >
                  <resize-image
                    :key="layout[0].i"
                    :x="layout[0].x"
                    :y="layout[0].y"
                    :w="layout[0].w"
                    :h="layout[0].h"
                    :i="layout[0].i"
                    :imagew="700"
                    :imageh="550"
                    :src="umapCluster"
                    :title="layout[0].title"
                  >
                  </resize-image>
                  <v-card class="ma-0"
                    ><grid-item
                      :x="layout[1].x"
                      :y="layout[1].y"
                      :w="layout[1].w"
                      :h="layout[1].h"
                      :i="layout[1].i"
                      class="grid-item-border"
                    >
                      <v-card-title
                        class="primary white--text caption px-2 py-1"
                        >Differntial expression testing <v-spacer></v-spacer>
                        <v-menu bottom left>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn dark icon v-bind="attrs" v-on="on">
                              <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item @click="downloadPDF">
                              <v-list-item-title
                                >Download Table</v-list-item-title
                              >
                            </v-list-item>
                          </v-list>
                        </v-menu></v-card-title
                      >
                      <v-row
                        ><v-col cols="6">
                          <v-autocomplete
                            v-model="ident1"
                            class="ml-4"
                            :items="identList"
                            label="Ident1"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <v-autocomplete
                            v-model="ident2"
                            class="ml-4"
                            :items="identList"
                            label="Ident1"
                          ></v-autocomplete> </v-col
                      ></v-row>
                      <v-row>
                        <v-col cols="6">
                          <p class="ml-4 mb-0 title-h4">
                            Min cell pct
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <p>
                                Only test genes that are detected in a minimum
                                fraction of min.pct cells in either of the two
                                populations. Meant to speed up the function by
                                not testing genes that are very infrequently
                                expressed. Default is 0.2
                              </p>
                            </v-tooltip>
                            <v-text-field
                              v-model="minPct"
                              class="px-0"
                              outlined
                              background-color="white"
                            ></v-text-field>
                          </p>
                        </v-col>
                        <v-col cols="6" class="ma-0">
                          <p class="ml-4 mb-0 title-h4">
                            LogFC threshold
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <p>
                                Limit testing to genes which show, on average,
                                at least X-fold difference (log-scale) between
                                the two groups of cells. Default is 0.25
                                Increasing logfc.threshold speeds up the
                                function, but can miss weaker signals.
                              </p>
                            </v-tooltip>
                            <v-text-field
                              v-model="minLfc"
                              class="px-0"
                              outlined
                              background-color="white"
                            ></v-text-field>
                          </p>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mx-2 mb-2 mt-0">
                        <v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          width="200"
                          rounded
                          @click="runDeg()"
                          >Update</v-btn
                        >
                      </v-row>
                      <v-data-table
                        dense
                        :headers="headers"
                        :items="deResult"
                        item-key="name"
                        :items-per-page="5"
                        class="elevation-1"
                      ></v-data-table></grid-item
                  ></v-card>
                </grid-layout>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    layout: [
      {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
        i: '0',
        title: 'UMAP plot',
      },
      {
        x: 3,
        y: 0,
        w: 2,
        h: 2,
        i: '1',
        title: 'DE testing',
      },
    ],
    degList: [
      {
        gene: 'gene1',
        avg_logFC: 2,
        p_val_adj: 0.01,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
    ],
    headers: [
      {
        text: 'Gene',
        align: 'start',
        sortable: false,
        value: 'gene',
      },
      { text: 'LogFC', value: 'avg_logFC' },
      { text: 'Adj.p.value', value: 'p_val_adj' },
    ],
    tab: null,
    title: '',
    nPCs: '20',
    resolution: '0.5',
    qubic_f: '0.7',
    qubic_o: '500',
    qubic_k: '20',
    promoter_length: '1000',
    timeElapsed: 0,
    qcResult: null,
    umapCluster: '',
    umapGene: '',
    violinGene: '',
    clusterResult: '',
    gene: '',
    genes: '',
    currentIdent: 'seurat_clusters',
    idents: '',
    resHistory: [],
    ident1: 1,
    ident2: 2,
    minPct: 0.2,
    minLfc: 0.8,
    deResult: [],
  }),
  computed: {
    identList() {
      if (this.currentIdent === 'cell_type') {
        return [
          '1_oligodendrocytes',
          '2_pyramidal_CA1',
          '3_pyramidal_SS',
          '4_microglia',
          '5_interneurons',
          '6_endothelial_mural',
          '7_astrocytes_ependymal',
        ]
      } else if (this.clusterResult !== '')
        return Array.from(
          { length: this.clusterResult.n_seurat_clusters },
          (_, index) => index + 1
        )
      else return [1, 2]
    },
  },
  methods: {
    async runCellCluster() {
      this.$notifier.showMessage({
        content: 'Running clustering...',
        color: 'accent',
      })
      if (!this.resHistory.includes(this.resolution)) {
        await this.$axios
          .post('iris3/api/queue/cluster/', {
            nPCs: this.nPCs,
            resolution: this.resolution,
          })
          .then((response) => {
            const checkComplete = setInterval(async () => {
              await this.$axios
                .get('iris3/api/queue/' + response.data.id)
                .then((response) => {
                  if (response.data.returnvalue !== null) {
                    this.resHistory.push(this.resolution)
                    this.clusterResult = response.data.returnvalue
                    clearInterval(checkComplete)
                  }
                })
            }, 2000)
          })
          .catch((error) => {
            console.log({ error })
            this.$notifier.showMessage({
              content: 'Clustering error!',
              color: 'error',
            })
          })
      }

      await this.$axios
        .post('iris3/api/queue/set-idents/', {
          name: this.currentIdent,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                // this.currentIdent = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Get idents error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/umap-cluster/')
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.umapCluster = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Cell Clustering success!',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Cell UMAP error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/umap-gene/', {
          gene: this.gene,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.umapGene = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot UMAP error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/violin-gene/', {
          gene: this.gene,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                this.violinGene = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Variable genes error!',
            color: 'error',
          })
        })

      await this.$axios.post('iris3/api/queue/genes/').then((response) => {
        this.genes = response.data
      })
      await this.$axios.post('iris3/api/queue/idents/').then((response) => {
        this.idents = response.data
      })
    },
    async runDeg() {
      this.deResult = []
      await this.$axios
        .post('iris3/api/queue/deg/', {
          ident1: this.ident1,
          ident2: this.ident2,
          min_pct: this.minPct,
          min_lfc: this.minLfc,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.deResult = response.data.returnvalue[0]
                  console.log('runDeg -> this.deResult', this.deResult)

                  clearInterval(checkComplete)
                }
                if (++i === 10) {
                  clearInterval(checkComplete)
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Calculate QC metrics error: ' + error,
            color: 'error',
          })
        })
      this.$notifier.showMessage({
        content: 'Start DE testing!',
        color: 'accent',
      })
    },
    runQubic() {
      this.$notifier.showMessage({
        content: 'Start CTSR identification!',
        color: 'accent',
      })
    },
  },
}
</script>
