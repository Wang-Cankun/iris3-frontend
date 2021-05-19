<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Quality control
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card
                  v-if="qcResult !== null"
                  outlined
                  color="grey lighten-3"
                >
                  <v-card-text>
                    <p class="subtitle-1 font-weight-bold text-center">
                      Original data statistics
                    </p>

                    <p class="text--secondary">
                      Cell number: {{ qcResult.raw_n_cells[0] }}
                    </p>
                    <p class="text--secondary">
                      Gene number: {{ qcResult.raw_n_genes[0] }}
                    </p>
                    <p class="text--secondary">
                      Average expression level:
                      {{ qcResult.raw_mean_expr[0] }}
                    </p>
                    <p class="text--secondary">
                      Zero expression percentage:
                      {{ qcResult.raw_percent_zero[0] }}
                    </p>
                    <p class="subtitle-1 font-weight-bold text-center">
                      Current data statistics:
                    </p>
                    <p class="text--secondary">
                      Cell number: {{ qcResult.filter_n_cells[0] }}
                    </p>
                    <p class="text--secondary">
                      Gene number: {{ qcResult.filter_n_genes[0] }}
                    </p>
                    <p class="text--secondary">
                      Average expression level:
                      {{ qcResult.filter_mean_expr[0] }}
                    </p>
                    <p class="text--secondary">
                      Zero expression percentage:
                      {{ qcResult.filter_percent_zero[0] }}
                    </p>
                  </v-card-text>
                  <v-row justify="center">
                    <div class="mb-6">
                      <v-menu close-on-click>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on"> Download </v-btn>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-title>
                              <a class="text-decoration-none" href="1">
                                Save as TXT format</a
                              ></v-list-item-title
                            >
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>
                              <a
                                class="text-decoration-none"
                                href="https://bmbl.bmi.osumc.edu/deepmaps/storage/Zeisel_expression.csv"
                              >
                                Save as CSV format</a
                              ></v-list-item-title
                            >
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>
                              <a class="text-decoration-none" href="2">
                                Save as MTX format</a
                              ></v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-row>
                </v-card>

                <v-card class="mt-6" outlined color="grey lighten-3">
                  <p class="subtitle-1 font-weight-bold text-center">
                    Preprocessing
                  </p>
                  <v-row class="ml-4"
                    ><p class="my-1 title-h4">Cell filter</p>
                    <v-tooltip top class="my-0 py-0">
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>
                        Cells with zero values in less than # cells are removed
                      </p> </v-tooltip
                    ><v-text-field
                      v-model="cellFilter"
                      class="mr-2 pr-2"
                      outlined
                      dense
                      background-color="white"
                    ></v-text-field
                  ></v-row>

                  <v-row class="ml-4"
                    ><p class="my-1 title-h4">Gene filter</p>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>
                        Cells with zero values in less than # genes are removed
                      </p> </v-tooltip
                    ><v-text-field
                      v-model="geneFilter"
                      class="mr-2 pr-2"
                      outlined
                      dense
                      background-color="white"
                    ></v-text-field
                  ></v-row>

                  <v-row class="ml-4"
                    ><p class="my-1 title-h4">Mitochondrial filter</p>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }" class="ma-0 pa-0">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>
                        Cells with more than # percent mitochondrial counts are
                        removed
                      </p> </v-tooltip
                    ><v-text-field
                      v-model="mitoFilter"
                      class="mr-2 pr-2"
                      outlined
                      dense
                      background-color="white"
                    ></v-text-field
                  ></v-row>
                  <!--
                  <v-row class="ml-4"
                    ><p class="my-1 title-h4">Top variable genes</p>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>
                        Select a subset of features that exhibit high
                        cell-to-cell variation in the dataset
                      </p> </v-tooltip
                    ><v-text-field
                      v-model="nVariableFeatures"
                      class="mr-2 pr-2"
                      outlined
                      dense
                      background-color="white"
                    ></v-text-field
                  ></v-row>
                  -->

                  <v-row class="ml-4 mb-0 py-0"
                    ><p class="my-1 title-h4">Normalization</p>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>Data Normalization methods:</p>
                      <p>
                        LogNormalize: Seurat's default method which Normalizes
                        the gene expression measurements for each cell by the
                        total expression, multiplies this by a scale factor
                        (10,000 by default), and log-transforms the result.
                      </p>
                    </v-tooltip></v-row
                  >
                  <v-col class="ml-4 py-0" cols="11"
                    ><v-select
                      v-model="normalizeSelect"
                      :items="normalizeMethods"
                      label=""
                    ></v-select
                  ></v-col>

                  <v-checkbox v-model="removeRibosome" class="ml-4 my-0 py-0">
                    <template v-slot:label>
                      <div>
                        Remove ribosome genes
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          Remove ribosome genes#
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                  <v-checkbox v-model="removeSpikein" class="ml-4 my-0 py-0">
                    <template v-slot:label>
                      <div>
                        Remove spike-in genes
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          Remove spike-in genes
                        </v-tooltip>
                      </div>
                    </template>
                  </v-checkbox>
                  <v-row justify="center">
                    <v-btn
                      color="Primary"
                      width="150"
                      rounded
                      class="mb-4 pa-2"
                      @click="runPreProcess()"
                      >Update</v-btn
                    >
                  </v-row>
                </v-card></v-expansion-panel-content
              >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col v-if="qcComplete !== false" cols="9"
          ><p v-if="timeElapsed != ''">
            Execute time: {{ timeElapsed }} seconds
          </p>
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
            <boxplot
              :key="layout[0].i"
              :x="layout[0].x"
              :y="layout[0].y"
              :w="layout[0].w"
              :h="layout[0].h"
              :i="layout[0].i"
              :src="qcBox1"
              :title="layout[0].title"
            >
            </boxplot>
            <boxplot
              :key="layout[1].i"
              :x="layout[1].x"
              :y="layout[1].y"
              :w="layout[1].w"
              :h="layout[1].h"
              :i="layout[1].i"
              :src="qcBox2"
              :title="layout[1].title"
            >
            </boxplot>
            <boxplot
              :key="layout[2].i"
              :x="layout[2].x"
              :y="layout[2].y"
              :w="layout[2].w"
              :h="layout[2].h"
              :i="layout[2].i"
              :src="qcBox3"
              :title="layout[2].title"
            >
            </boxplot>
            <boxplot
              :key="layout[3].i"
              :x="layout[3].x"
              :y="layout[3].y"
              :w="layout[3].w"
              :h="layout[3].h"
              :i="layout[3].i"
              :src="qcBox4"
              :title="layout[3].title"
            >
            </boxplot>

            <var-genes-table
              :key="layout[4].i"
              :x="layout[4].x"
              :y="layout[4].y"
              :w="layout[4].w"
              :h="layout[4].h"
              :i="layout[4].i"
              :src="varGenesList"
              :title="layout[4].title"
            >
            </var-genes-table>
            <barplot
              :key="layout[5].i"
              :x="layout[5].x"
              :y="layout[5].y"
              :w="layout[5].w"
              :h="layout[5].h"
              :i="layout[5].i"
              :src="qcHist1"
              :title="layout[5].title"
            ></barplot>
            <barplot
              :key="layout[6].i"
              :x="layout[6].x"
              :y="layout[6].y"
              :w="layout[6].w"
              :h="layout[6].h"
              :i="layout[6].i"
              :src="qcHist2"
              :title="layout[6].title"
            ></barplot>
            <barplot
              :key="layout[7].i"
              :x="layout[7].x"
              :y="layout[7].y"
              :w="layout[7].w"
              :h="layout[7].h"
              :i="layout[7].i"
              :src="qcHist3"
              :title="layout[7].title"
            ></barplot>
            <resize-image
              :key="layout[8].i"
              :x="layout[8].x"
              :y="layout[8].y"
              :w="layout[8].w"
              :h="layout[8].h"
              :i="layout[8].i"
              :src="varGenesScatter"
              :imagew="450"
              :imageh="220"
              :title="layout[8].title"
            >
            </resize-image>
            <gene-correlation-scatter
              :key="layout[9].i"
              :x="layout[9].x"
              :y="layout[9].y"
              :w="layout[9].w"
              :h="layout[9].h"
              :i="layout[9].i"
              :genes="genes"
            ></gene-correlation-scatter>

            <div>
              <div v-for="(item, pieIdx) in metaList" :key="pieIdx">
                <pie-chart
                  :x="layout[pieIdx + 10].x"
                  :y="layout[pieIdx + 10].y"
                  :w="layout[pieIdx + 10].w"
                  :h="layout[pieIdx + 10].h"
                  :i="layout[pieIdx + 10].i"
                  :values="item.val"
                  :name="item.name"
                  :title="'Metadata: ' + item.title[0]"
                ></pie-chart>
              </div>
            </div>
          </grid-layout>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import ResizeImage from '~/components/figures/ResizeImage'
import VarGenesTable from '~/components/tables/VarGenesTable'
import PieChart from '~/components/figures/PieChart'
import Boxplot from '~/components/figures/Boxplot'
import Barplot from '~/components/figures/Barplot'
import GeneCorrelationScatter from '~/components/figures/GeneCorrelationScatter'

import ApiService from '~/services/ApiService.js'
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  components: {
    'resize-image': ResizeImage,
    'var-genes-table': VarGenesTable,
    'pie-chart': PieChart,
    boxplot: Boxplot,
    barplot: Barplot,
    'gene-correlation-scatter': GeneCorrelationScatter,
  },
  props: {
    idx: { type: Number, required: true, default: 0 },
    jobid: { type: String, required: true, default: '1' },
    type: { type: String, required: true, default: 'single_rna' },
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 1,
          h: 1,
          i: '0',
          title: 'Number of total read counts per cell',
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: '1',
          title: 'Number of expressed genes per cell',
        },
        {
          x: 2,
          y: 0,
          w: 1,
          h: 1,
          i: '2',
          title: 'Mitocondrial genes percent',
        },
        {
          x: 3,
          y: 0,
          w: 1,
          h: 1,
          i: '3',
          title: 'Ribosome genes percent',
        },
        {
          x: 4,
          y: 0,
          w: 2,
          h: 1,
          i: '4',
          title: 'Variable genes table',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '5',
          title: 'Gene expression histogram',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '6',
          title: 'Read counts histogram',
        },
        {
          x: 4,
          y: 1,
          w: 2,
          h: 1,
          i: '7',
          title: 'Number of expressed genes among cells',
        },

        {
          x: 0,
          y: 2,
          w: 2,
          h: 2,
          i: '8',
          title: 'Highly variable genes',
        },

        {
          x: 2,
          y: 2,
          w: 2,
          h: 2,
          i: '9',
          title: 'Gene-gene correlation',
        },
        {
          x: 4,
          y: 2,
          w: 2,
          h: 2,
          i: '10',
          title: 'Metadata: 1',
        },
        {
          x: 0,
          y: 4,
          w: 2,
          h: 2,
          i: '11',
          title: 'Metadata: 2',
        },
        {
          x: 2,
          y: 4,
          w: 2,
          h: 2,
          i: '12',
          title: 'Metadata: 3',
        },
      ],
      nPie: 1,
      tab: null,
      removeRibosome: false,
      removeSpikein: false,
      title: '',
      cellFilter: '3',
      geneFilter: '200',
      mitoFilter: '10',
      normalization: 'LogNormalize',
      nVariableFeatures: '2000',
      timeElapsed: '',
      normalizeSelect: 'LogNormalize',
      normalizeMethods: ['LogNormalize', 'sctransform'],
      qcResult: null,
      qcComplete: false,
      qcBox1: [],
      qcBox2: [],
      qcBox3: [],
      qcBox4: [],
      qcBox5: [],
      qcHist1: [],
      qcHist2: [],
      qcHist3: [],
      varGenesScatter: '',
      varGenesList: [],
      metadata: [],
      metaList: [],
      // Cell selection
      addTransferMetadataDialog: false,
      addMetadataDialog: false,
      idents: [],
      panel: [0],
      displayAddMetadata: '',
      addCategoryName: '',
      activeCategory: '',
      activeCategoryLevels: [],
      filterCategoryName: '',
      filterCategoryLevel: '',
      filterPayload: [],
      selectionGeneName: '',
      selectionGeneDirection: '>',
      selectionGeneDirectionItems: ['>', '<', '='],
      selectionGeneThres: '',
      selectionCategoryName: '',
      selectionCategoryLevel: '',
      selectionPayload: [],
      allIdents: [],
      selectedCells: [],
      genes: '',
    }
  },
  computed: {
    filterCategoryLevels() {
      return this.allIdents
        .filter((item) => item.ident === this.filterCategoryName)
        .map((item) => item.levels)
        .flat()
    },
    selectionCategoryLevels() {
      return this.allIdents
        .filter((item) => item.ident === this.selectionCategoryName)
        .map((item) => item.levels)
        .flat()
    },
  },
  methods: {
    addItem() {
      // Add a new item. It must have a unique key!
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 6),
        y: this.layout.length + (this.colNum || 6), // puts it at the bottom
        w: 2,
        h: 2,
        i: this.index,
      })
      // Increment the counter to ensure key is always unique.
      this.index++
    },

    addGeneSelection() {
      if (this.selectionGeneName && this.selectionGeneThres) {
        this.selectionPayload = [
          {
            type: 'gene',
            name: this.selectionGeneName,
            direction: this.selectionGeneDirection,
            thres: this.selectionGeneThres,
          },
          ...this.selectionPayload,
        ]

        this.$notifier.showMessage({
          content: `Added filter: ${this.selectionGeneName} ${this.selectionGeneDirection} ${this.selectionGeneThres}`,
          color: 'success',
        })
        this.selectionGeneName = this.selectionGeneThres = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid gene filter...',
          color: 'error',
        })
      }

      return 1
    },
    addClusterSelection() {
      if (this.selectionCategoryName && this.selectionCategoryLevel) {
        for (const categoryLevel of this.selectionCategoryLevel) {
          this.selectionPayload = [
            {
              type: 'cluster',
              direction: this.selectionMetaDirection,
              category: this.selectionCategoryName,
              level: categoryLevel,
            },
            ...this.selectionPayload,
          ]
        }

        this.$notifier.showMessage({
          content: `Added filter: ${this.selectionCategoryName} ${this.selectionCategoryLevel}`,
          color: 'success',
        })
        this.selectionCategoryName = this.selectionCategoryLevel = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid cluster filter...',
          color: 'error',
        })
      }
      return 1
    },

    async runPreProcess() {
      this.metadata = []
      this.$nuxt.$loading.start()
      if (this.idx === 0 && this.type === 'single_rna') {
        this.qcResult = await ApiService.postCommand(
          'deepmaps/api/queue/load/',
          {
            idx: this.idx,
            jobid: this.jobid,
            type: 'singleRna',
            min_cells: this.cellFilter,
            min_genes: this.geneFilter,
            nVariableFeatures: this.nVariableFeatures,
            percentMt: this.mitoFilter,
            removeRibosome: this.removeRibosome,
          }
        )
      } else if (this.type === 'multi_rna') {
        if (this.$route.params.id === 'example') {
          await sleep(8000)
        } else {
          await sleep(30000)
        }
        this.qcResult = await ApiService.postCommand(
          'deepmaps/api/queue/load-multi-rna/',
          {
            idx: this.idx,
            jobid: this.jobid,
            type: 'multiRna',
            min_cells: this.cellFilter,
            min_genes: this.geneFilter,
            nVariableFeatures: this.nVariableFeatures,
            percentMt: this.mitoFilter,
            removeRibosome: this.removeRibosome,
          }
        )
      } else if (this.type === 'multiome') {
        this.qcResult = await ApiService.postCommand(
          'deepmaps/api/queue/load-multiome/',
          {
            idx: this.idx,
            jobid: this.jobid,
            type: 'multiome',
            min_cells: this.cellFilter,
            min_genes: this.geneFilter,
            nVariableFeatures: this.nVariableFeatures,
            percentMt: this.mitoFilter,
            removeRibosome: this.removeRibosome,
          }
        )
      }

      this.metadata = await ApiService.postCommand(
        'deepmaps/api/queue/var-genes-list/'
      )
      this.varGenesList = this.metadata.gene_result
      this.qcBox5 = this.metadata.cell_result.map((e) => e.n_cells_per_gene)
      this.qcBox1 = this.metadata.cell_result.map((e) => e.n_reads_per_cell)
      this.qcBox2 = this.metadata.cell_result.map((e) => e.n_features_per_cell)
      this.qcBox3 = this.metadata.cell_result.map((e) => e.pct_ribo_per_gene)
      this.qcBox4 = this.metadata.cell_result.map((e) => e.pct_mito_per_gene)
      this.qcHist1 = this.metadata.hist_features_per_cell
      this.qcHist2 = this.metadata.hist_reads_per_cell
      this.qcHist3 = this.metadata.hist_cells_per_gene
      this.metaList = this.metadata.meta_list
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
      })

      this.varGenesScatter = await ApiService.postCommand(
        'deepmaps/api/queue/var-genes-plot/'
      )
      await this.$axios.post('deepmaps/api/queue/genes/').then((response) => {
        this.genes = response.data
      })
      this.$nuxt.$loading.finish()
      this.qcComplete = true
    },
  },
}
</script>
