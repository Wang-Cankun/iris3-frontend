<template>
  <v-card class="ma-0"
    ><grid-item
      :w="w"
      :h="h"
      :x="x"
      :y="y"
      :i="i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
      @resized="changeSize"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }} <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="1">
                <download-excel class="mr-4" data="" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="ident1"
              class="ml-4"
              :items="currentIdentLevels"
              label="Select cell type"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="ident2"
              class="ml-4"
              :items="currentIdentLevels"
              label="Select cell type"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center" class="mx-2 mb-2 mt-0">
          <v-btn
            class="mx-2 mb-2 mt-0"
            color="Primary"
            width="200"
            @click="run()"
            >Update</v-btn
          >
        </v-row>
        <div v-if="result.length">
          <v-data-table
            dense
            :height="tableHeight"
            :headers="headers"
            :items="result"
            item-key="tf"
            :items-per-page="10"
            class="elevation-0"
          >
          </v-data-table>
        </div></div></grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    genes: { type: Array, required: true },
    title: { type: String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
      headers: [
        { text: 'TF', value: 'tf' },
        { text: 'logFC', value: 'logfc' },
        { text: 'p-value', value: 'pvalue' },
      ],
      result: [],
      ident1: '',
      ident2: '',
      currentIdentLevels: [1, 2, 3, 4, 5, 6, 7],
      tableHeight: 380,
      footerHeight: 155,
    }
  },

  methods: {
    async run() {
      if (this.ident1 && this.ident2) {
        this.$nuxt.$loading.start()
        this.result = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'dr',
            tf: [
              'CTCF',
              'DEAF1',
              'IKZF1',
              'TP53',
              'SREBF2',
              'ESR1',
              'ZNF740',
              'ZBTB7A',
              'SMAD3',
              'AHR',
            ],
            ct1: this.ident1,
            ct2: this.ident2,
          }
        )
        await ApiService.sleep(2000)
        this.$nuxt.$loading.finish()
      } else {
        this.$notifier.showMessage({
          content: 'Select cell type',
          color: 'error',
        })
      }
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.tableHeight = newHPx - this.footerHeight
    },
  },
}
</script>

<style lang="scss" scoped>
.grid-item-border {
  border: 1px solid #d3d3d3;
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 4px;
  background: white;
}
</style>
