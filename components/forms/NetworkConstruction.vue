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
          <div v-if="showNetwork">
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
                :imagew="600"
                :imageh="550"
                :nodes="graphNodes"
                :edges="graphEdges"
                :title="layout[0].title"
              >
              </network>
              <resize-table
                :x="layout[1].x"
                :y="layout[1].y"
                :w="layout[1].w"
                :h="layout[1].h"
                :i="layout[1].i"
                :headers="headers"
                :items="regulonTable"
              >
              </resize-table>
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
import RegulonNetwork from '~/components/utils/RegulonNetwork'
import selection from '~/components/utils/Selection'
import ResizeTable from '~/components/utils/Table'

export default {
  components: {
    network: RegulonNetwork,
    selection,
    'resize-table': ResizeTable,
  },
  props: {},
  data: () => ({
    panel: [0],
    layout: [
      {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
        i: '0',
        title: 'Regulon network',
      },
      {
        x: 3,
        y: 0,
        w: 2,
        h: 2,
        i: '1',
        title: 'Regulons',
      },
      {
        x: 0,
        y: 2,
        w: 3,
        h: 2,
        i: '2',
        title: 'Plot genes',
      },
      {
        x: 3,
        y: 2,
        w: 3,
        h: 2,
        i: '3',
        title: 'Cell type annotation',
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
        text: 'Tf',
        align: 'start',
        sortable: false,
        value: 'tf',
      },
      { text: 'Number of genes', value: 'n' },
      { text: 'RSS', value: 'rss' },
      { text: '', value: 'data-table-expand' },
    ],
    // TF selection
    selectedTf: [],
    selectedCt: 1,
    sliderTf: 1,
    showNetwork: false,
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
  created() {},
  methods: {
    runNetwork() {
      this.showNetwork = true
      console.log(this)
    },
  },
}
</script>
