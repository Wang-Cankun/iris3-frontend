<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset 1 </v-tab>
      <v-tab>Dataset 2 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined hover>
          <v-row>
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
                <p class="ml-4 title-h4">Normalization</p>
                <v-text-field
                  v-model="normalization"
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
              ><p>Execute time: {{ message }}</p>
              <div>
                <no-ssr><img width="800px" :src="`${src1}`" /></no-ssr>
              </div>
              <div>
                <img width="800px" :src="`${src3}`" />
              </div>
              <div>
                <img width="800px" :src="`${src2}`" /></div
            ></v-col>
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
    cellFilter: '3',
    geneFilter: '200',
    normalization: 'Seurat',
    nVariableFeatures: '2000',
    message: '',
    src1: '',
    src2: '',
    src3: '',
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on('connected', () => {
      console.log('Connected')
    })
  },
  methods: {
    runPreProcess() {
      /* Emit events */
      this.src1 = this.src2 = this.src3 = this.message = ''
      this.socket.emit(
        'preprocess',
        {
          cellFilter: this.cellFilter,
          geneFilter: this.geneFilter,
          nVariableFeatures: this.nVariableFeatures,
        },
        (resp) => {
          /* Handle response, if any */
          this.message = resp
          this.src1 =
            'http://localhost:9005/top_variable_genes.png?rnd=' +
            new Date().getTime()
          this.src3 =
            'http://localhost:9005/feature_scatter.png?' +
            Math.floor(Math.random() * 1000)
          this.src2 =
            'http://localhost:9005/qc_plot.png?' +
            Math.floor(Math.random() * 1000)

          console.log(resp)
        }
      )
    },
  },
}
</script>
