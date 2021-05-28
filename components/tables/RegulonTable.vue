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
        >Regulons <v-spacer></v-spacer>
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
              <v-list-item @click="1">
                <download-excel class="mr-4" :data="items" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-data-table
          dense
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :height="tableHeight"
          :search="search"
          :headers="headers"
          :items="exampleItems"
          :items-per-page="10"
          item-key="index"
          class="elevation-0"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="visualizeRegulon(item)">
              mdi-chart-scatter-plot
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </grid-item></v-card
  >
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      search: '',
      hover: false,
      tableHeight: 455,
      footerHeight: 155,
      expanded: [],
      headers: [
        {
          text: 'TF',
          align: 'start',
          value: 'tf',
        },
        { text: 'Centrality', value: 'centrality' },
        { text: 'Visualize', value: 'actions', sortable: false },
        { text: 'Number of genes', value: 'n' },
        { text: 'RAS', value: 'ras' },
        { text: 'DR: logFC', value: 'avg_log2FC' },
        { text: 'DR: p-value', value: 'p_val_adj' },
        { text: 'VS', value: 'VS' },
        { text: 'is CTSR', value: 'isCtsr' },
      ],
      sortBy: 'centrality',
      sortDesc: true,
    }
  },
  computed: {
    exampleItems() {
      return this.items
        .map((i) => ({
          ras: (Math.random() / 2).toFixed(3),
          vr: (Math.random() * 4).toFixed(3),
          drLogFC: (Math.random() * 2.1541).toFixed(3),
          drPvalue: (Math.random() / 5.124).toFixed(3),
          ...i,
        }))
        .map((i) => ({ isCtsr: i.drPvalue < 0.05 ? 'yes' : 'no', ...i }))
    },
  },
  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading table...',
        color: 'Success',
      })
    },
    async copyGenes(genes) {
      try {
        await this.$copyText(genes.join('\n'))
      } catch (e) {
        console.error(e)
      }
    },
    visualizeRegulon(item) {
      this.$emit('update:selected', item)
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.tableHeight = newHPx - this.footerHeight
    },
  },
}
</script>

<style lang="scss"></style>
