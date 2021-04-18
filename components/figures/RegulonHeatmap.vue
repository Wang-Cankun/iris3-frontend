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
      <v-card-title class="primary white--text caption px-2 py-1"
        >Regulon heatmap <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadTable">
              <download-excel class="mr-4" :data="genes" type="csv">
                <v-list-item-title>TODO</v-list-item-title>
              </download-excel>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <div class="no-drag">
        <div v-show="heatmap">
          <v-img
            contain
            :width="windowSize.x - 30"
            :height="windowSize.y - 50"
            :max-width="windowSize.x"
            :max-height="windowSize.y"
            :src="heatmap"
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
      heatmap: '',
      windowSize: {
        x: 420,
        y: 600,
      },
    }
  },
  watch: {
    genes() {
      this.runHeatmapStatic()
    },
  },
  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading table...',
        color: 'Success',
      })
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
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
    async copyGenes(genes) {
      try {
        await this.$copyText(genes.join('\n'))
      } catch (e) {
        console.error(e)
      }
    },
    async runHeatmapStatic() {
      console.log('Run regulon heatmap')
      this.heatmap = await ApiService.postCommand(
        'deepmaps/api/queue/static-heatmap/',
        {
          genes: this.genes,
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
