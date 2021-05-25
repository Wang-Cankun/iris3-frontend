<template>
  <div>
    <v-col cols="6" offset="3">
      <upload-data-form :type="uploadType"></upload-data-form>
    </v-col>
  </div>
</template>
<script>
import UploadData from '@/components/forms/UploadData.vue'
export default {
  components: {
    'upload-data-form': UploadData,
  },

  data() {
    return {
      e1: 1,
    }
  },
  computed: {
    uploadType() {
      return this.$route.params.id
    },
  },
}
</script>
