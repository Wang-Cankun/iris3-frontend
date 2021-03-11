<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab title font-weight-bold text-center>RNA assay</v-tab>
      <v-tab title font-weight-bold text-center>ATAC assay</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined>
          <v-row>
            <v-col cols="2">
              <v-card
                v-if="qcResult !== null"
                outlined
                hover
                color="blue-grey lighten-5"
              >
                <v-card-text>
                  <p class="subtitle-1 font-weight-bold text-center">
                    Original data statistics
                  </p>

                  <p class="text--secondary">
                    Cell number: {{ qcResult.raw_n_cells[0] }}
                  </p>
                  <p class="text--secondary">Gene number: 36601</p>
                </v-card-text>
                <v-row justify="center">
                  <div class="mb-2">
                    <v-menu close-on-click>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                          Download Pre-processed data
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>
                            <a class="text-decoration-none" href="1">
                              Save as TXT format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <a
                              class="text-decoration-none"
                              href="https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_expression.csv"
                            >
                              Save as CSV format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <a class="text-decoration-none" href="2">
                              Save as MTX format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-row>
              </v-card>

              <v-card class="mt-6" outlined hover color="blue-grey lighten-5">
                <p class="subtitle-1 font-weight-bold text-center">
                  Preprocessing parameters
                </p>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Cell filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with zero values in more than # genes are removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="cellFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Gene filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Genes with zero values in more than # cells are removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="geneFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Mitochondrial percentage filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with more than # percent mitochondrial counts are
                      removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="mitoFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Variable features</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Select a subset of features that exhibit high cell-to-cell
                      variation in the dataset
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="nVariableFeatures"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4 mb-0 py-0"
                  ><p class="mt-4 title-h4">Normalization</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>Data Normalization methods:</p>
                    <p>
                      LogNormalize: Seurat's default method which Normalizes the
                      gene expression measurements for each cell by the total
                      expression, multiplies this by a scale factor (10,000 by
                      default), and log-transforms the result.
                    </p>
                  </v-tooltip></v-row
                >
                <v-col class="ml-4 py-0" cols="11"
                  ><v-select
                    v-model="normalizeSelect"
                    :items="normalizeMethods"
                    label=""
                  ></v-select
                ></v-col>

                <v-checkbox v-model="removeRibosome" class="ml-4">
                  <template v-slot:label>
                    <div>
                      Ribosome genes removal
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        Remove all ribosome genes
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="200"
                    rounded
                    class="mb-2"
                    @click="runPreProcess()"
                    >Update</v-btn
                  >
                </v-row>
              </v-card>
            </v-col>
            <v-col v-if="qcResult !== null" cols="10"
              ><p v-if="timeElapsed != ''">
                Execute time: {{ timeElapsed }} seconds
              </p>
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
                  :src="qcViolin1"
                  :title="layout[0].title"
                >
                </resize-image>
                <resize-image
                  :key="layout[1].i"
                  :x="layout[1].x"
                  :y="layout[1].y"
                  :w="layout[1].w"
                  :h="layout[1].h"
                  :i="layout[1].i"
                  :src="qcViolin2"
                  :title="layout[1].title"
                >
                </resize-image>
                <resize-image
                  :key="layout[2].i"
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  :src="qcViolin3"
                  :title="layout[2].title"
                >
                </resize-image>
                <resize-image
                  :key="layout[3].i"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                  :src="qcViolin4"
                  :title="layout[3].title"
                >
                </resize-image>
                <resize-image
                  :key="layout[7].i"
                  :x="layout[7].x"
                  :y="layout[7].y"
                  :w="layout[7].w"
                  :h="layout[7].h"
                  :i="layout[7].i"
                  :src="qcViolin5"
                  :title="layout[7].title"
                ></resize-image>
                <resize-image
                  :key="layout[4].i"
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                  :src="varGenesScatter"
                  :imagew="420"
                  :imageh="210"
                  :title="layout[4].title"
                >
                </resize-image>
              </grid-layout>
            </v-col>
            <v-col cols="7"></v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card outlined>
          <v-row>
            <v-col cols="2">
              <v-card
                v-if="qcResult !== null"
                outlined
                hover
                color="blue-grey lighten-5"
              >
                <v-card-text>
                  <p class="subtitle-1 font-weight-bold text-center">
                    Data statistics
                  </p>

                  <p class="text--secondary">
                    Number of cells : {{ qcResult.raw_n_cells[0] }}
                  </p>
                  <p class="text--secondary">
                    Number of peaks: {{ qcResult.raw_n_genes[0] }}
                  </p>
                  <p class="text--secondary">
                    Number of genes: {{ qcResult.filter_n_genes[0] }}
                  </p>
                </v-card-text>
                <v-row justify="center">
                  <div class="mb-2">
                    <v-menu close-on-click>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                          Download Pre-processed data
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>
                            <a class="text-decoration-none" href="1">
                              Save as TXT format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <a
                              class="text-decoration-none"
                              href="https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_expression.csv"
                            >
                              Save as CSV format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            <a class="text-decoration-none" href="2">
                              Save as MTX format</a
                            ></v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-row>
              </v-card>

              <v-card class="mt-6" outlined hover color="blue-grey lighten-5">
                <p class="subtitle-1 font-weight-bold text-center">
                  Preprocessing parameters
                </p>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">ATAC counts filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with ATAC values in more than # genes are removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="cellFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Gene counts filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Genes with zero values in more than # cells are removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="geneFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Mitochondrial percentage filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with more than # percent mitochondrial counts are
                      removed
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="mitoFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4"
                  ><p class="mt-4 title-h4">Variable features</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Select a subset of features that exhibit high cell-to-cell
                      variation in the dataset
                    </p>
                  </v-tooltip></v-row
                >
                <v-text-field
                  v-model="nVariableFeatures"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row class="ml-4 mb-0 py-0"
                  ><p class="mt-4 title-h4">Normalization</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>Data Normalization methods:</p>
                    <p>
                      LogNormalize: Seurat's default method which Normalizes the
                      gene expression measurements for each cell by the total
                      expression, multiplies this by a scale factor (10,000 by
                      default), and log-transforms the result.
                    </p>
                  </v-tooltip></v-row
                >
                <v-col class="ml-4 py-0" cols="11"
                  ><v-select
                    v-model="normalizeSelect"
                    :items="normalizeMethods"
                    label=""
                  ></v-select
                ></v-col>

                <v-checkbox v-model="removeRibosome" class="ml-4">
                  <template v-slot:label>
                    <div>
                      Ribosome genes removal
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        Remove all ribosome genes
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="200"
                    rounded
                    class="mb-2"
                    @click="runPreProcess()"
                    >Update</v-btn
                  >
                </v-row>
              </v-card>
            </v-col>
            <v-col v-if="qcResult !== null" cols="10"
              ><p v-if="timeElapsed != ''">
                Execute time: {{ timeElapsed }} seconds
              </p>
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
                  :key="layout[8].i"
                  :x="layout[8].x"
                  :y="layout[8].y"
                  :w="layout[8].w"
                  :h="layout[8].h"
                  :i="layout[8].i"
                  :src="qcViolin6"
                  :title="layout[8].title"
                >
                </resize-image>
                <resize-image
                  :key="layout[4].i"
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                  :src="varGenesScatter"
                  :imagew="420"
                  :imageh="210"
                  :title="layout[4].title"
                >
                </resize-image>

                <resize-image
                  :key="layout[6].i"
                  :x="layout[6].x"
                  :y="layout[6].y"
                  :w="layout[6].w"
                  :h="layout[6].h"
                  :i="layout[6].i"
                  :src="pie1"
                  :title="layout[6].title"
                ></resize-image>
              </grid-layout>
            </v-col>
            <v-col cols="7"></v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
import ResizeImage from '~/components/utils/ResizeImage'

export default {
  components: {
    'resize-image': ResizeImage,
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: '0',
          title: 'Number of genes per cell',
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: '1',
          title: 'Number of molecules per cell',
        },
        {
          x: 2,
          y: 0,
          w: 1,
          h: 1,
          i: '2',
          title: 'Mitocondrial genes percent',
        },
        {
          x: 3,
          y: 0,
          w: 1,
          h: 1,
          i: '3',
          title: 'Number of nucleosome',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '4',
          title: 'TSS enrichment',
        },
        {
          x: 4,
          y: 0,
          w: 1,
          h: 1,
          i: '5',
          title: 'Number of ATAC-seq count',
        },
        {
          x: 2,
          y: 1,
          w: 1,
          h: 1,
          i: '6',
          title: 'Cell type',
        },
        {
          x: 3,
          y: 1,
          w: 1,
          h: 1,
          i: '7',
          title: 'Cell type ',
        },
        {
          x: 3,
          y: 1,
          w: 1,
          h: 1,
          i: '8',
          title: 'Gene count',
        },
      ],
      tab: null,
      removeRibosome: false,
      title: '',
      cellFilter: '0',
      geneFilter: '0',
      mitoFilter: '0',
      normalization: 'LogNormalize',
      nVariableFeatures: '2000',
      timeElapsed: '',
      normalizeSelect: 'LogNormalize',
      normalizeMethods: ['LogNormalize'],
      qcResult: null,
      qcViolin1: '',
      qcViolin2: '',
      qcViolin3: '',
      qcViolin4: '',
      qcViolin5: '',
      qcViolin6: '',
      pie1: '',
      varGenesScatter: '',
      varGenesList: [],
    }
  },
  methods: {
    async runPreProcess() {
      this.$notifier.showMessage({
        content: 'Running QC metrics...',
        color: 'accent',
      })
      this.varGenesList = []
      this.pie1 = this.qcViolin1 = this.qcViolin2 = this.qcViolin3 = this.qcViolin4 = this.varGenesScatter =
        'https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp'
      await this.$axios
        .post('iris3/api/queue/load/', {
          filename: 'Zeisel_expression.fst',
          type: 'CellGene',
          min_cells: this.cellFilter,
          min_genes: this.geneFilter,
          nVariableFeatures: this.nVariableFeatures,
          percentMt: this.mitoFilter,
          removeRibosome: this.removeRibosome,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcResult = response.data.returnvalue
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

      await this.$axios
        .post('iris3/api/queue/qcplot1/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin1 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/qcplot2/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin2 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/qcplot3/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin3 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/qcplot4/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin4 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })
      await this.$axios
        .post('iris3/api/queue/qcplot5/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin5 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })
      await this.$axios
        .post('iris3/api/queue/qcplot6/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin6 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                }
                if (++i === 15) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot QC violin error!',
            color: 'error',
          })
        })
      await this.$axios
        .post('iris3/api/queue/var-genes-plot/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.varGenesScatter = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  this.$notifier.showMessage({
                    content: 'Calculate QC metrics success!',
                    color: 'success',
                  })
                  clearInterval(checkComplete)
                }
                if (++i === 10) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Variable genes error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/pie-meta/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.pie1 = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  this.$notifier.showMessage({
                    content: 'Ploting metadata success!',
                    color: 'success',
                  })
                  clearInterval(checkComplete)
                }
                if (++i === 10) {
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot metadata error!',
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
                    content: 'Cell QC success!',
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
    },
  },
}
</script>
