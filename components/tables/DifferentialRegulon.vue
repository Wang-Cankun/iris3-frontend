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
      <v-card-title
        class="primary white--text caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }} <v-spacer></v-spacer>
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
                <download-excel class="mr-4" data="" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="ident1"
              class="ml-4"
              :items="currentIdentLevels"
              label="Group 1"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="ident2"
              class="ml-4"
              :items="currentIdentLevels"
              label="Group 2"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center" class="mx-2 mb-2 mt-0">
          <v-btn
            class="mx-2 mb-2 mt-0"
            color="Primary"
            width="200"
            @click="run()"
            >Update</v-btn
          >
        </v-row>
        <div v-if="result.length">
          <v-data-table
            dense
            :headers="headers"
            :items="result[0]"
            item-key="name"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </div></div></grid-item
  ></v-card>
</template>

<script>
export default {
  props: {
    genes: { type: Array, required: true },
    title: { type: String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
      headers: [
        { text: 'pathway', value: 'pathway' },
        { text: 'Adjusted p-value', value: 'padj' },
        { text: 'NES', value: 'NES' },
        { text: 'size', value: 'size' },
        { text: '', value: 'data-table-expand' },
      ],
      result: [],
      ident1: '',
      ident2: '',
      currentIdentLevels: [],
    }
  },

  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading enrichment result...',
        color: 'Success',
      })
    },
    async run() {
      return await 1
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
