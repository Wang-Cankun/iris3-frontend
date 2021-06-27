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
            <p>Enrichment analysis for regulon genes</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="1">
                <download-excel class="mr-4" :data="enrichResult" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-row class="mt-2">
          <v-col cols="3">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-autocomplete
                  v-model="selectedTool"
                  class="ml-4"
                  dense
                  :items="allTools"
                  label="Tool"
                  return-object
                  item-text="name"
                  item-value="value"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-autocomplete>
              </template>
              <span>Select tool</span>
            </v-tooltip>
          </v-col>
          <v-col v-show="selectedTool === 'GSEA'" cols="4">
            <v-tooltip top max-width="500px">
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
              <span
                >Molecular Signatures Database (MSigDB) is a collection of
                annotated gene sets for use with GSEA software</span
              >
            </v-tooltip>
          </v-col>
          <v-col v-show="selectedTool === 'Enrichr'" cols="4">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-autocomplete
                  v-model="selectedDatabase"
                  class="ml-4"
                  dense
                  :items="allDatabases"
                  label="Database"
                  :search="search"
                  return-object
                  item-text="name"
                  item-value="value"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-autocomplete>
              </template>
              <p>
                KEGG: a collection of databases dealing with genomes, biological
                pathways, diseases, drugs, and chemical substances
              </p>
              <p>
                Gene Ontology (GO): a major bioinformatics initiative to unify
                the representation of gene and gene product attributes across
                all species
              </p>
            </v-tooltip>
          </v-col>
          <v-col cols="4"
            ><v-btn small @click="runEnrichment()">Calculate</v-btn></v-col
          ></v-row
        >
        <div v-if="enrichResult.length">
          <v-data-table
            dense
            :height="tableHeight"
            :headers="headers"
            :items="enrichResult"
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
      search: '',
      tableHeight: 435,
      footerHeight: 180,
      headers: [
        { text: 'Term', value: 'Term' },
        { text: 'Overlap', value: 'Overlap' },
        { text: 'Adjusted p-value', value: 'Adjusted.P.value' },
        { text: 'Combined score', value: 'Combined.Score' },
        { text: 'Genes', value: 'data-table-expand' },
      ],
      gseaHeaders: [
        { text: 'pathway', value: 'pathway' },
        { text: 'Adjusted p-value', value: 'padj' },
        { text: 'NES', value: 'NES' },
        { text: 'size', value: 'size' },
        { text: '', value: 'data-table-expand' },
      ],
      gseaResult: [],
      enrichResult: [],
      selectedDatabase: '',
      expanded: [],
      allDatabases: [
        { name: 'KEGG pathway', value: 'KEGG' },
        { name: 'GO: molecular function', value: 'GO_Molecular_Function_2018' },
        { name: 'GO: cellular component', value: 'GO_Cellular_Component_2018' },
        { name: 'GO: biological process', value: 'GO_Biological_Process_2018' },
      ],
      allTools: ['Enrichr', 'GSEA'],
      selectedTool: 'GSEA',
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
    }
  },

  methods: {
    async runGSEA() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'Please select regulon first',
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
        await ApiService.sleep(1000)
        this.$nuxt.$loading.finish()
      }
    },
    async runEnrichr() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'Please select regulon first',
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
    async runEnrichment() {
      this.gseaResult = this.enrichResult = []
      this.selectedTool === 'Enrichr' && (await this.runEnrichr())
      this.selectedTool === 'GSEA' && (await this.runGSEA())
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
