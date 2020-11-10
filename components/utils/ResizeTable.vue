<template>
  <vdr
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    :min-width="300"
    :min-height="400"
    :grid="[100, 100]"
    :is-conflict-check="false"
    :parent="true"
    @dragging="onDrag"
  >
    <v-card class="mx-auto"
      ><v-card-title ref="titleBox" class="primary white--text subtitle-1"
        >{{ title }} <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadPNG">
              <v-list-item-title>Download data</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >

      <v-data-table
        :headers="headers"
        :items="genes"
        :items-per-page="7"
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </vdr>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    title: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
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
      width: 300,
      height: 400,
      titleHeight: 60,
    }
  },
  mounted() {
    this.matchHeight()
  },
  computed: {
    genes() {
      return this.src.map((item) => ({
        data: item,
      }))
    },
  },
  methods: {
    matchHeight() {
      this.titleHeight = this.$refs.titleBox.clientHeight + 15
    },
    onResize(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag(x, y) {
      this.x = x
      this.y = y
    },
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
  },
}
</script>

<style lang="scss" scoped></style>
