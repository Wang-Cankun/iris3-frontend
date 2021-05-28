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
        >{{ setting.title }} <v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Top variable genes table: to be updated</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadCSV">
                <download-excel class="mr-4" :data="src" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <div class="no-drag">
        <v-text-field
          v-model="search"
          dense
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          dense
          :height="tableHeight"
          :search="search"
          :headers="headers"
          :items="src"
          :items-per-page="15"
          item-key="index"
          class="elevation-0"
        >
        </v-data-table>
      </div> </grid-item
  ></v-card>
</template>

<script>
export default {
  props: {
    src: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      search: '',
      headers: [
        {
          text: 'Gene',
          value: 'gene',
          align: 'start',
        },
        {
          text: 'Residual variance',
          value: 'residual_variance',
          align: 'start',
        },
        { text: 'Standard deviation', value: 'std', align: 'start' },
        { text: 'Mean', value: 'mean', align: 'start' },
        { text: 'Max', value: 'max', align: 'start' },
        { text: 'Min', value: 'min', align: 'start' },
      ],
      tableHeight: 450,
      footerHeight: 155,
    }
  },

  methods: {
    downloadPNG() {
      const link = document.createElement('a')
      link.href = this.src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadCSV() {
      return 1
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.tableHeight = newHPx - this.footerHeight
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
