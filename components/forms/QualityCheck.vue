<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab title font-weight-bold text-center>Dataset 1 </v-tab>
      <v-tab v-show="false">Dataset 2 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined>
          <v-row>
            <v-col cols="3">
              <v-expansion-panels v-model="panel" multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    >Quality control</v-expansion-panel-header
                  >
                  <v-expansion-panel-content>
                    <v-card
                      v-if="qcResult !== null"
                      outlined
                      color="blue-grey lighten-5"
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
                        <div class="mb-2">
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
                                    href="https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_expression.csv"
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

                    <v-card class="mt-6" outlined color="blue-grey lighten-5">
                      <p class="subtitle-1 font-weight-bold text-center">
                        Preprocessing
                      </p>
                      <v-row class="ml-4"
                        ><p class="my-1title-h4">Cell filter</p>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Cells with zero values in less than # cells are
                            removed
                          </p> </v-tooltip
                        ><v-text-field
                          v-model="cellFilter"
                          class="mr-2 pr-2"
                          outlined
                          background-color="white"
                        ></v-text-field
                      ></v-row>

                      <v-row class="ml-4"
                        ><p class="my-1title-h4">Gene filter</p>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Cells with zero values in less than # genes are
                            removed
                          </p> </v-tooltip
                        ><v-text-field
                          v-model="geneFilter"
                          class="mr-2 pr-2"
                          outlined
                          background-color="white"
                        ></v-text-field
                      ></v-row>

                      <v-row class="ml-4"
                        ><p class="my-1title-h4">Mitochondrial filter</p>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Cells with more than # percent mitochondrial counts
                            are removed
                          </p> </v-tooltip
                        ><v-text-field
                          v-model="mitoFilter"
                          class="mr-2 pr-2"
                          outlined
                          background-color="white"
                        ></v-text-field
                      ></v-row>

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
                          background-color="white"
                        ></v-text-field
                      ></v-row>

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
                            LogNormalize: Seurat's default method which
                            Normalizes the gene expression measurements for each
                            cell by the total expression, multiplies this by a
                            scale factor (10,000 by default), and log-transforms
                            the result.
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

                      <v-checkbox v-model="removeRibosome" class="ml-4">
                        <template v-slot:label>
                          <div>
                            Ribosome genes removal
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              Remove ribosomal genes
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
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Cell selection
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-card class="mt-6" outlined color="blue-grey lighten-5">
                      <p class="subtitle-1 font-weight-bold text-center">
                        Cell selection
                      </p>

                      <v-row class="mx-2 my-2 py-2">
                        <div class="d-flex flex">
                          <v-text-field
                            v-model="selectionGeneName"
                            label="Gene"
                            placeholder="Name"
                            class="px-1"
                            outlined
                            dense
                            background-color="white"
                          ></v-text-field
                          ><v-select
                            v-model="selectionGeneDirection"
                            cols="3"
                            :items="selectionGeneDirectionItems"
                            label="Direction"
                            class="px-1"
                            outlined
                            dense
                            background-color="white"
                          ></v-select>
                          <v-text-field
                            v-model="selectionGeneThres"
                            label="Thres"
                            placeholder="Number"
                            class="px-1"
                            outlined
                            dense
                            background-color="white"
                          ></v-text-field>
                        </div>
                        <v-btn color="Primary" @click="addGeneSelection()"
                          >Add gene filter</v-btn
                        >
                        <div class="d-flex flex mt-2">
                          <v-select
                            v-model="selectionCategoryName"
                            cols="3"
                            :items="idents"
                            label="Category"
                            class="px-1 col-2"
                            outlined
                            dense
                            background-color="white"
                          ></v-select>
                          <v-select
                            v-model="selectionCategoryLevel"
                            cols="3"
                            :items="selectionCategoryLevels"
                            label="Cluster"
                            class="px-1 col-2"
                            outlined
                            dense
                            multiple
                            background-color="white"
                          ></v-select>
                        </div>
                        <v-btn color="Primary" @click="addClusterSelection()"
                          >Add cluster filter</v-btn
                        >

                        <v-col class="py-0" cols="12">
                          <p class="my-1">Selections applied:</p>
                          <ul>
                            <li
                              v-for="(item, index) in selectionPayload"
                              :key="index"
                            >
                              <div v-if="item.type === 'gene'">
                                {{ item.name }} {{ item.direction }}
                                {{ item.thres }}
                              </div>
                              <div v-if="item.type === 'cluster'">
                                {{ item.direction }} {{ item.category[0] }}:
                                {{ item.level }}
                              </div>
                            </li>
                          </ul></v-col
                        >
                      </v-row>

                      <v-row class="mx-2 my-2 py-2">
                        <v-btn
                          class="mx-2 my-4"
                          color="Accent"
                          @click="subsetCells()"
                          >Subset cells</v-btn
                        >
                        <v-btn
                          class="mx-2 my-4"
                          color="Accent"
                          @click="restoreCells()"
                          >Restore cells</v-btn
                        >
                      </v-row>
                    </v-card>
                  </v-expansion-panel-content>
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
                  :values="metadata.n_count_rna"
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
                  :values="metadata.n_feature_rna"
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
                  :values="metadata.pct_mito"
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
                  :values="metadata.pct_ribo"
                >
                </boxplot>
                <resize-image
                  :key="layout[4].i"
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                  :src="varGenesScatter"
                  :imagew="420"
                  :imageh="210"
                  :title="layout[4].title"
                >
                </resize-image>
                <resize-table
                  :key="layout[5].i"
                  :x="layout[5].x"
                  :y="layout[5].y"
                  :w="layout[5].w"
                  :h="layout[5].h"
                  :i="layout[5].i"
                  :src="varGenesList"
                  :title="layout[5].title"
                >
                </resize-table>
                <pie-chart
                  :key="layout[6].i"
                  :x="layout[6].x"
                  :y="layout[6].y"
                  :w="layout[6].w"
                  :h="layout[6].h"
                  :i="layout[6].i"
                  :values="metadata.meta1_val"
                  :name="metadata.meta1_name"
                  :title="metadata.meta1_title"
                ></pie-chart>
                <pie-chart
                  :key="layout[7].i"
                  :x="layout[7].x"
                  :y="layout[7].y"
                  :w="layout[7].w"
                  :h="layout[7].h"
                  :i="layout[7].i"
                  :values="metadata.meta2_val"
                  :name="metadata.meta2_name"
                  :title="metadata.meta2_title"
                ></pie-chart>
                <pie-chart
                  :key="layout[8].i"
                  :x="layout[8].x"
                  :y="layout[8].y"
                  :w="layout[8].w"
                  :h="layout[8].h"
                  :i="layout[8].i"
                  :values="metadata.meta3_val"
                  :name="metadata.meta3_name"
                  :title="metadata.meta3_title"
                ></pie-chart>
                <barplot
                  :key="layout[9].i"
                  :x="layout[9].x"
                  :y="layout[9].y"
                  :w="layout[9].w"
                  :h="layout[9].h"
                  :i="layout[9].i"
                  :src="qcHist1"
                  :title="layout[9].title"
                ></barplot>
                <barplot
                  :key="layout[10].i"
                  :x="layout[10].x"
                  :y="layout[10].y"
                  :w="layout[10].w"
                  :h="layout[10].h"
                  :i="layout[10].i"
                  :src="qcHist2"
                  :title="layout[10].title"
                ></barplot>
                <barplot
                  :key="layout[11].i"
                  :x="layout[11].x"
                  :y="layout[11].y"
                  :w="layout[11].w"
                  :h="layout[11].h"
                  :i="layout[11].i"
                  :src="qcHist3"
                  :title="layout[11].title"
                ></barplot>
              </grid-layout>
            </v-col>
            <v-col cols="7"></v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
import ResizeImage from '~/components/utils/ResizeImage'
import ResizeTable from '~/components/utils/ResizeTable'
import PieChart from '~/components/utils/PieChart'
import Boxplot from '~/components/utils/Boxplot'
import Barplot from '~/components/utils/Barplot'

import ApiService from '~/services/ApiService.js'

export default {
  components: {
    'resize-image': ResizeImage,
    'resize-table': ResizeTable,
    'pie-chart': PieChart,
    boxplot: Boxplot,
    barplot: Barplot,
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
          title: '# of genes per cell',
        },
        {
          x: 1,
          y: 0,
          w: 1,
          h: 1,
          i: '1',
          title: 'Total # of molecules per cell',
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
          x: 2,
          y: 3,
          w: 2,
          h: 1,
          i: '4',
          title: 'Highly variable genes',
        },
        {
          x: 4,
          y: 0,
          w: 2,
          h: 1,
          i: '5',
          title: 'Variable genes table',
        },
        {
          x: 0,
          y: 2,
          w: 2,
          h: 2,
          i: '6',
          title: 'Metadata: cell_type',
        },
        {
          x: 2,
          y: 2,
          w: 2,
          h: 1,
          i: '7',
          title: 'Metadata: Sex',
        },
        {
          x: 4,
          y: 2,
          w: 2,
          h: 1,
          i: '8',
          title: 'Metadata: Sample',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '9',
          title: '# of expressed genes in each cell',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '10',
          title: '# of read counts in each cell',
        },
        {
          x: 4,
          y: 1,
          w: 2,
          h: 1,
          i: '11',
          title: '# of cells for each gene',
        },
      ],
      tab: null,
      removeRibosome: false,
      title: '',
      cellFilter: '3',
      geneFilter: '200',
      mitoFilter: '10',
      normalization: 'LogNormalize',
      nVariableFeatures: '2000',
      timeElapsed: '',
      normalizeSelect: 'LogNormalize',
      normalizeMethods: ['LogNormalize'],
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
      pie1: '',
      varGenesScatter: '',
      varGenesList: [],
      metadata: [],
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
    async runPreProcess() {
      this.$notifier.showMessage({
        content: 'Running QC metrics...',
        color: 'accent',
      })
      this.varGenesList = []
      this.pie1 = this.varGenesScatter =
        'https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp'
      this.qcResult = await ApiService.postCommand('iris3/api/queue/load/', {
        filename: 'Zeisel_expression.fst',
        type: 'CellGene',
        min_cells: this.cellFilter,
        min_genes: this.geneFilter,
        nVariableFeatures: this.nVariableFeatures,
        percentMt: this.mitoFilter,
        removeRibosome: this.removeRibosome,
      })

      this.varGenesList = await ApiService.postCommand(
        'iris3/api/queue/var-genes-list/'
      )
      console.log(this.varGenesList)
      this.qcBox1 = this.varGenesList[1].map((item) => item.n_reads_per_cell)
      this.qcBox2 = this.varGenesList[1].map((item) => item.n_genes_per_cell)
      this.qcBox3 = this.varGenesList[1].map((item) => item.pct_ribo_per_gene)
      this.qcBox4 = this.varGenesList[1].map((item) => item.pct_mito_per_gene)
      this.qcBox5 = this.varGenesList[0].map((item) => item.n_cells_per_gene)
      this.qcHist1 = this.varGenesList[2]
      this.qcHist2 = this.varGenesList[3]
      this.qcHist3 = this.varGenesList[4]
      this.qcComplete = true
    },
  },
}
</script>
