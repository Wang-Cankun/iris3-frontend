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
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }}
        <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
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
                      :label="`Show gene names: ${geneSymbolSwitch.toString()}`"
                    ></v-switch>
                    <v-slider
                      v-model="geneNodeSize"
                      label="Gene node scale"
                      max="250"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-slider
                      v-model="geneNodeTextSize"
                      label="Gene text size"
                      max="250"
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
                      label="TF node scale"
                      max="250"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-slider
                      v-model="tfNodeTextSize"
                      label="TF text size"
                      max="250"
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
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG">
                <v-list-item-title>Download image (PNG)</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadJPG">
                <v-list-item-title>Download image (JPG)</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadCSV">
                <download-excel class="mr-4" :data="cyResult" type="csv">
                  <v-list-item-title>Export to CSV</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <div id="holder" class="no-drag">
        <v-btn @click="resetPosition">RESET</v-btn>
        <cytoscape
          ref="cy"
          :config="networkConfig"
          :pre-config="preConfig"
          :afte-created="afterCreated"
          @mousedown="resetHighlightNode"
          @cxttapstart="updateNode"
        >
          <cy-element
            v-for="def in elements"
            :key="`${def.data.id}`"
            :definition="def"
            @mousedown="highlightNode($event, def.data.id)"
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
      tfNodeSize: 60,
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
      tfNodeShape: 'circle',
      nodeShapeList: [
        'circle',
        'triangle',
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
      selectedTfCytoscape: '',
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
    cyResult() {
      return this.edges
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
          selector: 'node[type="tf"]',
          style: {
            shape: this.tfNodeShape,
            'background-color': 'data(color)',
            label: tfLabel,
            width: `mapData(centrality, 0, 1, 20, ${tfNodeSize * 2})`,
            height: `mapData(centrality, 0, 1, 20, ${tfNodeSize * 2})`,
            'font-size': this.tfNodeTextSize + 'px',
          },
        },
        {
          selector: 'node[type="gene"]',
          style: {
            shape: this.geneNodeShape,
            'background-color': 'data(color)',
            label: geneLabel,
            'font-size': this.geneNodeTextSize + 'px',
            width: geneNodeSize,
            height: geneNodeSize,
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
        {
          selector: 'node.highlight',
          style: {
            'border-color': '#FFF',
            'border-width': '2px',
            label: 'data(name)',
          },
        },
        {
          selector: 'node.semitransp',
          style: { opacity: '0.5' },
        },
        {
          selector: 'edge.highlight',
          style: { 'mid-target-arrow-color': '#FFF' },
        },
        {
          selector: 'edge.semitransp',
          style: { opacity: '0.2' },
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

    selectedTfCytoscape() {
      this.$emit('update:selected', this.selectedTfCytoscape)
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
    resetHighlightNode(e) {
      if (this.selectedTfCytoscape) {
        const sel = this.cy.getElementById(this.selectedTfCytoscape)
        this.cy.elements().removeClass('semitransp')
        sel
          .removeClass('highlight')
          .outgoers()
          .union(sel.incomers())
          .removeClass('highlight')
      }
    },
    highlightNode(e, id) {
      const sel = e.target
      this.selectedTfCytoscape = id
      this.cy
        .elements()
        .difference(sel.outgoers().union(sel.incomers()))
        .not(sel)
        .addClass('semitransp')
      sel
        .addClass('highlight')
        .outgoers()
        .union(sel.incomers())
        .addClass('highlight')
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
    downloadJPG() {
      const link = document.createElement('a')
      link.href = this.cy.jpg()
      link.setAttribute('download', 'cytoscape_export_jpg.jpg')
      document.body.appendChild(link)
      link.click()
    },
    downloadPNG() {
      const link = document.createElement('a')
      link.href = this.cy.png()
      link.setAttribute('download', 'cytoscape_export_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadCSV() {},

    resetPosition() {
      this.cy.reset()
      this.changeLayout(this.currentLayout)
    },
    exportJson() {
      console.log(this.cy.json())
    },
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
  min-height: 510px !important;
  display: block;
}
</style>
