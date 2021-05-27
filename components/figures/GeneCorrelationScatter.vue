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
      @resized="changeSize"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >Gene-gene correlation plot<v-spacer></v-spacer>
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
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG(geneCorPlot)">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <div class="no-drag">
        <v-row class="mt-2"
          ><v-col cols="4">
            <v-autocomplete
              v-model="geneCor1"
              class="ml-4"
              :items="genes"
              dense
              label="Gene 1"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="geneCor2"
              class="ml-4"
              :items="genes"
              dense
              label="Gene 2"
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-btn small @click="runGeneCorPlot()">Plot</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" class="mx-2 mb-2 mt-0"> </v-row>
        <div v-show="geneCorPlot">
          <v-img
            contain
            :width="windowSize.x - 30"
            :height="windowSize.y - 120"
            :max-width="windowSize.x + 'px'"
            :max-height="windowSize.y + 'px'"
            :src="geneCorPlot"
          ></v-img>
        </div>
      </div> </grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    genes: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
      geneCor1: '',
      geneCor2: '',
      geneCorPlot: '',
      windowSize: {
        x: 420,
        y: 600,
      },
    }
  },

  computed: {},
  methods: {
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
    },

    downloadPNG(src) {
      const link = document.createElement('a')
      link.href = src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadPDF() {
      return 1
    },
    async runGeneCorPlot() {
      this.$nuxt.$loading.start()
      this.geneCorPlot = await ApiService.postCommand(
        'deepmaps/api/queue/gene-correlation-plot/',
        {
          gene1: this.geneCor1,
          gene2: this.geneCor2,
        }
      )
      this.$nuxt.$loading.finish()
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
