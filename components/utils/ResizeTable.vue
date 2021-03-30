<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title class="primary white--text caption px-2 py-1"
        >{{ title }} <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadPNG">
              <v-list-item-title>Download PNG</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadPNG">
              <v-list-item-title>Download JPEG</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadPDF">
              <v-list-item-title>Download PDF</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadPDF">
              <v-list-item-title>Download file (CSV)</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <v-simple-table class="elevation-1" height="246">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Gene</th>
              <th class="text-left">Mean</th>
              <th class="text-left">SD</th>
              <th class="text-left">Min</th>
              <th class="text-left">Max</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in src" :key="index">
              <td>{{ item.gene }}</td>
              <td>{{ item.mean }}</td>
              <td>{{ item.std }}</td>
              <td>{{ item.min }}</td>
              <td>{{ item.max }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </grid-item></v-card
  >
</template>

<script>
export default {
  props: {
    src: { type: Array, required: true },
    title: { type: String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      headers: [
        {
          text: 'Genes',
          align: 'start',
          sortable: true,
          value: 'data',
        },
      ],
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
    downloadPDF() {
      return 1
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
