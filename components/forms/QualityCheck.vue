<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset 1 </v-tab>
      <v-tab v-show="false">Dataset 2 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined>
          <v-row>
            <v-col cols="3">
              <v-card
                v-if="qcResult !== null"
                outlined
                hover
                color="blue-grey lighten-5"
              >
                <p class="title text-center">Original data statistics</p>

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
                <p class="title text-center">
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
                <p class="title text-center">Preprocessing parameters</p>
                <p class="ml-4 title-h4">Cell filter</p>
                <v-text-field
                  v-model="cellFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Gene filter</p>
                <v-text-field
                  v-model="geneFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Mitochondrial percentage filter</p>
                <v-text-field
                  v-model="mitoFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Variable features</p>
                <v-text-field
                  v-model="nVariableFeatures"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-col class="ml-4" cols="11"
                  ><v-select
                    v-model="normalizeSelect"
                    :items="normalizeMethods"
                    label="Normalization method:"
                  ></v-select
                ></v-col>
                <v-checkbox v-model="removeRibosome" class="ml-4">
                  <template v-slot:label>
                    <div>
                      Ribosome genes removal.
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
            <v-col v-if="qcResult !== null" cols="8"
              ><p v-if="timeElapsed != ''">
                Execute time: {{ timeElapsed }} seconds
              </p>
              <resize-image
                :src="qcViolin"
                title="Violin plot for genes, RNA counts, percentage of
                    mitochondrial genes and ribosome genes"
              ></resize-image>
              <resize-image
                :src="varGenesScatter"
                title="Scatter plot"
              ></resize-image>
            </v-col>
            <v-col cols="7"> </v-col>
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
      tab: null,
      removeRibosome: false,
      title: '',
      cellFilter: '0',
      geneFilter: '0',
      mitoFilter: '0',
      normalization: 'Seurat',
      nVariableFeatures: '2000',
      timeElapsed: '',
      normalizeSelect: 'Seurat',
      normalizeMethods: ['Seurat'],
      qcResult: null,
      qcViolin: '',
      varGenesScatter: '',
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
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Calculate QC metrics error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('iris3/api/queue/qcplot/')
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.qcViolin = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
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
    },
  },
}
</script>
