<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined hover>
          <v-row>
            <v-col cols="3">
              <v-card class="mt-6" outlined hover color="grey lighten-1">
                <p class="title text-center">Cell clustering Prarmeters</p>
                <div v-if="idents != ''">
                  <p class="subtitle-1 font-weight-bold text--primary">
                    Set Identity:
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
                <div v-if="genes != ''">
                  <p class="subtitle-1 font-weight-bold text--primary">
                    Gene expression<v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon color="primary" dark v-bind="attrs" v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                    </v-tooltip>
                  </p>
                  <v-autocomplete
                    v-model="gene"
                    :items="genes"
                    label="Select or search genes"
                  ></v-autocomplete>
                </div>
                <v-row justify="center">
                  <v-btn
                    color="Primary"
                    width="300"
                    rounded
                    @click="runCellCluster()"
                    >Update</v-btn
                  >
                </v-row>
              </v-card></v-col
            >
            <v-col cols="8">
              <div v-if="clusterResult !== ''">
                <p>Number of clusters: {{ clusterResult.n_seurat_clusters }}</p>
              </div>
              <div><img :src="umapCluster" /></div>
              <div><img :src="umapGene" /><img :src="violinGene" /></div>
              <div></div>
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
    tab: null,
    title: '',
    nPCs: '20',
    resolution: '0.8',
    timeElapsed: 0,
    qcResult: null,
    umapCluster: '',
    umapGene: '',
    violinGene: '',
    clusterResult: '',
    gene: 'BRCA1',
    genes: '',
    currentIdent: 'seurat_clusters',
    idents: '',
  }),

  mounted() {},
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
  },
}
</script>
