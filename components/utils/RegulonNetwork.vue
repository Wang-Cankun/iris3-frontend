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
        <div v-show="hover === true">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadJPG">
                <v-list-item-title>Download JPG</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div id="holder" class="no-drag">
        <v-autocomplete
          v-model="currentLayouts"
          class="ml-4"
          :items="allLayouts"
          label="Select layout"
          @change="changeLayout(currentLayouts)"
        ></v-autocomplete>
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
    css: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
      currentLayouts: '',
      allLayouts: [
        'circle',
        'grid',
        'breadthfirst',
        'concentric',
        'cola',
        'euler',
        'spread',
      ],
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
          name: 'cola',
          options: {
            spacingFactor: 2,
          },
        },
        style: this.css,
      }
      return config
    },
  },
  watch: {
    css() {
      this.cy.style(this.css)
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
  min-height: 470px !important;
  display: block;
}
</style>
