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
                Cells: {{ qcResult.raw_n_cells[0] }}
              </p>
              <p class="text--secondary">
                Peaks: {{ qcResult.raw_n_genes[0] }}
              </p>
              <p class="text--secondary">
                Zero value percentage:
                {{ qcResult.raw_percent_zero[0] }}
              </p>
              <p class="subtitle-1 font-weight-bold text-center">
                Current data statistics
              </p>
              <p class="text--secondary">
                Cells: {{ qcResult.filter_n_cells[0] }}
              </p>
              <p class="text--secondary">
                Peaks: {{ qcResult.filter_n_genes[0] }}
              </p>
              <p class="text--secondary">
                Zero value percentage:
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
                ><v-tooltip top max-width="500px">
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
                ><v-tooltip top max-width="500px">
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
                ><v-tooltip top max-width="500px">
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
                ><v-tooltip top max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="maxPeaks"
                      class="mr-2 pr-2"
                      dense
                      label="Maximal peaks per cell"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span> Maximal peaks per cell</span>
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
            <boxplot :setting="layout[0]" :src="qcBox1"> </boxplot>
            <boxplot :setting="layout[1]" :src="qcBox2"> </boxplot>
            <boxplot :setting="layout[2]" :src="qcBox3"> </boxplot>
            <boxplot :setting="layout[3]" :src="qcBox4"> </boxplot>
            <boxplot :setting="layout[4]" :src="qcBox5"> </boxplot>
            <barplot :setting="layout[5]" :src="qcHist4"></barplot>
            <barplot :setting="layout[6]" :src="qcHist1"></barplot>
            <barplot :setting="layout[7]" :src="qcHist2"></barplot>
            <barplot :setting="layout[8]" :src="qcHist3"></barplot>
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
          mode: 'ATAC',
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
      this.$store.dispatch('calc/updateFlag', 'ATAC')
      this.qcComplete = true
      this.$nuxt.$loading.finish()
    },
  },
}
</script>
