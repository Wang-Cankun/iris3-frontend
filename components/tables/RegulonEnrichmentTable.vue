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
          <v-tooltip top max-width="500px">
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
                <download-excel class="mr-4" :data="enrichResult[0]" type="csv">
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
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-autocomplete
                  v-model="selectedDatabase"
                  class="ml-4"
                  dense
                  :items="allDatabases"
                  label="Database"
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
            ><v-btn small @click="run()">Calculate</v-btn></v-col
          ></v-row
        >
        <div v-if="enrichResult.length">
          <v-data-table
            dense
            :height="tableHeight"
            :headers="headers"
            :items="enrichResult[0]"
            item-key="Term"
            :items-per-page="10"
            class="elevation-0"
            :expanded.sync="expanded"
            show-expand
          >
            <template v-slot:expanded-item="{ item }">
              <td :colspan="headers.length">
                {{ item.Genes }}
              </td>
            </template></v-data-table
          >
        </div>
      </div></grid-item
    ></v-card
  >
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    genes: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      tableHeight: 435,
      footerHeight: 180,
      headers: [
        { text: 'Term', value: 'Term' },
        { text: 'Overlap', value: 'Overlap' },
        { text: 'Adjusted p-value', value: 'Adjusted.P.value' },
        { text: 'Combined score', value: 'Combined.Score' },
        { text: 'Genes', value: 'data-table-expand' },
      ],
      enrichResult: [],
      selectedDatabase: '',
      expanded: [],
      allDatabases: [
        { name: 'KEGG pathway', value: 'KEGG' },
        { name: 'GO: molecular function', value: 'GO_Molecular_Function_2018' },
        { name: 'GO: cellular component', value: 'GO_Cellular_Component_2018' },
        { name: 'GO: biological process', value: 'GO_Biological_Process_2018' },
      ],
    }
  },

  methods: {
    async run() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'Please select regulon',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        this.enrichResult = await ApiService.postCommand(
          'deepmaps/api/queue/regulon-enrichment/',
          {
            genes: this.genes,
            database: this.selectedDatabase.value,
          }
        )
        await ApiService.sleep(2000)
        this.$nuxt.$loading.finish()
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
