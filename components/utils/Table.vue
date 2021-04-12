EnrichmentTable.vue
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
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="d-flex align-start">
                <download-excel :data="items" type="csv">
                  <v-btn color="primary"> Download</v-btn
                  ><v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="primary" dark v-bind="attrs" v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    <span>Hint.</span>
                  </v-tooltip> </download-excel
                ><v-btn color="primary" @click="copyGenes(genes)"
                  >Copy</v-btn
                ></v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ item }">
            <td :colspan="headers.length">
              {{ item.genes }}
            </td>
          </template>
        </v-data-table>
      </div>
    </grid-item></v-card
  >
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
    return { expanded: [] }
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
