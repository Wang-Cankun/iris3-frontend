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
        <v-row class="pa-2">
          <v-col cols="4">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="ident1"
                  :items="identLevels1"
                  return-object
                  dense
                  label="Clusters group 1"
                  multiple
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                  ><template v-slot:selection="{ item, index }">
                    <v-chip v-show="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-show="index === 1" class="grey--text caption">
                      (+{{ ident1.length - 1 }} others)
                    </span>
                  </template>
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="toggleIdent1">
                      <v-list-item-action>
                        <v-icon
                          :color="ident1.length > 0 ? 'indigo darken-4' : ''"
                        >
                          {{ iconSelect(ident1, identLevels1) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                ></v-select>
              </template>
              <span>TODO</span>
            </v-tooltip>
          </v-col>
          <v-col cols="4">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="ident2"
                  :items="identLevels2"
                  return-object
                  dense
                  label="Clusters group 2"
                  multiple
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                  ><template v-slot:selection="{ item, index }">
                    <v-chip v-show="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-show="index === 1" class="grey--text caption">
                      (+{{ ident2.length - 1 }} others)
                    </span>
                  </template>
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="toggleIdent2">
                      <v-list-item-action>
                        <v-icon
                          :color="ident2.length > 0 ? 'indigo darken-4' : ''"
                        >
                          {{ iconSelect(ident2, identLevels2) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                ></v-select>
              </template>
              <span>TODO</span>
            </v-tooltip>
          </v-col>
          <v-col cols="4"><v-btn small @click="run()">Calculate</v-btn></v-col>
        </v-row>

        <div v-if="result.length">
          <v-data-table
            dense
            :height="tableHeight"
            :headers="headers"
            :items="result"
            item-key="tf"
            :items-per-page="10"
            class="elevation-0"
          >
          </v-data-table>
        </div></div></grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

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
      headers: [
        { text: 'TF', value: 'tf' },
        { text: 'logFC', value: 'logfc' },
        { text: 'p-value', value: 'pvalue' },
      ],
      result: [],
      ident1: [],
      ident2: [],
      identLevels1: [0, 1, 2, 3, 4, 5, 6, 7],
      identLevels2: [0, 1, 2, 3, 4, 5, 6, 7],
      tableHeight: 380,
      footerHeight: 180,
    }
  },

  methods: {
    async run() {
      if (this.ident1 !== this.ident2) {
        this.$nuxt.$loading.start()
        this.result = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'dr',
            tf: [
              'CTCF',
              'DEAF1',
              'IKZF1',
              'TP53',
              'SREBF2',
              'ESR1',
              'ZNF740',
              'ZBTB7A',
              'SMAD3',
              'AHR',
            ],
            ct1: this.ident1,
            ct2: this.ident2,
          }
        )
        await ApiService.sleep(2000)
        this.$nuxt.$loading.finish()
      } else {
        this.$notifier.showMessage({
          content: 'Please select two different cell clusters',
          color: 'error',
        })
      }
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.tableHeight = newHPx - this.footerHeight
    },
    iconSelect(selected, identLevels) {
      if (this.isSelectAll(selected, identLevels)) return 'mdi-close-box'
      if (this.isSelectSome(selected, identLevels)) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    isSelectAll(selected, identLevels) {
      return selected.length === identLevels.length
    },
    isSelectSome(selected, identLevels) {
      return selected.length > 0 && !this.isSelectAll(selected, identLevels)
    },
    toggleIdent1() {
      this.$nextTick(() => {
        if (this.ident1.length > 0) {
          this.ident1 = []
        } else {
          this.ident1 = this.identLevels1
        }
      })
    },
    toggleIdent2() {
      this.$nextTick(() => {
        if (this.ident2.length > 0) {
          this.ident2 = []
        } else {
          this.ident2 = this.identLevels2
        }
      })
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
