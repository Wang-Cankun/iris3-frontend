<template>
  <div id="holder">
    {{ elements }}
    <v-autocomplete
      v-model="currentLayouts"
      class="ml-4"
      :items="allLayouts"
      label="Select layout"
      @change="changeLayout(currentLayouts)"
    ></v-autocomplete>
    <cytoscape
      ref="cy"
      :config="config"
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
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import cola from 'cytoscape-cola'
import avsdf from 'cytoscape-avsdf'
import cise from 'cytoscape-cise'
import coseBilkent from 'cytoscape-cose-bilkent'
import fcose from 'cytoscape-fcose'
import euler from 'cytoscape-euler'
import spread from 'cytoscape-spread'
import dagre from 'cytoscape-dagre'
import klay from 'cytoscape-klay'

import nodes from 'static/json/example_cyto_nodes.json'
import edges from 'static/json/example_cyto_edges.json'
import exampleConfig from '~/static/json/test_cyto'

export default {
  data() {
    return {
      config: exampleConfig.config,
      i: 1,
      currentLayouts: '',
      allLayouts: [
        'circle',
        'grid',
        'random',
        'breadthfirst',
        'concentric',
        'cose',
        'cola',
        'avsdf',
        'cose-bilkent',
        'fcose',
        'euler',
        'spread',
        'dagre',
        'klay',
      ],
    }
  },
  computed: {
    cy() {
      return this.$refs.cy.instance
    },
    elements() {
      const graph = [...nodes, ...edges].map((item) => {
        return { data: item }
      })
      return graph
    },
  },
  mounted: () => {},
  methods: {
    preConfig(cytoscape) {
      console.log('calling pre-config')
      // cytoscape: this is the cytoscape constructor
      cytoscape.use(cola)
      cytoscape.use(cise)
      cytoscape.use(avsdf)
      cytoscape.use(coseBilkent)
      cytoscape.use(fcose)
      cytoscape.use(euler)
      cytoscape.use(spread)
      cytoscape.use(dagre)
      cytoscape.use(klay)
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
    changeLayout(lay) {
      const layout = this.cy.layout({
        name: lay,
      })

      layout.run()
    },
  },
}
</script>

<style>
#holder {
  width: 100%;
  height: 400px;
}
</style>
