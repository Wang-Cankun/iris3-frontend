/* eslint-disable eqeqeq */
<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-card outlined class="mt-2">
            <p class="subtitle-1 font-weight-bold text-center">
              Gene Regulatory Network
            </p>

            <v-col>
              <v-row justify="center">
                <v-btn
                  class="mx-2 my-4"
                  color="Primary"
                  width="150"
                  @click="runNetwork()"
                  >Calculate</v-btn
                >
              </v-row>
              <div v-show="ctList.length" class="mt-2 pt-2">
                <v-divider />
                <p>
                  Cell category for network construction:
                  {{ allIdents.map((i) => i.ident).flat()[0] }}
                </p>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-select
                      v-model="selectedCt"
                      :items="ctList"
                      label="Select cell cluster"
                      @mouseenter.native="on.mouseenter"
                      @mouseleave.native="on.mouseleave"
                    ></v-select>
                  </template>
                  <p>TODO</p>
                </v-tooltip>

                <div v-if="selectedCt.length">
                  <selection
                    :regulon-list="selectedCtRegulonList"
                    :selected.sync="selectedTf"
                  ></selection>
                </div>
              </div>
            </v-col>
          </v-card>
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
                :items="regulonTable"
                :selected.sync="selectedRegulon"
              >
              </regulon-table>
              <differential-regulon
                :genes="tfList"
                :title="layout[2].title"
                :x="layout[2].x"
                :y="layout[2].y"
                :w="layout[2].w"
                :h="layout[2].h"
                :i="layout[2].i"
              ></differential-regulon>
              <div v-if="selectedRegulon.tf">
                <cluster-scatter
                  :key="layout[3].i"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                  :src="clusterScatterData"
                  :title="layout[3].title"
                >
                </cluster-scatter>
                <regulon-activity-scatter
                  :title="layout[4].title"
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                  :src="rasData"
                >
                </regulon-activity-scatter>
                <regulon-gene-scatter
                  :title="layout[5].title"
                  :x="layout[5].x"
                  :y="layout[5].y"
                  :w="layout[5].w"
                  :h="layout[5].h"
                  :i="layout[5].i"
                  :genes="selectedRegulonGenes"
                >
                </regulon-gene-scatter>
                <feature-violin
                  :setting="layout[6]"
                  :genes="selectedRegulonGenes"
                  :idents="ctList"
                ></feature-violin>
                <regulon-genes-table
                  :genes="selectedRegulonGenes"
                  :setting="layout[7]"
                ></regulon-genes-table>

                <enrichment-table
                  :genes="selectedRegulonGenes"
                  :setting="layout[8]"
                ></enrichment-table>
                <regulon-heatmap
                  :title="layout[9].title"
                  :x="layout[9].x"
                  :y="layout[9].y"
                  :w="layout[9].w"
                  :h="layout[9].h"
                  :i="layout[9].i"
                  :src="riHeatmapData"
                ></regulon-heatmap>
                <!--
                <div v-if="false">
                  <regulon-circos
                    :title="layout[10].title"
                    :x="layout[10].x"
                    :y="layout[10].y"
                    :w="layout[10].w"
                    :h="layout[10].h"
                    :i="layout[10].i"
                    :genes="selectedRegulonGenes"
                  ></regulon-circos>

                  <volcano-scatter
                    :title="layout[11].title"
                    :x="layout[11].x"
                    :y="layout[11].y"
                    :w="layout[11].w"
                    :h="layout[11].h"
                    :i="layout[11].i"
                    :src="{ axis: [0, 1], legend: [0], dimension: 1 }"
                  >
                  </volcano-scatter>
                </div>-->
              </div>
            </grid-layout>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
// import RegulonList from 'static/json/regulon/example_regulon.json'
// import ExampleNodes from 'static/json/regulon/example_cyto_nodes.json'
// import ExampleEdges from 'static/json/regulon/example_cyto_edges.json'
import RegulonNetwork from '~/components/network/RegulonNetwork'
import RegulonSelection from '~/components/network/RegulonSelection'

import RegulonHeatmap from '~/components/figures/RegulonHeatmap'
import ClusterScatter from '~/components/figures/ClusterScatter'
import RegulonGeneScatter from '~/components/figures/RegulonGeneScatter'
import RegulonActivityScatter from '~/components/figures/RegulonActivityScatter'

import FeatureViolinStatic from '~/components/figures/FeatureViolinStatic'

import RegulonTable from '~/components/tables/RegulonTable'
import RegulonEnrichmentTable from '~/components/tables/RegulonEnrichmentTable'
import RegulonGenesTable from '~/components/tables/RegulonGenesTable'

import DifferentialRegulon from '~/components/tables/DifferentialRegulon'

import ApiService from '~/services/ApiService.js'

export default {
  components: {
    network: RegulonNetwork,
    selection: RegulonSelection,
    'regulon-table': RegulonTable,
    'enrichment-table': RegulonEnrichmentTable,
    'regulon-genes-table': RegulonGenesTable,
    'regulon-heatmap': RegulonHeatmap,
    'cluster-scatter': ClusterScatter,
    'regulon-gene-scatter': RegulonGeneScatter,
    'feature-violin': FeatureViolinStatic,
    'regulon-activity-scatter': RegulonActivityScatter,
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
        title: 'Differential regulon analysis',
      },
      {
        x: 2,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        title: 'Clustering plot',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '4',
        title: 'Regulon activity plot',
      },
      {
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        i: '5',
        title: 'Regulon genes scatter plot',
      },
      {
        x: 2,
        y: 4,
        w: 2,
        h: 2,
        i: '6',
        title: 'Regulon genes violin plot',
      },
      {
        x: 4,
        y: 4,
        w: 2,
        h: 2,
        i: '7',
        title: 'Regulon genes',
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 2,
        i: '8',
        title: 'Gene set enrichment analysis',
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 2,
        i: '9',
        title: 'Regulon heatmap',
      },
    ],
    // UMAP
    clusterScatterData: { axis: [0, 1], legend: [0, 1], dimension: 1 },
    // TF selection
    selectedTf: [],
    selectedCt: '',
    sliderTf: 1,
    showNetwork: false,
    selectedTfCytoscape: '',
    selectedRegulon: {},
    selectedRegulonGenes: [],
    ExampleNodes: [],
    ExampleEdges: [],
    RegulonList: [],
    allIdents: [],
    idents: ['hgt_cluster', 'None'],
    rasData: { axis: [0, 1], legend: [0, 1], dimension: 1 },
    riHeatmapData: { column: [], row: [], data: [], legend: [0, 1] },
  }),
  computed: {
    selectedNodes() {
      return this.ExampleEdges.filter((i) =>
        this.selectedTf.includes(i.source)
      ).reduce((acc, cur) => acc.add(cur.target), new Set(this.selectedTf))
    },
    graphNodes() {
      return this.ExampleNodes.filter((i) => this.selectedNodes.has(i.id))
    },
    graphEdges() {
      return this.ExampleEdges.filter((i) => this.selectedNodes.has(i.source))
    },

    regulonTable() {
      return this.RegulonList.filter((i) => i.ct === +this.selectedCt)
    },

    ctList() {
      if (this.allIdents) {
        return this.allIdents.map((i) => i.levels).flat()
      } else {
        return []
      }
    },
    tfList() {
      return this.RegulonList.filter((i) => i.ct === +this.selectedCt).map(
        (i) => i.tf
      )
    },
    selectedCtRegulonList() {
      return this.RegulonList.filter((i) => i.ct === +this.selectedCt)
    },
  },
  watch: {
    selectedRegulon() {
      this.selectedTfCytoscape = this.selectedRegulon.tf
      this.selectedRegulonGenes = this.selectedRegulon.genes.split(',')
      this.updateSelectedRegulon()
    },
    async selectedCt() {
      this.$nuxt.$loading.start()
      this.regulonData = []
      this.regulonData = await ApiService.postCommand(
        'deepmaps/api/queue/run-r/',
        {
          type: 'regulon',
          cluster: this.selectedCt,
        }
      )
      await ApiService.sleep(2000)
      this.RegulonList = this.regulonData.regulons
      this.ExampleNodes = this.regulonData.nodes
      this.ExampleEdges = this.regulonData.edges
      this.showNetwork = true
      this.$nuxt.$loading.finish()
    },
  },
  mounted() {
    this.showNetwork = false
  },
  methods: {
    async runNetwork() {
      this.$nuxt.$loading.start()
      await ApiService.sleep(100)
      this.allIdents = await this.$axios
        .post('deepmaps/api/queue/idents/')
        .then((response) => response.data)
      this.$nuxt.$loading.finish()
    },
    async updateSelectedRegulon() {
      this.$nuxt.$loading.start()
      await ApiService.sleep(2000)
      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/run-r/',
        {
          type: 'regulon-clusters',
        }
      )

      this.rasData = await ApiService.postCommand('deepmaps/api/queue/run-r/', {
        type: 'ras',
        gene: this.selectedRegulon.tf,
      })

      this.riHeatmapData = await ApiService.postCommand(
        'deepmaps/api/queue/run-r/',
        {
          type: 'ri-heatmap',
          tf: this.selectedRegulon.tf,
          genes: this.selectedRegulonGenes,
        }
      )

      this.$nuxt.$loading.finish()
    },
  },
}
</script>
