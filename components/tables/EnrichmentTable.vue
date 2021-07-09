<template>
  <v-card class="ma-0" @mouseover="hover = true" @mouseleave="hover = false"
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
      <v-card-title class="grey lighten-3 font-weight-bold caption px-2 py-1"
        >Gene set enrichment analysis <v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Gene set enrichment analysis: to be updated</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="1">
                <download-excel class="mr-4" :data="gseaResult" type="csv">
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

          <v-col v-show="selectedTool === 'GSEA'" cols="3">
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
          <v-col v-show="selectedTool === 'Enrichr'" cols="3">
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
          <v-col cols="3">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="selectedDirection"
                  class="px-0"
                  dense
                  :items="allDirections"
                  label="Direction"
                  return-object
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-select>
              </template>
              <p>
                Only use up-regulated genes, down-regulated genes, or all genes
                (all directions by default)
              </p>
            </v-tooltip>
          </v-col>
          <v-col cols="3"
            ><v-btn small @click="runEnrichment()">Calculate</v-btn></v-col
          ></v-row
        >

        <div v-if="gseaResult.length">
          <v-data-table
            dense
            :headers="gseaHeaders"
            :items="gseaResult"
            item-key="name"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :height="tableHeight"
            :max-height="maxHeight"
            :items-per-page="10"
            class="elevation-0"
          ></v-data-table>
        </div>
        <div v-if="enrichResult.length">
          <v-row>
            <v-col cols="6"
              ><v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                dense
              ></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-btn small @click="dialog = true">Visualize</v-btn></v-col
            >
          </v-row>
          <v-data-table
            dense
            :search="search"
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
    >
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title class="grey lighten-3 font-weight-bold">
          Visualize gene set enrichment result
        </v-card-title>

        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="3">
              <v-tooltip top max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-select
                    v-model="selectedPlot"
                    class="px-0"
                    dense
                    :items="allPlots"
                    label="Plot type"
                    return-object
                    item-text="name"
                    item-value="value"
                    @mouseenter.native="on.mouseenter"
                    @mouseleave.native="on.mouseleave"
                    @change="clearPlot()"
                  >
                  </v-select>
                </template>
                <p>Plot type</p>
              </v-tooltip>
            </v-col>
            <template v-if="selectedPlot.value === 'gsea'">
              <v-col v-if="selectedPlot.value === 'gsea'" cols="3"
                ><v-btn small @click="runGseaPlot()">Draw</v-btn></v-col
              >
              <v-card-text
                ><v-row>
                  <v-col cols="6"
                    ><v-text-field
                      v-model="search"
                      prepend-icon="mdi-magnify"
                      label="Search"
                      single-line
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-data-table
                  v-model="selectedManualTerms"
                  dense
                  :single-select="true"
                  :height="tableHeight"
                  :headers="headers"
                  :items="enrichResult"
                  item-key="Term"
                  :items-per-page="10"
                  class="elevation-0"
                  :expanded.sync="expanded"
                  show-expand
                  show-select
                >
                  <template v-slot:expanded-item="{ item }">
                    <td :colspan="headers.length">
                      {{ item.Genes }}
                    </td>
                  </template></v-data-table
                >
              </v-card-text>
            </template>
            <template v-else>
              <v-col cols="3">
                <v-tooltip top max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-select
                      v-model="selectedPlotNumber"
                      class="px-0"
                      dense
                      :items="allPlotNumbers"
                      label="Which terms to display"
                      return-object
                      item-text="name"
                      item-value="value"
                      @mouseenter.native="on.mouseenter"
                      @mouseleave.native="on.mouseleave"
                    >
                    </v-select>
                  </template>
                  <p>Plot type</p>
                </v-tooltip>
              </v-col>
              <v-col v-if="selectedPlotNumber.value === 'top'" cols="6">
                <v-slider
                  v-model="topN"
                  :max="50"
                  :min="1"
                  step="1"
                  thumb-label
                  label="Top N terms to show"
                  dense
                ></v-slider>
              </v-col>

              <v-col cols="3"
                ><v-checkbox
                  v-model="isPvalLog"
                  class="px-0 ma-0"
                  dense
                  :label="`Log transform p-values: ${isPvalLog.toString()}`"
                ></v-checkbox
              ></v-col>
              <v-col cols="3"
                ><v-btn small @click="runEnrichrPlot()">Calculate</v-btn></v-col
              >
              <v-col v-if="selectedPlotNumber.value === 'manual'" cols="12">
                <v-row>
                  <v-col cols="6"
                    ><v-text-field
                      v-model="search"
                      prepend-icon="mdi-magnify"
                      label="Search"
                      single-line
                      dense
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-data-table
                  v-model="selectedManualTerms"
                  dense
                  :height="tableHeight"
                  :headers="headers"
                  :items="enrichResult"
                  item-key="Term"
                  :items-per-page="10"
                  class="elevation-0"
                  :expanded.sync="expanded"
                  show-expand
                  show-select
                >
                  <template v-slot:expanded-item="{ item }">
                    <td :colspan="headers.length">
                      {{ item.Genes }}
                    </td>
                  </template></v-data-table
                >
              </v-col>
              <v-card-text
                ><ol class="my-0 py-0">
                  <v-list-item-title>Selected terms:</v-list-item-title>
                  <li
                    v-for="(item, index) in selectedTerms"
                    :key="index"
                    class="my-0 py-0"
                  >
                    <div v-if="enrichResult.length">
                      {{ item.Term }}
                    </div>
                  </li>
                </ol></v-card-text
              >
            </template>
          </v-row>
        </v-card-text>

        <div v-show="plot">
          <v-divider></v-divider>
          <v-img contain :src="plot"></v-img>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog></v-card
  >
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
      dialog: false,
      search: '',
      expanded: [],
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
      allTools: ['Enrichr', 'GSEA'],
      selectedTool: 'Enrichr',
      selectedDatabase: 'KEGG',
      allDatabases: [
        { name: 'KEGG pathway', value: 'KEGG' },
        { name: 'GO: molecular function', value: 'GO_Molecular_Function_2018' },
        { name: 'GO: cellular component', value: 'GO_Cellular_Component_2018' },
        { name: 'GO: biological process', value: 'GO_Biological_Process_2018' },
      ],
      selectedDirection: 'all',
      allDirections: ['up', 'down', 'all'],

      // Plots
      isPvalLog: true,
      plot: '',
      selectedPlot: { name: 'Dot plot', value: 'dot' },
      allPlots: [
        { name: 'Dot plot', value: 'dot' },
        { name: 'Bar plot', value: 'bar' },
        // { name: 'GSEA enrichment plot', value: 'gsea' },
      ],
      topN: 10,
      selectedPlotNumber: { name: 'Top N', value: 'top' },
      allPlotNumbers: [
        { name: 'Top N', value: 'top' },
        { name: 'Select manually ', value: 'manual' },
      ],
      selectedManualTerms: [],
    }
  },
  computed: {
    ...mapState({
      deg: (state) => state.calc.deg,
    }),
    genes() {
      if (this.selectedDirection === 'up') {
        return this.deg
          .filter((row) => row.avg_log2FC > 0)
          .map((row) => row.gene)
      } else if (this.selectedDirection === 'down') {
        return this.deg
          .filter((row) => row.avg_log2FC > 0)
          .map((row) => row.gene)
      } else {
        return this.deg.map((row) => row.gene)
      }
    },
    selectedTerms() {
      if (this.selectedPlotNumber.value === 'top') {
        return this.enrichResult.slice(0, this.topN)
      } else {
        return this.selectedManualTerms
      }
    },
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
        await ApiService.sleep(1000)
        this.$store.dispatch('calc/updateGsea', this.gseaResult)
        this.$nuxt.$loading.finish()
      }
    },
    async runEnrichr() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'Please run differential gene expression analysis first',
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
        await ApiService.sleep(1000)
        this.$store.dispatch('calc/updateEnrichr', this.enrichResult)

        this.$nuxt.$loading.finish()
      }
    },
    updateTopResult() {
      return this.enrichResult.slice(0, this.topN)
    },
    async runDotplot() {
      this.plot = await ApiService.postCommand(
        'deepmaps/api/queue/run-r-static/',
        {
          type: 'enrichment-dotplot',
          df: this.selectedTerms,
          isPvalLog: this.isPvalLog.toString(),
        }
      )
    },
    async runBarplot() {
      this.plot = await ApiService.postCommand(
        'deepmaps/api/queue/run-r-static/',
        {
          type: 'enrichment-barplot',
          df: this.selectedTerms,
          isPvalLog: this.isPvalLog.toString(),
        }
      )
    },
    async runGseaPlot() {
      if (
        !this.selectedManualTerms.length ||
        this.selectedManualTerms.length > 1
      ) {
        this.$notifier.showMessage({
          content: 'Please select only one term',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        this.plot = await ApiService.postCommand(
          'deepmaps/api/queue/run-r-static/',
          {
            type: 'enrichment-gsea-plot',
            term: '123',
          }
        )
        this.$nuxt.$loading.finish()
      }
    },
    async runEnrichrPlot() {
      if (this.selectedTerms.length > 50) {
        this.$notifier.showMessage({
          content: 'Terms should be less than 50',
          color: 'error',
        })
      } else if (this.selectedTerms.length < 1) {
        this.$notifier.showMessage({
          content: 'Please select terms',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        switch (this.selectedPlot.value) {
          case 'dot':
            await this.runDotplot()
            break
          case 'bar':
            await this.runBarplot()
            break
          default:
            this.$notifier.showMessage({
              content: 'Please select terms',
              color: 'error',
            })
        }
        this.$nuxt.$loading.finish()
      }
    },

    clearPlot() {
      this.selectedManualTerms = []
      this.plot = ''
    },
    async runEnrichment() {
      this.gseaResult = this.enrichResult = []
      this.selectedTool === 'Enrichr' && (await this.runEnrichr())
      this.selectedTool === 'GSEA' && (await this.runGSEA())
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
