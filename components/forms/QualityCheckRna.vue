<template>
  <v-col class="mb-2" cols="12">
    <v-card elevation="0">
      <v-row>
        <v-col cols="3">
          <v-card
            v-if="qcResult !== null"
            class="mt-2 pa-2"
            outlined
            elevation="0"
          >
            <v-card-text>
              <p class="subtitle-1 font-weight-bold text-center">
                Original data statistics
              </p>

              <p class="text--secondary">
                Cells: {{ qcResult.raw_n_cells[0] }}
              </p>
              <p class="text--secondary">
                Genes: {{ qcResult.raw_n_genes[0] }}
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
                Current data statistics
              </p>
              <p class="text--secondary">
                Cells: {{ qcResult.filter_n_cells[0] }}
              </p>
              <p class="text--secondary">
                Genes: {{ qcResult.filter_n_genes[0] }}
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
            <!--<v-row justify="center">
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
                  </v-row>-->
          </v-card>

          <v-card class="mt-4 pa-4" outlined>
            <p class="subtitle-1 font-weight-bold text-center">Preprocessing</p>
            <v-row>
              <v-col cols="4"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="cellFilter"
                      class="mr-2 pr-2"
                      dense
                      label="Cell filter"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span
                    >Cells with zero values in less than # cells are
                    removed</span
                  >
                </v-tooltip></v-col
              >
              <v-col cols="4"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="geneFilter"
                      class="mr-2 pr-2"
                      dense
                      label="Gene filter"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>
                    Cells with zero values in less than # genes are
                    removed</span
                  >
                </v-tooltip></v-col
              >
              <v-col cols="4"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="mitoFilter"
                      class="mr-2 pr-2"
                      dense
                      label="Mitocondrial genes filter"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>
                    Cells with more than # percent mitochondrial counts are
                    removed</span
                  >
                </v-tooltip></v-col
              >
              <v-col cols="12"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-select
                      v-model="normalizeSelect"
                      :items="normalizeMethods"
                      label="Normalization method"
                      @mouseenter.native="on.mouseenter"
                      @mouseleave.native="on.mouseleave"
                    ></v-select>
                  </template>
                  <p>Data Normalization method:</p>
                  <p>
                    LogNormalize: Seurat's default method which Normalizes the
                    gene expression measurements for each cell by the total
                    expression, multiplies this by a scale factor (10,000 by
                    default), and log-transforms the result.
                  </p>
                </v-tooltip></v-col
              >
            </v-row>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-checkbox
                  v-model="removeRibosome"
                  class="my-0 py-0"
                  :label="`Remove ribosomal genes`"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-checkbox>
              </template>
              <p>TODO</p>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-checkbox
                  v-model="removeSpikein"
                  class="my-0 py-0"
                  :label="`Remove spike-in genes`"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-checkbox>
              </template>
              <p>TODO</p>
            </v-tooltip>

            <v-row justify="center">
              <v-btn
                color="Primary"
                width="120"
                class="mb-2"
                @click="runPreProcess()"
                >Calculate</v-btn
              >
            </v-row>
          </v-card>
        </v-col>
        <v-col v-if="qcComplete !== false" cols="9">
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
            <boxplot :setting="layout[0]" :src="qcBox1"> </boxplot>
            <boxplot :setting="layout[1]" :src="qcBox2"> </boxplot>
            <boxplot :setting="layout[2]" :src="qcBox3"> </boxplot>
            <boxplot :setting="layout[3]" :src="qcBox4"> </boxplot>

            <var-genes-table :setting="layout[4]" :src="varGenesList">
            </var-genes-table>
            <barplot :setting="layout[5]" :src="qcHist1"></barplot>
            <barplot :setting="layout[6]" :src="qcHist2"></barplot>
            <barplot :setting="layout[7]" :src="qcHist3"></barplot>
            <gene-correlation-scatter
              :setting="layout[8]"
              :genes="genes"
            ></gene-correlation-scatter>

            <div>
              <div v-for="(item, pieIdx) in metaList" :key="pieIdx">
                <pie-chart
                  :setting="layout[pieIdx + 9]"
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
          w: 2,
          h: 1,
          i: '0',
          title: 'Number of total read counts per cell',
        },
        {
          x: 2,
          y: 0,
          w: 2,
          h: 1,
          i: '1',
          title: 'Number of expressed genes per cell',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '2',
          title: 'Mitocondrial genes percent',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '3',
          title: 'Ribosome genes percent',
        },
        {
          x: 4,
          y: 0,
          w: 2,
          h: 2,
          i: '4',
          title: 'Top variable genes',
        },
        {
          x: 0,
          y: 2,
          w: 2,
          h: 1,
          i: '5',
          title: 'Gene expression histogram',
        },
        {
          x: 2,
          y: 2,
          w: 2,
          h: 1,
          i: '6',
          title: 'Read counts histogram',
        },
        {
          x: 4,
          y: 2,
          w: 2,
          h: 1,
          i: '7',
          title: 'Number of expressed genes among cells',
        },

        {
          x: 0,
          y: 3,
          w: 2,
          h: 2,
          i: '8',
          title: 'Gene-gene correlation',
        },

        {
          x: 2,
          y: 3,
          w: 2,
          h: 2,
          i: '9',
        },
        {
          x: 4,
          y: 3,
          w: 2,
          h: 2,
          i: '10',
        },
        {
          x: 0,
          y: 5,
          w: 2,
          h: 2,
          i: '11',
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
  mounted() {
    if (this.jobid === 'example') {
      this.runPreProcess()
    }
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
            mode: 'RNA',
            min_cells: this.cellFilter,
            min_genes: this.geneFilter,
            nVariableFeatures: this.nVariableFeatures,
            percentMt: this.mitoFilter,
            removeRibosome: this.removeRibosome,
          }
        )
      } else if (this.type === 'multi_rna') {
        if (this.$route.params.id === 'example') {
          await sleep(6000)
        } else {
          await sleep(12000)
        }
        this.qcResult = await ApiService.postCommand(
          'deepmaps/api/queue/load-multi-rna/',
          {
            idx: this.idx,
            jobid: this.jobid,
            type: 'multiRna',
            mode: 'RNA',
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
            mode: 'RNA',
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
      this.$store.dispatch('calc/updateFlag', 'RNA')
      this.$nuxt.$loading.finish()
      this.qcComplete = true
    },
  },
}
</script>
