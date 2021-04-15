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
                    <p class="subtitle-1 font-weight-bold text-center">
                      Edge style
                    </p>
                    <v-slider
                      v-model="edgeWidth"
                      label="Edge width"
                      :max="20"
                      :min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-select
                      v-model="edgeType"
                      :items="edgeTypeList"
                      label="Edge type"
                      dense
                    ></v-select>
                    <v-divider />
                    <p class="subtitle-1 font-weight-bold text-center">
                      Node style
                    </p>
                    <v-switch
                      v-model="geneSymbolSwitch"
                      :label="`Show gene label: ${geneSymbolSwitch.toString()}`"
                    ></v-switch>
                    <v-slider
                      v-model="geneNodeSize"
                      label="Gene node size"
                      :max="200"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-slider
                      v-model="geneNodeTextSize"
                      label="Gene text size"
                      :max="200"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-select
                      v-model="geneNodeShape"
                      :items="nodeShapeList"
                      label="Gene node shape"
                      dense
                    ></v-select>
                    <v-color-picker
                      v-model="geneNodeColor"
                      class="ma-2"
                      :swatches="swatches"
                      label="Gene node color"
                      show-swatches
                    ></v-color-picker>
                    <v-switch
                      v-model="tfSymbolSwitch"
                      :label="`Show TF label: ${tfSymbolSwitch.toString()}`"
                    ></v-switch>
                    <v-slider
                      v-model="tfNodeSize"
                      label="TF node size"
                      :max="200"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-slider
                      v-model="tfNodeTextSize"
                      label="TF text size"
                      :max="200"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-select
                      v-model="tfNodeShape"
                      :items="nodeShapeList"
                      label="TF node shape"
                      dense
                    ></v-select>
                    <v-color-picker
                      v-model="tfNodeColor"
                      class="ma-2"
                      :swatches="swatches"
                      type="hex"
                      label="TF node color"
                      show-swatches
                    ></v-color-picker>
                  </v-col>
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
                :css="graphStyle"
                :title="layout[0].title"
              >
              </network>
              <resize-table
                :key="layout[1].i"
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
        text: 'TF',
        align: 'start',
        sortable: false,
        value: 'tf',
      },
      { text: 'Number of genes', value: 'n' },
      { text: 'RSS', value: 'rss' },
      { text: '', value: 'data-table-expand' },
    ],
    // Network graph style
    geneSymbolSwitch: false,
    tfSymbolSwitch: true,
    geneNodeSize: 20,
    tfNodeSize: 50,
    geneNodeTextSize: 20,
    tfNodeTextSize: 30,
    edgeWidth: 3,
    edgeType: 'straight',
    edgeTypeList: [
      'straight',
      'bezier',
      'segments',
      'unbundled-bezier',
      'haystack',
      'taxi',
    ],
    swatches: [
      ['#FF0000', '#AA0000', '#550000'],
      ['#FFFF00', '#AAAA00', '#555500'],
      ['#00FF00', '#00AA00', '#005500'],
      ['#00FFFF', '#00AAAA', '#005555'],
      ['#0000FF', '#0000AA', '#000055'],
    ],
    geneNodeShape: 'ellipse',
    tfNodeShape: 'triangle',
    nodeShapeList: [
      'ellipse',
      'triangle',
      'round-triangle',
      'rectangle',
      'round-rectangle',
      'bottom-round-rectangle',
      'cut-rectangle',
      'barrel',
      'rhomboid',
      'diamond',
      'round-diamond',
      'pentagon',
      'round-pentagon',
      'hexagon',
      'round-hexagon',
      'concave-hexagon',
      'heptagon',
      'round-heptagon',
      'octagon',
      'round-octagon',
      'star',
      'tag',
      'round-tag',
      'vee',
    ],
    tfNodeColor: '',
    geneNodeColor: '',
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
    graphStyle() {
      const tfLabel = this.tfSymbolSwitch ? 'data(name)' : ''
      const geneLabel = this.geneSymbolSwitch ? 'data(name)' : ''
      const tfNodeSize = this.tfNodeSize
      const geneNodeSize = this.geneNodeSize

      const style = [
        {
          selector: 'node',
          style: {},
        },
        {
          selector: 'node[type="gene"]',
          style: {
            shape: this.geneNodeShape,
            'background-color': this.geneNodeColor,
            label: geneLabel,
            'font-size': this.geneNodeTextSize + 'px',
            width: geneNodeSize,
            height: geneNodeSize,
          },
        },
        {
          selector: 'node[type="tf"]',
          style: {
            shape: this.tfNodeShape,
            'background-color': this.tfNodeColor,
            label: tfLabel,
            width: tfNodeSize,
            height: tfNodeSize,
            'font-size': this.tfNodeTextSize + 'px',
          },
        },
        {
          selector: 'edge',
          style: {
            width: this.edgeWidth,
            'line-color': '#ccc',
            // 'target-arrow-color': '#ccc',
            // 'target-arrow-shape': 'triangle',
            'curve-style': this.edgeType,
          },
        },

        {
          selector: '*[background_color]',
          style: {
            'background-color': 'data(background_color)',
            'text-outline-color': 'data(background_color)',
            'line-color': 'data(background_color)',
          },
        },
      ]
      return style
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
    },
  },
}
</script>
