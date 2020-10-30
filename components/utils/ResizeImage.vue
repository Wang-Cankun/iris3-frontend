<template>
  <vdr
    :w="500"
    :h="500"
    :is-conflict-check="true"
    :parent="true"
    @dragging="onDrag"
    @resizing="onResize"
  >
    <v-card class="mx-auto"
      ><v-card-title class="primary white--text subtitle-1"
        >{{ title }} </v-card-title
      ><img :src="src" :width="width" :height="height"
    /></v-card>
  </vdr>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true },
    title: { type: String, required: true },
  },
  data() {
    return {
      width: 500,
      height: 500,
      x: 50,
      y: 70,
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped></style>
