<template>
  <v-card class="ma-0"
    ><grid-item
      :w="setting.w"
      :h="setting.h"
      :x="setting.x"
      :y="setting.y"
      :i="setting.i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
      @resized="changeSize"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ setting.title }}<v-spacer></v-spacer>
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
              <v-list-item @click="downloadPNG(geneViolin)">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <div class="no-drag">
        <v-row class="mx-4 mt-2">
          <v-col cols="3"
            ><v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-autocomplete
                  v-model="gene"
                  :items="genes"
                  label="Gene"
                  dense
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                ></v-autocomplete>
              </template>
              <span>TODO</span>
            </v-tooltip></v-col
          >
          <v-col cols="3"
            ><v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="violinSplit"
                  :items="idents"
                  label="Split by"
                  dense
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                ></v-select>
              </template>
              <span>TODO</span>
            </v-tooltip></v-col
          >
          <v-col cols="3"
            ><v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="violinGroup"
                  :items="idents"
                  label="Group by"
                  dense
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                ></v-select>
              </template>
              <span>TODO</span>
            </v-tooltip></v-col
          >
          <v-col cols="3">
            <v-btn small @click="runGeneViolin()" v-on="on">Plot</v-btn></v-col
          >
        </v-row>

        <div v-show="geneViolin">
          <v-img
            contain
            :width="windowSize.x - 30"
            :height="windowSize.y - 180"
            :max-width="windowSize.x + 'px'"
            :max-height="windowSize.y + 'px'"
            :src="geneViolin"
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
    idents: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      gene: '',
      geneViolin: '',
      violinSplit: 'sex',
      violinGroup: 'hgt_cluster',
      windowSize: {
        x: 520,
        y: 550,
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
      if (!src) {
        this.$notifier.showMessage({
          content: 'Please generate the figure first',
          color: 'error',
        })
      } else {
        const link = document.createElement('a')
        link.href = src
        link.setAttribute('download', 'coverage_plot.png')
        document.body.appendChild(link)
        link.click()
      }
    },
    downloadPDF() {
      return 1
    },

    async runGeneViolin() {
      this.$nuxt.$loading.start()
      this.geneViolin = await await ApiService.postCommand(
        'deepmaps/api/queue/run-r-static/',
        {
          type: 'violin-gene',
          gene: this.gene || 'CTCF',
          split: this.violinSplit,
          group: this.violinGroup,
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
