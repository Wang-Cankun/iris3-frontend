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
    >
      <v-card-title class="grey lighten-3 font-weight-bold caption px-2 py-1"
        >Regulon heatmap <v-spacer></v-spacer>
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
                <v-icon v-show="hover === true">mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <div id="create">
                  <div fluid>
                    <p class="subtitle-1 font-weight-bold text-center">
                      Settings: todo
                    </p>
                  </div>
                </div></v-list-item
              >
            </v-list>
          </v-menu>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadPDF">
                <v-list-item-title>Download JPG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="1">
                <download-excel class="mr-4" data="" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <a :href="frame" target="_blank" class="text-decoration-none">
        <v-btn
          >Full screen <v-icon color="primary">mdi-open-in-new</v-icon></v-btn
        >
      </a>
      <no-ssr>
        <iframe :src="frame" height="800" width="100%"></iframe
      ></no-ssr> </grid-item
  ></v-card>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true, default: 'SP1' },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },

  data() {
    return {
      hover: false,
      heatmap: '',
    }
  },
  computed: {
    frame() {
      return `https://bmbl.bmi.osumc.edu/iris3/heatmap_simple.php?file=${this.name}.json`
    },
  },
  watch: {},
  methods: {
    downloadPNG() {
      return 1
    },
    downloadPDF() {
      return 1
    },
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading table...',
        color: 'Success',
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
