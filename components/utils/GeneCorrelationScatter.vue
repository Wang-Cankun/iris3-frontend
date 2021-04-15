<template>
  <v-card class="ma-0"
    ><grid-item
      :w="w"
      :h="h"
      :x="x"
      :y="y"
      :i="i"
      class="grid-item-border"
      @resized="changeSize"
    >
      <v-card-title class="primary white--text caption px-2 py-1"
        >Gene-gene correlation plot<v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>TODO</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <v-row
        ><v-col cols="6">
          <v-autocomplete
            v-model="geneCor1"
            class="ml-4"
            :items="genes"
            label="Gene 1"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            v-model="geneCor2"
            class="ml-4"
            :items="genes"
            label="Gene 2"
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row justify="center" class="mx-2 mb-2 mt-0">
        <v-btn
          class="mx-2 mb-2 mt-0"
          color="Primary"
          width="200"
          @click="runGeneCorPlot()"
          >Plot</v-btn
        >
      </v-row>
      <div v-show="geneCorPlot">
        <v-img
          contain
          :width="windowSize.x - 30"
          :height="windowSize.y - 120"
          :max-width="windowSize.x + 'px'"
          :max-height="windowSize.y + 'px'"
          :src="geneCorPlot"
        ></v-img>
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
      geneCor1: '',
      geneCor2: '',
      geneCorPlot: '',
      windowSize: {
        x: 600,
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

    downloadPNG() {
      const link = document.createElement('a')
      link.href = this.src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadPDF() {
      return 1
    },
    async runGeneCorPlot() {
      this.geneCorPlot = await ApiService.postCommand(
        'deepmaps/api/queue/gene-correlation-plot/',
        {
          gene1: this.geneCor1,
          gene2: this.geneCor2,
        }
      )
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
