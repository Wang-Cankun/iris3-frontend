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
              <v-card class="mt-6" outlined hover color="grey lighten-3">
                <p class="subtitle-1 font-weight-bold text-center">Jobs</p>
                <p class="ml-4 title-h4">Bicluster overlap rate</p>
                <v-text-field
                  v-model="qubic_f"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Maximum bicluster number</p>
                <v-text-field
                  v-model="qubic_o"
                  class="px-6"
                  outlined
                  background-color="white"
                ></v-text-field>
                <p class="ml-4 title-h4">Minimum cell number</p>
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

                <p class="subtitle-1 font-weight-bold text-center">Jobs</p>
                <v-row justify="center">
                  <v-btn
                    class="ma-2"
                    color="Primary"
                    width="200"
                    rounded
                    @click="runV1(jobId, qubic_k, qubic_f, qubic_o)"
                    >Start deepmaps v1</v-btn
                  >
                  <v-btn
                    class="ma-2"
                    color="Primary"
                    width="200"
                    rounded
                    @click="runCombineRegulon(jobId)"
                    >Update result</v-btn
                  >
                </v-row>
              </v-card></v-col
            >
            <v-col cols="9">
              <v-data-table
                dense
                :headers="headers"
                :items="regulon[0]"
                item-key="name"
                :items-per-page="10"
                class="elevation-1"
              ></v-data-table>
              <!--
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
                <resize-table
                  :key="layout[0].i"
                  :x="layout[0].x"
                  :y="layout[0].y"
                  :w="layout[0].w"
                  :h="layout[0].h"
                  :i="layout[0].i"
                  :src="regulon"
                  :title="layout[0].title"
                >
                </resize-table>
              </grid-layout> -->
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
    headers: [
      {
        text: 'index',
        align: 'start',
        sortable: false,
        value: 'index',
      },
      { text: 'TF', value: 'tf_name' },
      { text: 'RSS', value: 'rss' },
      { text: 'RSS p-value', value: 'rss_pval' },
      { text: 'Genes', value: 'gene_symbol' },
    ],
    tab: null,
    regulon: [],
    v1Result: [],
    checkResult: '',
    qubic_f: '0.7',
    qubic_o: '500',
    qubic_k: '20',
    promoter_length: '1000',
  }),
  computed: {
    jobId() {
      return this.$route.params.id
    },
  },
  methods: {
    async runCombineRegulon(jobId) {
      this.regulon = []
      console.log(jobId)
      await this.$axios
        .post('deepmaps/api/queue/combine-regulon/', {
          jobid: jobId,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.regulon = response.data.returnvalue[0]
                  this.$notifier.showMessage({
                    content: 'Get regulon result...',
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
            content: 'Identify regulon error: ' + error,
            color: 'error',
          })
        })
      this.$notifier.showMessage({
        content: 'Loading regulon results...',
        color: 'accent',
      })
    },
    async runV1(jobId, k, f, o) {
      await this.$axios
        .post('deepmaps/api/queue/run-v1/', {
          jobid: jobId,
          k_arg: k,
          f_arg: f,
          o_arg: o,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.v1Result = response.data.returnvalue[0]
                  if (this.v1Result) {
                    this.$notifier.showMessage({
                      content: 'Start job:' + jobId,
                      color: 'accent',
                    })
                  } else {
                    this.$notifier.showMessage({
                      content: 'Job already exist: ' + jobId,
                      color: 'error',
                    })
                  }

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
            content: 'Job exist: ' + error,
            color: 'error',
          })
        })
      this.$notifier.showMessage({
        content: 'Checking job status...',
        color: 'accent',
      })
    },
    async checkJobIdExist(jobId) {
      console.log(jobId)
      await this.$axios
        .get('https://bmbl.bmi.osumc.edu/deepmaps/data/202004168452')
        .then((response) => {
          if (response.data.returnvalue !== null) {
            this.checkResult = response.data.returnvalue[0]
          }
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Link error: ' + error,
            color: 'error',
          })
        })
      return true
    },
    downloads() {
      console.log('donlowad PDF ... ')
    },
  },
}
</script>
