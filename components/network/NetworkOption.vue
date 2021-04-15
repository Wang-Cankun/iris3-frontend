<template>
  <div id="create">
    <div fluid>
      <p class="subtitle-1 font-weight-bold text-center">Global settings</p>

      <v-select
        v-model="layout"
        :items="allLayouts"
        label="Select layout"
        @change="changeLayout(layout)"
      ></v-select>
      <v-divider />
      <p class="subtitle-1 font-weight-bold text-center">Edge style</p>
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
      <p class="subtitle-1 font-weight-bold text-center">Node style</p>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Network graph style
      layout: 'cola',
      allLayouts: [
        'circle',
        'grid',
        'breadthfirst',
        'concentric',
        'cola',
        'euler',
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
    }
  },
  computed: {
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
      this.$emit('update:design', this.design)
    },
  },
  created() {
    this.$emit('update:design', this.design)
  },
  methods: {
    changeLayout(layout) {
      this.$emit('update:layout', layout)
    },
  },
}
</script>

<style lang="scss" scoped></style>
