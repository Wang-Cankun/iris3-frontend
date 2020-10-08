<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset 1 </v-tab>
      <v-tab v-show="false">Dataset 2 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined hover>
          <v-row>
            <v-col cols="3">
              <v-card outlined hover color="grey lighten-1">
                <p class="title text-center">Original data statistics</p>
                <div v-if="qcResult !== null">
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
                    {{ qcResult.raw_n_cells[0] }}
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
                </div>
                <v-row justify="center">
                  <v-btn color="Primary" width="300" rounded
                    >Download Pre-processed data</v-btn
                  >
                </v-row>
              </v-card>

              <v-card class="mt-6" outlined hover color="grey lighten-1">
                <p class="title text-center">Preprocessing Prarmeters</p>
                <p class="ml-4 title-h4">Min Cells filter</p>
                <v-text-field
                  v-model="cellFilter"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Min Genes filter</p>
                <v-text-field
                  v-model="geneFilter"
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
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="300"
                    rounded
                    @click="runPreProcess()"
                    >Update</v-btn
                  >
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="8"
              ><p>Execute time: {{ timeElapsed }} seconds</p>
              <div><img :src="qcViolin" /></div>
              <div><img :src="varGenesScatter" /></div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card outlined hover>
          <v-col cols="3">
            <v-card outlined hover color="grey lighten-1">
              <p class="title text-center">Original data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <p class="title text-center">Current data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded
                  >Download Pre-processed data</v-btn
                >
              </v-row>
            </v-card>

            <v-card class="mt-6" outlined hover color="grey lighten-1">
              <p class="title text-center">Preprocessing Prarmeters</p>
              <p class="ml-4 title-h4">Cell filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Gene filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Normalization</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded>Update</v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    tab: null,
    title: '',
    cellFilter: '0',
    geneFilter: '0',
    normalization: 'Seurat',
    nVariableFeatures: '2000',
    timeElapsed: '',
    qcResult: null,
    qcViolin: '',
    varGenesScatter: '',
  }),
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
