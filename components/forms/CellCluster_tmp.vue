<template>
  <v-col class="mb-2" cols="12">
    <no-ssr>
      <iframe :src="clusterFrame" height="800" width="100%"></iframe
    ></no-ssr>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    jobid: '2020041684528',
  }),
  computed: {
    clusterFrame() {
      return (
        'https://bmbl.bmi.osumc.edu/iris3/results_cluster.php?jobid=' +
        this.jobid
      )
    },
  },
}
</script>
