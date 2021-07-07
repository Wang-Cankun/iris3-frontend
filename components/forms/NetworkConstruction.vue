/* eslint-disable eqeqeq */ /* eslint-disable eqeqeq */
<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-card outlined class="mt-2">
            <div class="ma-2">
              <p class="subtitle-1 font-weight-bold text-center">
                Gene Regulatory Network
              </p>

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
                <v-select
                  v-model="selectedCt"
                  :items="ctList"
                  label="1. Select cell cluster"
                ></v-select>

                <div v-if="selectedCt.length">
                  <selection
                    :regulon-list="selectedCtRegulonList"
                    :selected.sync="selectedTf"
                  ></selection>
                </div>
                <p>Search genes of interest</p>

                <v-row>
                  <v-col cols="6"
                    ><v-autocomplete
                      v-model="searchTfName"
                      label="TF"
                      :items="allTfs"
                      placeholder="Name"
                      class="px-1"
                      dense
                      background-color="white"
                      @change="clearSearchGene"
                    ></v-autocomplete
                  ></v-col>
                  <v-col cols="6"
                    ><v-autocomplete
                      v-model="searchGeneName"
                      label="Target genes"
                      :items="allGenes"
                      placeholder="Name"
                      class="px-1"
                      dense
                      background-color="white"
                      @change="clearSearchTf"
                    ></v-autocomplete
                  ></v-col>
                </v-row>
                <div v-if="filteredAllRegulons.length">
                  <v-data-table
                    dense
                    :headers="searchRegulonsHeader"
                    :items="filteredAllRegulons"
                    item-key="id"
                    :items-per-page="10"
                    class="elevation-0"
                  >
                  </v-data-table>
                </div>
              </div>
            </div>
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
                :setting="layout[0]"
                :nodes="graphNodes"
                :edges="graphEdges"
                :show="showNetwork"
                :selected.sync="selectedTfCytoscape"
              >
              </network>
              <differential-regulon
                :genes="tfList"
                :ident-items="ctList"
                :setting="layout[1]"
              ></differential-regulon>
              <regulon-table
                :setting="layout[2]"
                :items="regulonTable"
                :selected.sync="selectedRegulon"
              >
              </regulon-table>

              <div v-if="selectedRegulon.tf">
                <regulon-genes-table
                  :genes="selectedRegulonGenes"
                  :setting="layout[3]"
                ></regulon-genes-table>
                <cluster-scatter
                  :key="layout[4].i"
                  :src="clusterScatterData"
                  :setting="layout[4]"
                >
                </cluster-scatter>
                <regulon-activity-scatter :setting="layout[5]" :src="rasData">
                </regulon-activity-scatter>
                <regulon-gene-scatter
                  :setting="layout[6]"
                  :genes="selectedRegulonGenes"
                >
                </regulon-gene-scatter>
                <feature-violin
                  :setting="layout[7]"
                  :genes="selectedRegulonGenes"
                  :idents="identList"
                ></feature-violin>
                <enrichment-table
                  :genes="selectedRegulonGenes"
                  :setting="layout[8]"
                ></enrichment-table>
                <regulon-heatmap
                  :setting="layout[9]"
                  :src="selectedRegulon.tf"
                ></regulon-heatmap>
                <!--
                <div v-if="false">
                  <regulon-circos
                    :setting="layout[10]"
                    :x="layout[10].x"
                    :y="layout[10].y"
                    :w="layout[10].w"
                    :h="layout[10].h"
                    :i="layout[10].i"
                    :genes="selectedRegulonGenes"
                  ></regulon-circos>

                  <volcano-scatter
                    :setting="layout[11]"
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

// import RegulonHeatmap from '~/components/figures/RegulonHeatmap'
import RegulonHeatmap from '~/components/figures/Clustergrammer'
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
        title: 'Differential regulon analysis',
      },
      {
        x: 0,
        y: 2,
        w: 4,
        h: 2,
        i: '2',
        title: 'Regulon table',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        title: 'Regulon genes',
      },
      {
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        i: '4',
        title: 'Clustering plot',
      },
      {
        x: 2,
        y: 4,
        w: 2,
        h: 2,
        i: '5',
        title: 'Regulon activity plot',
      },
      {
        x: 4,
        y: 4,
        w: 2,
        h: 2,
        i: '6',
        title: 'Regulon genes scatter plot',
      },
      {
        x: 0,
        y: 6,
        w: 2,
        h: 2,
        i: '7',
        title: 'Regulon genes violin plot',
      },
      {
        x: 2,
        y: 6,
        w: 2,
        h: 2,
        i: '8',
        title: 'Gene set enrichment analysis',
      },
      {
        x: 4,
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

    // Search from all regulons
    allRegulons: [],
    allTfs: [],
    allGenes: [],
    searchTfName: '',
    searchGeneName: '',
    searchRegulonsHeader: [
      { text: 'TF', value: 'tf' },
      { text: 'Gene', value: 'target' },
      { text: 'Cluster', value: 'ct' },
    ],
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
      // eslint-disable-next-line eqeqeq
      return this.RegulonList.filter((i) => i.ct == this.selectedCt)
    },

    ctList() {
      if (this.allIdents.length) {
        return this.allIdents.map((i) => i.levels)[0]
      } else {
        return []
      }
    },
    identList() {
      if (this.allIdents.length) {
        return this.allIdents.map((i) => i.ident)
      } else {
        return []
      }
    },
    tfList() {
      // eslint-disable-next-line eqeqeq
      return this.RegulonList.filter((i) => i.ct == this.selectedCt).map(
        (i) => i.tf
      )
    },
    selectedCtRegulonList() {
      // eslint-disable-next-line eqeqeq
      return this.RegulonList.filter((i) => i.ct == this.selectedCt)
    },
    filteredAllRegulons() {
      if (this.searchGeneName) {
        return this.allRegulons.filter((i) => i.target === this.searchGeneName)
      } else if (this.searchTfName) {
        return this.allRegulons.filter((i) => i.tf === this.searchTfName)
      } else if (!this.searchGeneName && !this.searchTfName) {
        return []
      } else {
        return this.allRegulons
      }
    },
  },
  watch: {
    selectedRegulon() {
      this.selectedTfCytoscape = this.selectedRegulon.tf
      if (this.selectedRegulon.genes.length) {
        this.selectedRegulonGenes = this.selectedRegulon.genes.split(',')
      }
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
      this.allRegulons = await ApiService.postCommand(
        'deepmaps/api/queue/run-r/',
        {
          type: 'all-regulon',
        }
      )
      this.allTfs = [...new Set(this.allRegulons.map((i) => i.tf))]
      this.allGenes = [...new Set(this.allRegulons.map((i) => i.target))]
      await ApiService.sleep(1000)
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
      await ApiService.sleep(7000)
      this.allIdents = await this.$axios
        .post('deepmaps/api/queue/idents/')
        .then((response) => response.data)
      this.selectedCt = this.ctList[0]
      this.$nuxt.$loading.finish()
    },
    async updateSelectedRegulon() {
      if (this.selectedRegulon.tf.length) {
        this.$nuxt.$loading.start()
        await ApiService.sleep(1000)
        this.clusterScatterData = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'regulon-clusters',
          }
        )

        this.rasData = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'ras',
            gene: this.selectedRegulon.tf,
          }
        )

        this.riHeatmapData = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'ri-heatmap',
            tf: this.selectedRegulon.tf,
            genes: this.selectedRegulonGenes,
          }
        )

        this.$nuxt.$loading.finish()
      }
    },
    clearSearchGene() {
      this.searchGeneName = ''
    },
    clearSearchTf() {
      this.searchTfName = ''
    },
  },
}
</script>
