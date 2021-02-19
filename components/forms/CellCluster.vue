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
                  <scatter
                    :key="layout[0].i"
                    :x="layout[0].x"
                    :y="layout[0].y"
                    :w="layout[0].w"
                    :h="layout[0].h"
                    :i="layout[0].i"
                    :imagew="700"
                    :imageh="550"
                    :src="umapCluster"
                    :values="clusterResult.umap_pts"
                    :title="layout[0].title"
                  >
                  </scatter>
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
                            Min cell percent
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
                  <v-card class="ma-0"
                    ><grid-item
                      :x="layout[2].x"
                      :y="layout[2].y"
                      :w="layout[2].w"
                      :h="layout[2].h"
                      :i="layout[2].i"
                      class="grid-item-border"
                    >
                      <v-card-title
                        class="primary white--text caption px-2 py-1"
                        >Gene plots<v-spacer></v-spacer>
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
                            v-model="gene"
                            class="ml-4"
                            :items="genes"
                            label="Gene"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <div v-if="idents != ''">
                            <p class="subtitle-2 text--primary mx-4">
                              Split the violin plots by:
                            </p>
                            <v-autocomplete
                              v-model="violinSplit"
                              class="ml-4"
                              :items="violinSplitItems"
                              label="Select identity"
                            ></v-autocomplete>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mx-2 mb-2 mt-0">
                        <v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          width="200"
                          rounded
                          @click="runGenePlot()"
                          >Plot</v-btn
                        >
                      </v-row>
                      <v-row v-if="violinGene">
                        <img :src="violinGene" :width="400" :height="350" />
                        <img :src="featureGene" :width="400" :height="350" />
                      </v-row> </grid-item
                  ></v-card>
                  <v-card class="ma-0"
                    ><grid-item
                      :x="layout[3].x"
                      :y="layout[3].y"
                      :w="layout[3].w"
                      :h="layout[3].h"
                      :i="layout[3].i"
                      class="grid-item-border"
                    >
                      <v-card-title
                        class="primary white--text caption px-2 py-1"
                        >Cell type annotation<v-spacer></v-spacer>
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
                            v-model="currentIdent"
                            class="ml-4"
                            :items="idents"
                            label="Select cluster identity"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mx-2 mb-2 mt-0">
                        <v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          width="200"
                          rounded
                          @click="showDotPlot()"
                          >Show dot plot</v-btn
                        ><v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          rounded
                          @click="openMetadataDiaglog()"
                          >Annotate manually</v-btn
                        >
                        <v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          rounded
                          @click="openAddTransferMetadataDialog()"
                          >Map from reference</v-btn
                        >
                      </v-row>

                      <v-row v-if="dotPlot">
                        <!--
                        <v-row justify="center" class="mx-2 mb-2 mt-0">
                          Number of annotated cell type :
                          {{ annotateResult.n_annotate_cell_type }}
                        </v-row>
                        <v-row justify="center" class="mx-2 mb-2 mt-0">
                          Annotated cell type :
                          {{ annotateResult.annotate_cell_type }}
                        </v-row> -->
                        <img :src="dotPlot" :width="550" :height="400" />
                      </v-row> </grid-item
                  ></v-card>
                </grid-layout>
                <v-dialog v-model="addMetadataDialog" max-width="1200">
                  <v-card>
                    <v-card-title>Annotate cell type</v-card-title>
                    <v-divider class="my-2 py-2"></v-divider>
                    <v-card-text>
                      <v-row
                        class="my-0 py-0"
                        v-for="(item, index) in cellClusterArray"
                        :key="item.index"
                      >
                        <v-col class="my-0 py-0" cols="4"
                          >Cluster: {{ item.index }}
                        </v-col>
                        <v-col class="my-0 py-0" cols="6"
                          >Cell type:
                          <v-text-field
                            v-model="newCellType[index]"
                            outlined
                            background-color="white"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="mx-2"
                        color="primary"
                        dark
                        @click="addMetadata()"
                      >
                        Apply
                      </v-btn>
                      <v-btn
                        color="grey darken-1"
                        text
                        @click="addMetadataDialog = false"
                      >
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="addTransferMetadataDialog" max-width="1200">
                  <v-card>
                    <v-card-title
                      >Reference based cell type annotation</v-card-title
                    >
                    <v-divider class="my-2 py-2"></v-divider>
                    <v-card-text>
                      <v-autocomplete
                        v-model="currentAtlas"
                        class="ml-4"
                        :items="atlas"
                        label="Select atlas data"
                      ></v-autocomplete>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        class="mx-2"
                        color="primary"
                        dark
                        @click="addReference()"
                      >
                        Apply
                      </v-btn>
                      <v-btn
                        color="grey darken-1"
                        text
                        @click="addTransferMetadataDialog = false"
                      >
                        Cancel
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--
                <div v-if="deg">
                  <v-data-table
                    dense
                    :search="keggSearch"
                    :headers="enrichHeaders"
                    :items="keggResult"
                    :items-per-page="10"
                    item-key="index"
                    class="elevation-1"
                    :expanded.sync="expandedKegg"
                    show-expand
                  >
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title>
                          <download-excel :data="keggResult" type="csv">
                            <v-btn color="primary"> Download</v-btn
                            ><v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                  color="primary"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <span
                                >KEGG Pathway enrichment analysis using the DE
                                genes above. The results are calculated
                                real-time using Enrichr.</span
                              >
                            </v-tooltip>
                          </download-excel></v-toolbar-title
                        >
                        <v-spacer></v-spacer>
                      </v-toolbar>
                    </template>
                    <template v-slot:expanded-item="{ item }">
                      <td :colspan="headers.length">
                        {{ item.genes.join(',') }}
                      </td>
                    </template>
                  </v-data-table>
                </div>
                -->
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
import _ from 'lodash'
import Scatter from '~/components/utils/Scatter'

export default {
  components: {
    scatter: Scatter,
  },
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
        title: 'Differential gene expression',
      },
      {
        x: 0,
        y: 2,
        w: 3,
        h: 2,
        i: '2',
        title: 'Plotting genes',
      },
      {
        x: 3,
        y: 2,
        w: 3,
        h: 2,
        i: '3',
        title: 'Cell type annotation',
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
    enrichHeaders: [
      { text: 'Index', value: 'index' },
      { text: 'Name', value: 'name' },
      { text: 'Adjusted p-value', value: 'adjPvalue' },
      { text: 'Odds ratio', value: 'odd' },
      { text: 'Combined score', value: 'score' },
      { text: '', value: 'data-table-expand' },
    ],
    expandedKegg: [],
    tab: null,
    title: '',
    nPCs: '20',
    resolution: '0.5',
    timeElapsed: 0,
    qcResult: null,
    umapCluster: '',
    umapGene: '',
    violinGene: '',
    featureGene: '',
    dotPlot: '',
    clusterResult: '',
    annotateResult: '',
    newCellType: [],
    gene: 'Gad1',
    genes: '',
    currentIdent: 'seurat_clusters',
    currentAtlas: '',
    atlas: [
      'Mouse brain atlas, 160k cells (Zeisel et.al., 2018)',
      'to-be-added',
    ],
    idents: [],
    violinSplit: 'Sex',
    resHistory: [],
    ident1: 1,
    ident2: 2,
    minPct: 0.2,
    minLfc: 0.8,
    deResult: [],
    deg: [],
    addTransferMetadataDialog: false,
    addMetadataDialog: false,
    // Add metadata
    displayAddMetadata: '',
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
    cellClusterArray() {
      return [
        { index: 0, value: '' },
        { index: 1, value: '' },
        { index: 2, value: '' },
        { index: 3, value: '' },
        { index: 4, value: '' },
        { index: 5, value: '' },
        { index: 6, value: '' },
        { index: 7, value: '' },
        { index: 8, value: '' },
        { index: 9, value: '' },
        { index: 10, value: '' },
        { index: 11, value: '' },
        { index: 12, value: '' },
        { index: 13, value: '' },
        { index: 14, value: '' },
        { index: 15, value: '' },
        { index: 16, value: '' },
        { index: 17, value: '' },
        { index: 18, value: '' },
      ]
      // return [
      //   ...Array(this.clusterResult.n_seurat_clusters)
      //     .fill(0)
      //     .map((x) => ({ index: '', value: '' })),
      // ]
      // return [...Array(this.clusterResult.n_seurat_clusters).keys()]
    },
  },
  watch: {
    deg() {
      if (this.deg) {
        this.sendKegg(this.deg)
      }
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
      /*
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
*/
      await this.$axios.post('iris3/api/queue/genes/').then((response) => {
        this.genes = response.data
      })
      await this.$axios.post('iris3/api/queue/idents/').then((response) => {
        this.idents = response.data
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
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
                  this.deg = _.map(this.deResult, 'gene')
                  this.$notifier.showMessage({
                    content: 'Running DE testing...',
                    color: 'accent',
                  })

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
        content: 'Running DE testing...',
        color: 'accent',
      })
    },
    async runGenePlot() {
      this.$notifier.showMessage({
        content: `Plotting ${this.gene} gene...`,
        color: 'accent',
      })
      await this.$axios
        .post('iris3/api/queue/violin-gene/', {
          gene: this.gene,
          split: this.violinSplit,
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
            content: 'Plot gene error!',
            color: 'error',
          })
        })
    },
    async showDotPlot() {
      await this.$axios
        .post('iris3/api/queue/dot-plot/', {
          top: 3,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                this.dotPlot = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot genes error!',
            color: 'error',
          })
        })
    },
    async annotateCellType() {
      await this.$axios
        .post('iris3/api/queue/dot-plot/', {
          top: 3,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                this.dotPlot = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot genes error!',
            color: 'error',
          })
        })
      await this.$axios.post('iris3/api/queue/idents/').then((response) => {
        this.idents = response.data
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
    },
    async sendKegg(genes) {
      const geneSetLibrary = 'KEGG_2019_Mouse'
      const formData = new FormData()
      formData.append('method', 'post')
      formData.append('name', 'list')
      formData.append('enctype', 'multipart/form-data')
      formData.append('list', genes.join('\n'))
      formData.append('description', 'test test')
      const geneListEnrichrId = await this.$axios
        .post('https://amp.pharm.mssm.edu/Enrichr/addList', formData)
        .then(function (response) {
          return response.data.userListId
        })
      const enrichrResult = await this.$axios
        .get(
          'https://amp.pharm.mssm.edu/Enrichr/enrich?userListId=' +
            geneListEnrichrId +
            '&backgroundType=' +
            geneSetLibrary
        )
        .then(function (response) {
          return response.data
        })

      this.keggResult = enrichrResult.KEGG_2019_Mouse.map((value) => ({
        index: value[0],
        name: value[1],
        pvalue: value[2],
        odd: value[3].toFixed(2),
        score: value[4].toFixed(2),
        genes: value[5],
        adjPvalue: value[6].toExponential(4),
        key8: value[7],
      }))

      return enrichrResult
    },
    runQubic() {
      this.$notifier.showMessage({
        content: 'Start CTSR identification!',
        color: 'accent',
      })
    },
    openMetadataDiaglog() {
      this.addMetadataDialog = true
    },
    openAddTransferMetadataDialog() {
      this.addTransferMetadataDialog = true
    },
    downloadPDF() {
      console.log('donlowad PDF ... ')
    },
    async addMetadata() {
      this.$notifier.showMessage({
        content: `Applying cell type...`,
        color: 'accent',
      })
      this.addMetadataDialog = false
      await this.$axios
        .post('iris3/api/queue/annotate-cell-type/', {
          gene: this.gene,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                this.annotateResult = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Annotate error!',
            color: 'error',
          })
        })
      await this.$axios.post('iris3/api/queue/idents/').then((response) => {
        this.idents = response.data
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
    },
    async addReference() {
      this.$notifier.showMessage({
        content: `Transfering cell type based on reference dataset...`,
        color: 'accent',
      })
      this.addTransferMetadataDialog = false
      await this.$axios
        .post('iris3/api/queue/transfer-cell-type/', {
          gene: this.gene,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                this.annotateResult = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Annotate error!',
            color: 'error',
          })
        })
      await this.$axios.post('iris3/api/queue/idents/').then((response) => {
        this.idents = response.data
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
    },
    resetAddMetadata() {
      console.log(' ~ file: CellCluster.vue ~ line 944 ~ resetAddMetadata ~ ')
    },
  },
}
</script>
