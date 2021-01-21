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
                  Regulon inference
                </p>
                <v-row justify="center">
                  <v-btn
                    class="ma-2"
                    color="Primary"
                    width="200"
                    rounded
                    @click="runCombineRegulon()"
                    >Update</v-btn
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
  }),
  computed: {},
  methods: {
    async runCombineRegulon() {
      this.regulon = []
      await this.$axios
        .post('iris3/api/queue/combine-regulon/', {
          id: 123,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('iris3/api/queue/' + response.data.id)
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
        content: 'Running regulon inference...',
        color: 'accent',
      })
    },
    downloads() {
      console.log('donlowad PDF ... ')
    },
  },
}
</script>
