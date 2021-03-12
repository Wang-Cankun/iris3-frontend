<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab title font-weight-bold text-center>Dataset 1 </v-tab>
      <v-tab v-show="false">Dataset 2 </v-tab>
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
                  <p class="text--secondary">
                    Gene number: {{ qcResult.raw_n_genes[0] }}
                  </p>
                  <p class="text--secondary">
                    Average expression level:
                    {{ qcResult.raw_mean_expr[0] }}
                  </p>
                  <p class="text--secondary">
                    Zero expression percentage:
                    {{ qcResult.raw_percent_zero[0] }}
                  </p>
                  <p class="subtitle-1 font-weight-bold text-center">
                    Current data statistics:
                  </p>
                  <p class="text--secondary">
                    Cell number: {{ qcResult.filter_n_cells[0] }}
                  </p>
                  <p class="text--secondary">
                    Gene number: {{ qcResult.filter_n_genes[0] }}
                  </p>
                  <p class="text--secondary">
                    Average expression level:
                    {{ qcResult.filter_mean_expr[0] }}
                  </p>
                  <p class="text--secondary">
                    Zero expression percentage:
                    {{ qcResult.filter_percent_zero[0] }}
                  </p>
                </v-card-text>
                <v-row justify="center">
                  <div class="mb-2">
                    <v-menu close-on-click>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on"> Download </v-btn>
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
                  Preprocessing
                </p>
                <v-row class="ml-4"
                  ><p class="my-1title-h4">Cell filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with zero values in more than # genes are removed
                    </p> </v-tooltip
                  ><v-text-field
                    v-model="cellFilter"
                    class="mr-2 pr-2"
                    outlined
                    background-color="white"
                  ></v-text-field
                ></v-row>

                <v-row class="ml-4"
                  ><p class="my-1title-h4">Gene filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Genes with zero values in more than # cells are removed
                    </p> </v-tooltip
                  ><v-text-field
                    v-model="geneFilter"
                    class="mr-2 pr-2"
                    outlined
                    background-color="white"
                  ></v-text-field
                ></v-row>

                <v-row class="ml-4"
                  ><p class="my-1title-h4">Mitochondrial filter</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Cells with more than # percent mitochondrial counts are
                      removed
                    </p> </v-tooltip
                  ><v-text-field
                    v-model="mitoFilter"
                    class="mr-2 pr-2"
                    outlined
                    background-color="white"
                  ></v-text-field
                ></v-row>

                <v-row class="ml-4"
                  ><p class="my-1 title-h4">Top variable genes</p>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <p>
                      Select a subset of features that exhibit high cell-to-cell
                      variation in the dataset
                    </p> </v-tooltip
                  ><v-text-field
                    v-model="nVariableFeatures"
                    class="mr-2 pr-2"
                    outlined
                    background-color="white"
                  ></v-text-field
                ></v-row>

                <v-row class="ml-4 mb-0 py-0"
                  ><p class="my-1 title-h4">Normalization</p>
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
                        Remove ribosomal genes
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="150"
                    rounded
                    class="mb-4 pa-2"
                    @click="runPreProcess()"
                    >Update</v-btn
                  >
                </v-row>
              </v-card>
            </v-col>
            <v-col v-if="qcComplete !== false" cols="10"
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
                <boxplot
                  :key="layout[0].i"
                  :x="layout[0].x"
                  :y="layout[0].y"
                  :w="layout[0].w"
                  :h="layout[0].h"
                  :i="layout[0].i"
                  :src="qcBox1"
                  :title="layout[0].title"
                  :values="metadata.n_count_rna"
                >
                </boxplot>
                <boxplot
                  :key="layout[1].i"
                  :x="layout[1].x"
                  :y="layout[1].y"
                  :w="layout[1].w"
                  :h="layout[1].h"
                  :i="layout[1].i"
                  :src="qcBox2"
                  :title="layout[1].title"
                  :values="metadata.n_feature_rna"
                >
                </boxplot>
                <boxplot
                  :key="layout[2].i"
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  :src="qcBox3"
                  :title="layout[2].title"
                  :values="metadata.pct_mito"
                >
                </boxplot>
                <boxplot
                  :key="layout[3].i"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                  :src="qcBox4"
                  :title="layout[3].title"
                  :values="metadata.pct_ribo"
                >
                </boxplot>
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
                <resize-table
                  :key="layout[5].i"
                  :x="layout[5].x"
                  :y="layout[5].y"
                  :w="layout[5].w"
                  :h="layout[5].h"
                  :i="layout[5].i"
                  :src="varGenesList"
                  :title="layout[5].title"
                >
                </resize-table>
                <pie-chart
                  :key="layout[6].i"
                  :x="layout[6].x"
                  :y="layout[6].y"
                  :w="layout[6].w"
                  :h="layout[6].h"
                  :i="layout[6].i"
                  :values="metadata.meta1_val"
                  :name="metadata.meta1_name"
                  :title="metadata.meta1_title"
                ></pie-chart>
                <pie-chart
                  :key="layout[7].i"
                  :x="layout[7].x"
                  :y="layout[7].y"
                  :w="layout[7].w"
                  :h="layout[7].h"
                  :i="layout[7].i"
                  :values="metadata.meta2_val"
                  :name="metadata.meta2_name"
                  :title="metadata.meta2_title"
                ></pie-chart>
                <pie-chart
                  :key="layout[8].i"
                  :x="layout[8].x"
                  :y="layout[8].y"
                  :w="layout[8].w"
                  :h="layout[8].h"
                  :i="layout[8].i"
                  :values="metadata.meta3_val"
                  :name="metadata.meta3_name"
                  :title="metadata.meta3_title"
                ></pie-chart>
                <barplot
                  :key="layout[9].i"
                  :x="layout[9].x"
                  :y="layout[9].y"
                  :w="layout[9].w"
                  :h="layout[9].h"
                  :i="layout[9].i"
                  :src="qcHist1"
                  :title="layout[9].title"
                ></barplot>
                <barplot
                  :key="layout[10].i"
                  :x="layout[10].x"
                  :y="layout[10].y"
                  :w="layout[10].w"
                  :h="layout[10].h"
                  :i="layout[10].i"
                  :src="qcHist2"
                  :title="layout[10].title"
                ></barplot>
                <barplot
                  :key="layout[11].i"
                  :x="layout[11].x"
                  :y="layout[11].y"
                  :w="layout[11].w"
                  :h="layout[11].h"
                  :i="layout[11].i"
                  :src="qcHist3"
                  :title="layout[11].title"
                ></barplot>
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
import ResizeTable from '~/components/utils/ResizeTable'
import PieChart from '~/components/utils/PieChart'
import Boxplot from '~/components/utils/Boxplot'
import Barplot from '~/components/utils/Barplot'

export default {
  components: {
    'resize-image': ResizeImage,
    'resize-table': ResizeTable,
    'pie-chart': PieChart,
    boxplot: Boxplot,
    barplot: Barplot,
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
          title: '# of genes per cell',
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: '1',
          title: 'Total # of molecules per cell',
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
          title: 'Ribosome genes percent',
        },
        {
          x: 2,
          y: 3,
          w: 2,
          h: 1,
          i: '4',
          title: 'Highly variable genes',
        },
        {
          x: 4,
          y: 0,
          w: 2,
          h: 1,
          i: '5',
          title: 'Variable genes table',
        },
        {
          x: 0,
          y: 2,
          w: 2,
          h: 2,
          i: '6',
          title: 'Metadata: cell_type',
        },
        {
          x: 2,
          y: 2,
          w: 2,
          h: 1,
          i: '7',
          title: 'Metadata: Sex',
        },
        {
          x: 4,
          y: 2,
          w: 2,
          h: 1,
          i: '8',
          title: 'Metadata: Sample',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '9',
          title: '# of expressed genes in each cell',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '10',
          title: '# of read counts in each cell',
        },
        {
          x: 4,
          y: 1,
          w: 2,
          h: 1,
          i: '11',
          title: '# of cells for each gene',
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
      qcComplete: false,
      qcBox1: [],
      qcBox2: [],
      qcBox3: [],
      qcBox4: [],
      qcBox5: [],
      qcHist1: [],
      qcHist2: [],
      qcHist3: [],
      pie1: '',
      varGenesScatter: '',
      varGenesList: [],
      metadata: [],
    }
  },
  methods: {
    async runPreProcess() {
      this.$notifier.showMessage({
        content: 'Running QC metrics...',
        color: 'accent',
      })
      this.varGenesList = []
      this.pie1 = this.varGenesScatter =
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
        .post('iris3/api/queue/meta-data/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.metadata = response.data.returnvalue
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
            content: 'Download metadata error!',
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
        .post('iris3/api/queue/var-genes-list/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.varGenesList = response.data.returnvalue
                  this.qcBox1 = this.varGenesList[1].map(
                    (item) => item.n_reads_per_cell
                  )
                  this.qcBox2 = this.varGenesList[1].map(
                    (item) => item.n_genes_per_cell
                  )
                  this.qcBox3 = this.varGenesList[1].map(
                    (item) => item.pct_ribo_per_gene
                  )
                  this.qcBox4 = this.varGenesList[1].map(
                    (item) => item.pct_mito_per_gene
                  )
                  this.qcBox5 = this.varGenesList[0].map(
                    (item) => item.n_cells_per_gene
                  )
                  this.qcHist1 = this.varGenesList[2]
                  this.qcHist2 = this.varGenesList[3]
                  this.qcHist3 = this.varGenesList[4]
                  this.$notifier.showAlert({
                    content: `QC result`,
                    color: 'accent',
                  })
                  this.qcComplete = true
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
            content: 'Get Variable genes list error!',
            color: 'error',
          })
        })
    },
  },
}
</script>
