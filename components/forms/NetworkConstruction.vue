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
                :key="layout[0].i"
                :x="layout[0].x"
                :y="layout[0].y"
                :w="layout[0].w"
                :h="layout[0].h"
                :i="layout[0].i"
                :nodes="graphNodes"
                :edges="graphEdges"
                :show="showNetwork"
                :title="layout[0].title"
              >
              </network>
              <regulon-table
                :key="layout[1].i"
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
              <v-card class="ma-0"
                ><grid-item
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  class="grid-item-border"
                  @resized="changeSize"
                >
                  <v-card-title class="primary white--text caption px-2 py-1"
                    >Gene plots<v-spacer></v-spacer>
                    <v-menu bottom left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn dark icon v-bind="attrs" v-on="on">
                          <v-icon>mdi-download-outline</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item>
                          <v-list-item-title>TODO</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu></v-card-title
                  >

                  <v-row v-show="regulonUmapStatic">
                    <v-col cols="6"
                      ><v-img
                        contain
                        :height="windowSize.y - 130"
                        :max-width="windowSize.x / 2 + 'px'"
                        :max-height="windowSize.y / 2 + 'px'"
                        :src="clusterUmapStatic"
                      ></v-img
                    ></v-col>
                    <v-col cols="6"
                      ><v-img
                        contain
                        :height="windowSize.y - 130"
                        :max-width="windowSize.x / 2 + 'px'"
                        :max-height="windowSize.y / 2 + 'px'"
                        :src="regulonUmapStatic"
                      ></v-img
                    ></v-col>
                  </v-row> </grid-item
              ></v-card>
              <enrichment-table
                :genes="selectedRegulonGenes"
                :x="layout[3].x"
                :y="layout[3].y"
                :w="layout[3].w"
                :h="layout[3].h"
                :i="layout[3].i"
              ></enrichment-table>
              <regulon-heatmap
                :key="layout[4].i"
                :x="layout[4].x"
                :y="layout[4].y"
                :w="layout[4].w"
                :h="layout[4].h"
                :i="layout[4].i"
                :genes="selectedRegulonGenes"
              ></regulon-heatmap>
            </grid-layout>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import RegulonList from 'static/json/example_regulon.json'
import ExampleNodes from 'static/json/example_nodes.json'
import ExampleEdges from 'static/json/example_edges.json'
import RegulonNetwork from '~/components/network/RegulonNetwork'
import selection from '~/components/utils/Selection'
import RegulonTable from '~/components/tables/RegulonTable'
import EnrichmentTable from '~/components/tables/EnrichmentTable'
import RegulonHeatmap from '~/components/figures/RegulonHeatmap'

export default {
  components: {
    network: RegulonNetwork,
    selection,
    'regulon-table': RegulonTable,
    'enrichment-table': EnrichmentTable,
    'regulon-heatmap': RegulonHeatmap,
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
        title: 'Regulon network',
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
        title: 'Regulon scatter',
      },
      {
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        title: 'GSEA',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '4',
        title: 'Regulon heatmap',
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

    // Regulon visualize
    windowSize: {
      x: 700,
      y: 700,
    },
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
      this.selectedRegulonGenes = this.selectedRegulon.genes.split(',')
    },
  },
  mounted() {
    this.showNetwork = false
  },
  methods: {
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
    },
    runNetwork() {
      this.showNetwork = true
    },
    runRegulonUmap() {},
    runRegulonHeatmap() {},
    runRegulonGsea() {},
  },
}
</script>
