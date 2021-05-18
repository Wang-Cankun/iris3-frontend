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
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }} <v-spacer></v-spacer>
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
              label="Select cell type"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="ident2"
              class="ml-4"
              :items="currentIdentLevels"
              label="Select cell type"
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
        <v-row justify="center" class="mx-2 mb-2 mt-0">
          p-value: {{ drResult }}
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
        { text: 'Cell type', value: 'cell_type' },
        { text: 'p-value', value: 'pvalue' },
      ],
      result: [],
      ident1: '',
      ident2: '',
      drResult: [],
      currentIdentLevels: [1, 2, 3, 4, 5, 6, 7],
      tableHeight: 435,
      footerHeight: 155,
    }
  },

  methods: {
    async run() {
      if (this.ident1 && this.ident2) {
        this.$notifier.showMessage({
          content: 'Calculating differential regulons',
          color: 'accent',
        })
        this.drResult = 0.1
        // await ApiService.postCommand(
        //   'deepmaps/api/queue/differential-regulon/',
        //   {
        //     ident1: this.ident1,
        //     ident2: this.ident2,
        //   }
        // )
      } else {
        this.$notifier.showMessage({
          content: 'Select cell type',
          color: 'error',
        })
      }
      return await 1
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
