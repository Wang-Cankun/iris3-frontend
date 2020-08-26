<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="white" color="primary">
      <v-tab href="#tab-1">
        Upload data
      </v-tab>
      <v-tab href="#tab-2">
        Pre-process
      </v-tab>
      <v-tab>
        Cell clustering
      </v-tab>
      <v-tab>
        DGE analysis
      </v-tab>
      <v-tab>
        Regulon
      </v-tab>
      <v-tab>
        Job summary
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <v-row no-gutters
          ><no-ssr
            ><upload-data-form></upload-data-form
            ><upload-data-results></upload-data-results></no-ssr></v-row
      ></v-tab-item>
      <v-tab-item value="tab-2"
        ><no-ssr><preprocess-form></preprocess-form></no-ssr
      ></v-tab-item>
      <v-tab-item></v-tab-item>
      <v-tab-item>Page 4</v-tab-item>
      <v-tab-item>Page 5</v-tab-item>
      <v-tab-item>Page 6</v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script>
import UploadData from '@/components/forms/UploadData.vue'
import PreProcess from '@/components/forms/PreProcess.vue'

import UploadDataResults from '@/components/results/UploadDataResults.vue'

export default {
  components: {
    'upload-data-form': UploadData,
    'preprocess-form': PreProcess,
    'upload-data-results': UploadDataResults,
  },
  data() {
    return {
      tab: null,
      search: '',
    }
  },
  methods: {},
  head() {
    return {
      title: 'Job submission',
      meta: [
        {
          hid: 'submission',
          name: 'submission',
          content: 'Submit your single-cell datasets to scREAD.',
        },
      ],
    }
  },
}
</script>
<style></style>
