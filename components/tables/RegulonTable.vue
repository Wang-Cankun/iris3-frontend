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
        class="primary white--text caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >Regulons <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" color="white" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
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
          :height="tableHeight"
          :search="search"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          item-key="index"
          class="elevation-0"
          :expanded.sync="expanded"
          show-expand
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="visualizeRegulon(item)">
              mdi-chart-scatter-plot
            </v-icon>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <v-virtual-scroll
                height="425"
                item-height="40"
                :items="item.genes.split(',')"
              >
                <span> Target genes:</span>

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
            </td>
          </template>
        </v-data-table>
      </div> </grid-item
  ></v-card>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      search: '',
      hover: false,
      tableHeight: 455,
      footerHeight: 155,
      expanded: [],
      headers: [
        { text: 'Cell type', value: 'ct' },
        {
          text: 'TF',
          align: 'start',
          value: 'tf',
        },
        { text: 'Number of genes', value: 'n' },
        { text: 'Score', value: 'rss' },
        { text: 'Visualize', value: 'actions', sortable: false },
        { text: 'Genes', value: 'data-table-expand' },
      ],
    }
  },
  created() {},
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
