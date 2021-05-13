<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header> Network </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mt-6" outlined color="blue-grey lighten-5">
                  <p class="subtitle-1 font-weight-bold text-center">Network</p>

                  <v-col>
                    <p class="title-h4">
                      Select cell type
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        <p>Select cell type to display</p>
                      </v-tooltip>
                    </p>
                    Selected:
                    <v-select
                      v-model="selectedCt"
                      :items="ctList"
                      dense
                    ></v-select>
                    <p class="title-h4">
                      Select regulons
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        <p>Select regulons to display</p>
                      </v-tooltip>
                    </p>
                    Selected:
                    <selection
                      :all="tfList"
                      :selected.sync="selectedTf"
                    ></selection>
                  </v-col>
                  <v-row justify="center">
                    <v-btn
                      class="mx-2 my-4"
                      color="Primary"
                      width="150"
                      dense
                      @click="runNetwork()"
                      >Run</v-btn
                    >
                  </v-row>
                  <v-row justify="center"
                    >Selected Node: {{ selectedTfCytoscape }}</v-row
                  >
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="9">
          <div v-show="showNetwork">
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
              <network
                :title="layout[0].title"
                :x="layout[0].x"
                :y="layout[0].y"
                :w="layout[0].w"
                :h="layout[0].h"
                :i="layout[0].i"
                :nodes="graphNodes"
                :edges="graphEdges"
                :show="showNetwork"
                :selected.sync="selectedTfCytoscape"
              >
              </network>
              <regulon-table
                :title="layout[1].title"
                :x="layout[1].x"
                :y="layout[1].y"
                :w="layout[1].w"
                :h="layout[1].h"
                :i="layout[1].i"
                :headers="headers"
                :items="regulonTable"
                :selected.sync="selectedRegulon"
              >
              </regulon-table>
              <div v-if="selectedTfCytoscape">
                <regulon-activity-scatter
                  :title="layout[2].title"
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  :regulons="selectedTf"
                >
                </regulon-activity-scatter>
                <feature-scatter
                  :title="layout[3].title"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                  :genes="selectedRegulonGenes"
                >
                </feature-scatter>
                <enrichment-table
                  :genes="selectedRegulonGenes"
                  :title="layout[4].title"
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                ></enrichment-table>
                <regulon-heatmap
                  :title="layout[5].title"
                  :x="layout[5].x"
                  :y="layout[5].y"
                  :w="layout[5].w"
                  :h="layout[5].h"
                  :i="layout[5].i"
                  :genes="selectedRegulonGenes"
                ></regulon-heatmap>
                <regulon-circos
                  :title="layout[6].title"
                  :x="layout[6].x"
                  :y="layout[6].y"
                  :w="layout[6].w"
                  :h="layout[6].h"
                  :i="layout[6].i"
                  :genes="selectedRegulonGenes"
                ></regulon-circos>
                <differential-regulon
                  :genes="selectedRegulonGenes"
                  :title="layout[7].title"
                  :x="layout[7].x"
                  :y="layout[7].y"
                  :w="layout[7].w"
                  :h="layout[7].h"
                  :i="layout[7].i"
                ></differential-regulon>
                <volcano-scatter
                  :title="layout[8].title"
                  :x="layout[8].x"
                  :y="layout[8].y"
                  :w="layout[8].w"
                  :h="layout[8].h"
                  :i="layout[8].i"
                  :src="{ axis: [0, 1], legend: [0], dimension: 1 }"
                >
                </volcano-scatter>
              </div>
            </grid-layout>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import RegulonList from 'static/json/regulon/example_regulon.json'
import ExampleNodes from 'static/json/regulon/example_cyto_nodes.json'
import ExampleEdges from 'static/json/regulon/example_cyto_edges.json'
import RegulonNetwork from '~/components/network/RegulonNetwork'
import selection from '~/components/utils/Selection'

import RegulonHeatmap from '~/components/figures/RegulonHeatmap'
import FeatureScatter from '~/components/figures/FeatureScatter'
import RegulonActivityScatter from '~/components/figures/RegulonActivityScatter'
import RegulonCircos from '~/components/figures/RegulonCircos'
import VolcanoScatter from '~/components/figures/VolcanoScatter'

import RegulonTable from '~/components/tables/RegulonTable'
import EnrichmentTable from '~/components/tables/EnrichmentTable'
import DifferentialRegulon from '~/components/tables/DifferentialRegulon'

export default {
  components: {
    network: RegulonNetwork,
    selection,
    'regulon-table': RegulonTable,
    'enrichment-table': EnrichmentTable,
    'regulon-heatmap': RegulonHeatmap,
    'feature-scatter': FeatureScatter,
    'regulon-activity-scatter': RegulonActivityScatter,
    'regulon-circos': RegulonCircos,
    'volcano-scatter': VolcanoScatter,
    'differential-regulon': DifferentialRegulon,
  },
  props: {},
  data: () => ({
    panel: [0],
    layout: [
      {
        x: 0,
        y: 0,
        w: 4,
        h: 2,
        i: '0',
        title: 'Gene regulatory network',
      },
      {
        x: 4,
        y: 0,
        w: 2,
        h: 2,
        i: '1',
        title: 'Regulon table',
      },
      {
        x: 0,
        y: 2,
        w: 2,
        h: 2,
        i: '2',
        title: 'Regulon activity plot',
      },
      {
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        title: 'Gene expression plot',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '4',
        title: 'Regulon heatmap',
      },
      {
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        i: '5',
        title: 'Regulon heatmap',
      },
      {
        x: 2,
        y: 4,
        w: 2,
        h: 2,
        i: '6',
        title: 'Regulon circos plot',
      },
      {
        x: 4,
        y: 4,
        w: 2,
        h: 2,
        i: '7',
        title: 'Differential regulons',
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 2,
        i: '8',
        title: 'Volcano plot of differential regulons',
      },
    ],
    degList: [
      {
        gene: 'gene1',
        avg_log2FC: 2,
        p_val_adj: 0.01,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
    ],
    headers: [
      { text: 'Cell type', value: 'ct' },
      {
        text: 'TF',
        align: 'start',
        value: 'tf',
      },
      { text: 'Number of genes', value: 'n' },
      { text: 'Score', value: 'rss' },
      { text: 'Visualize', value: 'actions', sortable: false },
      { text: 'Expand', value: 'data-table-expand' },
    ],

    // TF selection
    selectedTf: [],
    selectedCt: 1,
    sliderTf: 1,
    showNetwork: false,
    selectedTfCytoscape: '',
    selectedRegulon: {},
    selectedRegulonGenes: [],
    regulonUmapStatic: '',
    clusterUmapStatic: '',
    regulonHeatmapStatic: '',
  }),
  computed: {
    selectedNodes() {
      return ExampleEdges.filter((i) =>
        this.selectedTf.includes(i.source)
      ).reduce((acc, cur) => acc.add(cur.target), new Set(this.selectedTf))
    },
    graphNodes() {
      return ExampleNodes.filter((i) => this.selectedNodes.has(i.id))
    },
    graphEdges() {
      return ExampleEdges.filter((i) => this.selectedNodes.has(i.source))
    },

    regulonTable() {
      return RegulonList.filter((i) => i.ct === this.selectedCt)
    },

    ctList() {
      return RegulonList.map((item) => item.ct)
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort()
    },
    tfList() {
      return RegulonList.filter((i) => i.ct === this.selectedCt).map(
        (i) => i.tf
      )
    },
  },
  watch: {
    selectedRegulon() {
      console.log(this.selectedRegulon)
      this.selectedTfCytoscape = this.selectedRegulon.tf
      this.selectedRegulonGenes = this.selectedRegulon.genes.split(',')
    },
  },
  mounted() {
    this.showNetwork = false
  },
  methods: {
    runNetwork() {
      this.showNetwork = true
    },
    runRegulonUmap() {},
    runRegulonHeatmap() {},
    runRegulonGsea() {},
  },
}
</script>
