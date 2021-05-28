<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-card v-if="qcResult !== null" outlined class="pa-2">
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
                Current data statistics
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
              <v-col cols="6"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="cellFilter"
                      class="mr-2 pr-2"
                      dense
                      label="Minimal cells per peaks"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>Minimal cells per peaks</span>
                </v-tooltip></v-col
              >

              <v-col cols="6"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="nVariableFeatures"
                      class="mr-2 pr-2"
                      dense
                      label="Maximal black region ratio"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span> Maximal black region ratio</span>
                </v-tooltip></v-col
              >
              <v-col cols="6"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="minPeaks"
                      class="mr-2 pr-2"
                      dense
                      label="Minimal peaks per cell"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span> Minimal peaks per cell</span>
                </v-tooltip></v-col
              >
              <v-col cols="6"
                ><v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="maxPeaks"
                      class="mr-2 pr-2"
                      dense
                      label="Minimal peaks per cell"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span> Minimal peaks per cell</span>
                </v-tooltip></v-col
              >
            </v-row>

            <v-row justify="center">
              <v-btn
                color="Primary"
                width="120"
                class="mb-4 pa-2"
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
            <boxplot
              :key="layout[4].i"
              :x="layout[4].x"
              :y="layout[4].y"
              :w="layout[4].w"
              :h="layout[4].h"
              :i="layout[4].i"
              :src="qcBox5"
              :title="layout[4].title"
            >
            </boxplot>
            <barplot
              :key="layout[5].i"
              :x="layout[5].x"
              :y="layout[5].y"
              :w="layout[5].w"
              :h="layout[5].h"
              :i="layout[5].i"
              :src="qcHist4"
              :title="layout[5].title"
            ></barplot>
            <barplot
              :key="layout[6].i"
              :x="layout[6].x"
              :y="layout[6].y"
              :w="layout[6].w"
              :h="layout[6].h"
              :i="layout[6].i"
              :src="qcHist1"
              :title="layout[6].title"
            ></barplot>
            <barplot
              :key="layout[7].i"
              :x="layout[7].x"
              :y="layout[7].y"
              :w="layout[7].w"
              :h="layout[7].h"
              :i="layout[7].i"
              :src="qcHist2"
              :title="layout[7].title"
            ></barplot>
            <barplot
              :key="layout[8].i"
              :x="layout[8].x"
              :y="layout[8].y"
              :w="layout[8].w"
              :h="layout[8].h"
              :i="layout[8].i"
              :src="qcHist3"
              :title="layout[8].title"
            ></barplot>
          </grid-layout>
        </v-col>
        <v-col cols="7"></v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import Boxplot from '~/components/figures/Boxplot'
import Barplot from '~/components/figures/Barplot'

import ApiService from '~/services/ApiService.js'

export default {
  components: {
    boxplot: Boxplot,
    barplot: Barplot,
  },
  props: {
    idx: { type: Number, required: true, default: 0 },
    jobid: { type: String, required: true, default: '1' },
    type: { type: String, required: true, default: 'multiome' },
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
          title: 'Number of expressed peaks per cell',
        },
        {
          x: 4,
          y: 0,
          w: 2,
          h: 1,
          i: '2',
          title: 'Number of ATAC peak fragments per cell',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '3',
          title: 'Blacklist ratio',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '4',
          title: 'Percent of reads in peaks',
        },
        {
          x: 4,
          y: 1,
          w: 2,
          h: 1,
          i: '5',
          title: 'TSS enrichment',
        },
        {
          x: 0,
          y: 1,
          w: 2,
          h: 1,
          i: '6',
          title: 'Number of peaks in each cell',
        },
        {
          x: 2,
          y: 1,
          w: 2,
          h: 1,
          i: '7',
          title: 'Number of total reads in each cell',
        },
        {
          x: 4,
          y: 2,
          w: 2,
          h: 1,
          i: '8',
          title: 'Number of ATAC fragments',
        },
      ],
      tab: null,
      removeRibosome: false,
      title: '',
      cellFilter: '3',
      geneFilter: '200',
      minPeaks: 50,
      maxPeaks: 1000,
      mitoFilter: '10',
      normalization: 'MAESTRO',
      nVariableFeatures: '0.25',
      timeElapsed: '',
      normalizeSelect: 'MAESTRO',
      normalizeMethods: ['MAESTRO'],
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
  mounted() {
    if (this.jobid === 'example') {
      this.runPreProcess()
    }
  },
  methods: {
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
      this.qcResult = await ApiService.postCommand(
        'deepmaps/api/queue/load-multiome/',
        {
          idx: this.idx,
          jobid: this.jobid,
          filename: 'ifnb_2800',
          type: 'multiome',
          min_cells: this.cellFilter,
          min_genes: this.geneFilter,
          nVariableFeatures: this.nVariableFeatures,
          percentMt: this.mitoFilter,
          removeRibosome: this.removeRibosome,
        }
      )

      this.metadata = await ApiService.postCommand(
        'deepmaps/api/queue/atac-qc-list/'
      )
      this.qcBox1 = this.metadata.cell_result.map((e) => e.n_reads_per_cell)
      this.qcBox2 = this.metadata.cell_result.map((e) => e.n_features_per_cell)
      this.qcBox3 = this.metadata.cell_result.map(
        (e) => e.atac_peak_region_fragments
      )
      this.qcBox4 = this.metadata.cell_result.map((e) => e.blacklist_ratio)
      this.qcBox5 = this.metadata.cell_result.map((e) => e.pct_reads_in_peaks)
      this.qcHist1 = this.metadata.hist_features_per_cell
      this.qcHist2 = this.metadata.hist_reads_per_cell
      this.qcHist3 = this.metadata.hist_atac_peak_region_fragments
      this.qcHist4 = this.metadata.hist_tss_enrichment

      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
      })

      this.varGenesScatter = await ApiService.postCommand(
        'deepmaps/api/queue/var-genes-plot/'
      )
      this.qcComplete = true
      this.$nuxt.$loading.finish()
    },
  },
}
</script>
