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
                      Select regulon
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        <p>Select regulon to display</p>
                      </v-tooltip>
                    </p>
                    Selected:
                    {{ selectedTf }}
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
          <div>
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
                :graph="graph"
                :title="layout[0].title"
              >
              </network>
              <v-card class="ma-0"
                ><grid-item
                  :x="layout[1].x"
                  :y="layout[1].y"
                  :w="layout[1].w"
                  :h="layout[1].h"
                  :i="layout[1].i"
                  class="grid-item-border"
                >
                </grid-item
              ></v-card>
            </grid-layout>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import ExampleGraph from 'static/json/test_network.json'
import RegulonNetwork from '~/components/utils/RegulonNetwork'
import selection from '~/components/utils/Selection'

export default {
  components: {
    network: RegulonNetwork,
    selection,
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
        title: 'Differential gene expression',
      },
      {
        x: 0,
        y: 2,
        w: 3,
        h: 2,
        i: '2',
        title: 'Plotting genes',
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
      {
        text: 'Gene',
        align: 'start',
        sortable: false,
        value: 'gene',
      },
      { text: 'LogFC', value: 'avg_log2FC' },
      { text: 'Adj.p.value', value: 'p_val_adj' },
    ],
    // TF selection
    selectedTf: [],
  }),
  computed: {
    graph() {
      const activeNodes = ExampleGraph.links
        .filter((item) => this.selectedTf.includes(item.source))
        .reduce((acc, cur) => acc.add(cur.target), new Set(this.selectedTf))
      if (activeNodes.size) {
        const tmpNodes = ExampleGraph.nodes.filter((item) =>
          activeNodes.has(item.name)
        )
        const tmpLinks = ExampleGraph.links.filter(
          (item) => activeNodes.has(item.source) || activeNodes.has(item.target)
        )
        const tmpCategories = ExampleGraph.categories.filter(
          (item) =>
            this.selectedTf.includes(item.geneSymbol) ||
            item.geneSymbol === 'Gene'
        )
        return {
          nodes: tmpNodes,
          links: tmpLinks,
          categories: tmpCategories,
        }
      } else {
        return {
          nodes: [],
          links: [],
          categories: [],
        }
      }
    },

    tfList() {
      const result = ExampleGraph.nodes
        .filter((item) => item.category.includes('Regulon'))
        .map((item) => item.category)
        .map((item) => item.replace('Regulon-', ''))
      return result
    },
  },
  methods: {
    runNetwork() {
      console.log(this)
    },
  },
}
</script>
