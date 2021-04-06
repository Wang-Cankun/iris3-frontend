<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">Tutorial</p>
        <file-upload></file-upload>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import FileUpload from '~/components/utils/Upload'

export default {
  components: { FileUpload },
  data() {
    return {}
  },
  methods: {},
}
</script>
