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
                <p class="subtitle-1 font-weight-bold text-center">
                  Original data statistics
                </p>

                <p class="ml-4 title-h4">
                  Cell number: {{ qcResult.raw_n_cells[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Gene number: {{ qcResult.raw_n_genes[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Average expression level:
                  {{ qcResult.raw_mean_expr[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Zero expression percentage:
                  {{ qcResult.raw_percent_zero[0] }}
                </p>
                <p class="subtitle-1 font-weight-bold text-center">
                  Current data statistics:
                </p>
                <p class="ml-4 title-h4">
                  Cell number: {{ qcResult.filter_n_cells[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Gene number: {{ qcResult.filter_n_genes[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Average expression level:
                  {{ qcResult.filter_mean_expr[0] }}
                </p>
                <p class="ml-4 title-h4">
                  Zero expression percentage:
                  {{ qcResult.filter_percent_zero[0] }}
                </p>

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
                    <p>
                      Data Normalization methods:
                    </p>
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
                    width="300"
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

              <resize-image
                :src="qcViolin1"
                title="Number of genes detected in each cell"
                :x="position.qcViolin1.x"
                :y="position.qcViolin1.y"
              ></resize-image>
              <resize-image
                :src="qcViolin2"
                title="Total number of molecules detected within a cell"
                :x="position.qcViolin2.x"
                :y="position.qcViolin2.y"
              ></resize-image>
              <resize-image
                :src="qcViolin3"
                title="Mitocondrial genes percent"
                :x="position.qcViolin3.x"
                :y="position.qcViolin3.y"
              ></resize-image>
              <resize-image
                :src="qcViolin4"
                title="Ribosome genes percent"
                :x="position.qcViolin4.x"
                :y="position.qcViolin4.y"
              ></resize-image>
              <resize-image
                :src="varGenesScatter"
                title="Highly variable genes"
                :x="position.varGenesScatter.x"
                :y="position.varGenesScatter.y"
                :w="position.varGenesScatter.w"
              ></resize-image>
              <resize-table
                :src="varGenesList"
                title="Highly variable genes"
                :x="position.varGenesList.x"
                :y="position.varGenesList.y"
                :w="position.varGenesList.w"
              ></resize-table>
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
export default {
  components: {
    'resize-image': ResizeImage,
    'resize-table': ResizeTable,
  },
  data() {
    return {
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
      varGenesScatter: '',
      varGenesList: [],
      position: {
        qcViolin1: {
          x: 0,
          y: 0,
        },
        qcViolin2: {
          x: 520,
          y: 0,
        },
        qcViolin3: {
          x: 1040,
          y: 0,
        },
        qcViolin4: {
          x: 0,
          y: 520,
        },
        varGenesScatter: {
          x: 520,
          y: 520,
          w: 1000,
        },
        varGenesList: {
          x: 1040,
          y: 520,
          w: 300,
        },
      },
    }
  },
  methods: {
    async runPreProcess() {
      this.$notifier.showMessage({
        content: 'Running QC metrics...',
        color: 'accent',
      })
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
        .post('iris3/api/queue/var-genes-list/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.varGenesList = response.data.returnvalue
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
