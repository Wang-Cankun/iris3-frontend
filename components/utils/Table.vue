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
    >
      <v-card-title class="primary white--text caption px-2 py-1"
        >Regulons <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadTable">
              <download-excel class="mr-4" :data="items" type="csv">
                <v-list-item-title>Download file (CSV)</v-list-item-title>
              </download-excel>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
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
          :search="search"
          :headers="headers"
          :items="items"
          :items-per-page="10"
          item-key="index"
          class="elevation-1"
          :expanded.sync="expanded"
          show-expand
        >
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              <v-virtual-scroll
                height="125"
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
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return { search: '', expanded: [] }
  },

  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading table...',
        color: 'Success',
      })
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
