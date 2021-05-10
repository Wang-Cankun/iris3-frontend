<template>
  <v-card class="ma-0"
    ><grid-item
      :w="w"
      :h="h"
      :x="x"
      :y="y"
      :i="i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
    >
      <v-card-title
        class="primary white--text caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }}
        <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" color="white" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <div id="create">
                  <div fluid>
                    <p class="subtitle-1 font-weight-bold text-center">
                      Global settings
                    </p>

                    <v-select
                      v-model="currentLayout"
                      :items="allLayouts"
                      label="Select layout"
                      @change="changeLayout(currentLayout)"
                    ></v-select>
                    <v-divider />
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
                  </div></div
              ></v-list-item>
            </v-list>
          </v-menu>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG">
                <v-list-item-title>TODO</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadJPG">
                <v-list-item-title>TODO</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <div id="holder" class="no-drag">
        <cytoscape
          ref="cy"
          :config="networkConfig"
          :pre-config="preConfig"
          :afte-created="afterCreated"
          @mousedown="addNode"
          @cxttapstart="updateNode"
        >
          <cy-element
            v-for="def in elements"
            :key="`${def.data.id}`"
            :definition="def"
            @mousedown="deleteNode($event, def.data.id)"
          />
        </cytoscape>
      </div> </grid-item
  ></v-card>
</template>

<script>
import cola from 'cytoscape-cola'
import euler from 'cytoscape-euler'
import spread from 'cytoscape-spread'

export default {
  components: {
    // use as a component
  },
  props: {
    title: { type: String, required: true },
    nodes: { type: Array, required: true },
    edges: { type: Array, required: true },
    show: { type: Boolean, required: true, default: false },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
      currentLayout: 'cola',
      // Network graph style
      allLayouts: [
        'circle',
        'grid',
        'breadthfirst',
        'concentric',
        'cola',
        'spread',
      ],
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
      geneNodeShape: 'circle',
      tfNodeShape: 'triangle',
      nodeShapeList: [
        'circle',
        'triangle',
        'round-triangle',
        'rectangle',
        'bottom-round-rectangle',
        'cut-rectangle',
        'barrel',
        'rhomboid',
        'diamond',
        'pentagon',
        'hexagon',
        'concave-hexagon',
        'heptagon',
        'octagon',
        'star',
        'tag',
        'vee',
      ],
      tfNodeColor: '',
      geneNodeColor: '',
    }
  },
  computed: {
    cy() {
      return this.$refs.cy.instance
    },
    elements() {
      const graph = [...this.nodes, ...this.edges].map((item) => {
        return { data: item }
      })
      return graph
    },

    networkConfig() {
      const config = {
        autounselectify: true,
        boxSelectionEnabled: false,

        layout: {
          name: 'grid',
          options: {
            spacingFactor: 3,
          },
        },
        style: this.design,
      }
      return config
    },

    design() {
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
  },

  watch: {
    design() {
      this.cy.style(this.design)
    },

    currentLayout() {
      this.changeLayout(this.currentLayout)
    },

    show() {
      this.cy.style(this.design)
      this.changeLayout(this.currentLayout)
    },
  },
  methods: {
    preConfig(cytoscape) {
      console.log('calling pre-config')
      // cytoscape: this is the cytoscape constructor
      cytoscape.use(cola)
      cytoscape.use(euler)
      cytoscape.use(spread)
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log('after config')
    },
    addNode(event) {
      console.log(event.target, this.cy)
      if (event.target === this.cy) console.log('adding node', event.target)
    },
    deleteNode(id) {
      console.log('node clicked', id)
    },
    updateNode(event) {
      console.log('right click node', event)
    },
    changeLayout(type) {
      const layout = this.cy.layout({
        name: type,
      })

      layout.run()
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log(
        'RESIZE i=' +
          i +
          ', H=' +
          newH +
          ', W=' +
          newW +
          ', H(px)=' +
          newHPx +
          ', W(px)=' +
          newWPx
      )
    },
    downloadPNG() {},
    downloadJPG() {},
  },
}
</script>

<style lang="scss" scoped>
.grid-item-border {
  border: 1px solid #d3d3d3;
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 4px;
  background: white;
}
</style>
<style>
#holder {
  width: 100%;
}
#cytoscape-div {
  min-height: 650px !important;
  display: block;
}
</style>
