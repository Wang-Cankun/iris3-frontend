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
                  <p class="subtitle-1 font-weight-bold text--primary">
                    Set Cell Identity for CTSR identification:
                  </p>
                  <v-autocomplete
                    v-model="currentIdent"
                    :items="idents"
                    label="Select identity"
                  ></v-autocomplete>
                </div>
                <p class="ml-4 title-h4">Number of PCs</p>
                <v-text-field
                  v-model="nPCs"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Resolution</p>
                <v-text-field
                  v-model="resolution"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="200"
                    rounded
                    @click="runCellCluster()"
                    >Update</v-btn
                  >
                </v-row>

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
                  <!--<v-row justify="center">
                    <v-btn
                      color="Primary"
                      width="300"
                      rounded
                      @click="runQubic()"
                      >Run CTSR identification</v-btn
                    >
                  </v-row>-->
                </div>
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
                    :src="umapCluster"
                    :title="layout[0].title"
                  >
                  </resize-image>
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
        h: 3,
        i: '0',
        title: 'UMAP plot',
      },
    ],
    tab: null,
    title: '',
    nPCs: '20',
    resolution: '0.8',
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
  }),
  methods: {
    async runCellCluster() {
      this.$notifier.showMessage({
        content: 'Running clustering...',
        color: 'accent',
      })

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
            content: 'Plot Variable genes error!',
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
    runQubic() {
      this.$notifier.showMessage({
        content: 'Start CTSR identification!',
        color: 'accent',
      })
    },
  },
}
</script>
