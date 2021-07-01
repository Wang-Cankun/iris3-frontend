<template>
  <v-card class="ma-0" @mouseover="hover = true" @mouseleave="hover = false"
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
      <v-card-title class="grey lighten-3 font-weight-bold caption px-2 py-1"
        >Regulon genes<v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Regulon genes: to be updated</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="1">
                <download-excel class="mr-4" :data="result" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <div v-if="result.length">
          <v-card elevation="0">
            <p class="ml-4 my-2">Number of genes: {{ genes.length }}</p>
            <v-virtual-scroll
              :height="tableHeight"
              item-height="40"
              :items="genes"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      depressed
                      small
                      :href="'https://www.uniprot.org/uniprot/?query=' + item"
                      target="_blank"
                    >
                      UniProt
                      <v-icon color="primary" right> mdi-open-in-new </v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                      depressed
                      small
                      :href="
                        'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' +
                        item
                      "
                      target="_blank"
                    >
                      GeneCards
                      <v-icon color="primary" right> mdi-open-in-new </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider />
              </template>
            </v-virtual-scroll>
          </v-card>
        </div></div></grid-item
  ></v-card>
</template>

<script>
export default {
  props: {
    genes: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      tableHeight: 485,
      footerHeight: 150,
      headers: [{ text: 'Gene', value: 'data' }],
    }
  },
  computed: {
    result() {
      return this.genes.map((item) => ({ data: item }))
    },
  },
  methods: {
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
