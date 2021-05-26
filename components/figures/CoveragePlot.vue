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
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >Coverage plot<v-spacer></v-spacer>
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
              <v-list-item @click="downloadPNG(src)">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >

      <v-row class="ma-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-col cols="12">
            <v-select
              v-model="type"
              :items="types"
              label="Input type"
              class="my-0"
              item-text="name"
              item-value="value"
              dense
              @change="clearForm()"
            ></v-select>
            <div
              v-if="type === 'region'"
              class="d-flex flex align-start justify-space-around"
            >
              <v-select
                v-model="chr"
                class="px-1"
                :items="Chromosome"
                dense
                label="Chromosome"
                :rules="[(v) => !!v || 'Item is required']"
                background-color="white"
              ></v-select>
              <v-text-field
                v-model="chrStart"
                :rules="rangeRules"
                class="px-1"
                label="start"
                type="number"
                required
                background-color="white"
                dense
              ></v-text-field>
              <v-text-field
                v-model="chrEnd"
                :rules="[endRules]"
                class="px-1"
                label="end"
                type="number"
                required
                background-color="white"
                dense
              ></v-text-field>
              <v-btn small color="Primary" @click="runCoveragePlotStatic()"
                >Calculate</v-btn
              >
            </div>
            <div v-if="type === 'gene'" class="d-flex flex">
              <v-autocomplete
                v-model="gene"
                class="ml-4"
                :items="genes"
                dense
                :rules="[(v) => !!v || 'Item is required']"
                label="Gene"
              ></v-autocomplete>
              <v-text-field
                v-model="flanking"
                class="px-1"
                label="Flanking range"
                type="number"
                :rules="flankingRules"
                required
                background-color="white"
                dense
              ></v-text-field>
              <v-btn small color="Primary" @click="runCoveragePlotStatic()"
                >Calculate</v-btn
              >
            </div>
          </v-col>
        </v-form>
      </v-row>

      <div v-if="src">
        <v-img
          contain
          :height="windowSize.y - 350"
          :max-width="windowSize.x + 'px'"
          :max-height="windowSize.y - 350"
          :src="src"
        ></v-img>
      </div> </grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    genes: { type: Array || String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
    imagew: { type: Number, required: false, default: 500 },
    imageh: { type: Number, required: false, default: 300 },
  },

  data() {
    return {
      valid: true,
      types: [
        { name: 'Search by gene', value: 'gene' },
        { name: 'Specify genomic regions', value: 'region' },
      ],
      Chromosome: [
        'chr1',
        'chr2',
        'chr3',
        'chr4',
        'chr5',
        'chr6',
        'chr7',
        'chr8',
        'chr9',
        'chr10',
        'chr11',
        'chr12',
        'chr13',
        'chr14',
        'chr15',
        'chr16',
        'chr17',
        'chr18',
        'chr19',
        'chr20',
        'chr21',
        'chr22',
        'chrX',
        'chrY',
      ],
      windowSize: {
        x: 400,
        y: 400,
      },
      hover: false,
      type: 'gene',
      gene: NaN,
      chr: '',
      chrStart: '',
      chrEnd: '',
      src: '',
      flanking: 2000,
      isAnnotation: true,
      isPeak: false,
      // Form rules
      flankingRules: [
        (v) => !!v || 'Flanking region is required',
        (v) => (v && v >= 0) || 'Flanking region be positive',
      ],
      rangeRules: [
        (v) => !!v || 'Range is required',
        (v) => (v && v > 0) || 'Range should be greater than 0',
      ],
    }
  },
  computed: {},
  methods: {
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
    },
    clearForm() {
      // this.$refs.form.reset()
    },
    downloadPNG() {
      if (!this.src) {
        this.$notifier.showMessage({
          content: 'Please generate the figure first',
          color: 'error',
        })
      } else {
        const link = document.createElement('a')
        link.href = this.src
        link.setAttribute('download', 'coverage_plot.png')
        document.body.appendChild(link)
        link.click()
      }
    },
    async runCoveragePlotStatic() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
        return
      }
      if (this.type === 'gene' && !this.gene) {
        this.$notifier.showMessage({
          content: 'Please specify gene name!',
          color: 'error',
        })
      } else {
        this.src = await ApiService.postCommand(
          'deepmaps/api/queue/coverage-plot/',
          {
            type: this.type,
            gene: this.gene,
            flank: this.flanking,
            chr: this.chr,
            start: this.chrStart,
            end: this.chrEnd,
            is_annotation: true,
            is_peak: false,
          }
        )
      }
    },
    endRules(v) {
      if (v - this.chrStart < 100) {
        return 'End should be at least 100 bps larger than start'
      }
      if (!v) {
        return 'Range is required'
      }
      if (v <= 0) {
        return 'Range should be greater than 0'
      }
      return true
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
