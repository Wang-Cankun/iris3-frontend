<template>
  <v-card class="ma-0"
    ><grid-item
      :w="setting.w"
      :h="setting.h"
      :x="setting.x"
      :y="setting.y"
      :i="setting.i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
      @resized="changeSize"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >Gene set enrichment analysis <v-spacer></v-spacer>
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
                <download-excel class="mr-4" :data="gseaResult[0]" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-row class="mt-2">
          <v-col cols="6">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-autocomplete
                  v-model="gseaDatabase"
                  class="ml-4"
                  dense
                  :items="allGseaDatabases"
                  label="MSigDB database"
                  return-object
                  item-text="name"
                  item-value="value"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-autocomplete>
              </template>
              <span>TODO</span>
            </v-tooltip>
          </v-col>
          <v-col cols="4"
            ><v-btn small @click="runGSEA()">Run</v-btn></v-col
          ></v-row
        >
        <div v-if="gseaResult.length">
          <v-data-table
            dense
            :headers="gseaHeaders"
            :items="gseaResult[0]"
            item-key="name"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :height="tableHeight"
            :max-height="maxHeight"
            :items-per-page="10"
            class="elevation-0"
          ></v-data-table>
        </div></div></grid-item
  ></v-card>
</template>

<script>
import { mapState } from 'vuex'

import ApiService from '~/services/ApiService.js'

export default {
  props: {
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      gseaHeaders: [
        { text: 'pathway', value: 'pathway' },
        { text: 'Adjusted p-value', value: 'padj' },
        { text: 'NES', value: 'NES' },
        { text: 'size', value: 'size' },
        { text: '', value: 'data-table-expand' },
      ],
      gseaResult: [],
      gseaDatabase: '',
      allGseaDatabases: [
        { name: 'Hallmark gene sets (H)', value: 'H' },
        { name: 'Positional gene sets (C1)', value: 'C1' },
        { name: 'Curated gene sets (C2)', value: 'C2' },
        { name: 'Regulatory target gene sets (C3)', value: 'C3' },
        { name: 'Computational gene sets (C4)', value: 'C4' },
        { name: 'Ontology gene sets (C5)', value: 'C5' },
        { name: 'Oncogenic signature gene sets (C6)', value: 'C6' },
        { name: 'Immunologic signature gene sets (C7)', value: 'C7' },
      ],
      tableHeight: 380,
      footerHeight: 200,
      sortBy: 'NES',
      sortDesc: true,
      maxHeight: 300,
    }
  },
  computed: {
    ...mapState({
      genes: (state) => state.calc.deg,
    }),
  },
  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading enrichment result...',
        color: 'Success',
      })
    },
    async runGSEA() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'Please run differential gene expression analysis first',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        this.gseaResult = await ApiService.postCommand(
          'deepmaps/api/queue/gsea-table/',
          {
            genes: '1',
            database: this.gseaDatabase.value,
          }
        )
        await ApiService.sleep(2000)
        this.$nuxt.$loading.finish()
      }
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.maxHeight = newWPx - this.footerHeight
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
