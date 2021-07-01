<template>
  <div>
    <v-btn @click="open">open</v-btn>
    <div id="id_of_container" style="height: 1050px">123</div>
  </div>
</template>

<script>
import network from 'static/json/clustergrammer/mult_view.json'
import Clustergrammer from 'clustergrammer/clustergrammer'

export default {
  data() {
    return {
      option: 1,
    }
  },
  computed: {
    df() {
      return network
    },
  },
  mounted() {},
  methods: {
    open() {
      const args = {
        root: '#id_of_container',
        network_data: 'network',
      }
      Clustergrammer(args)
      console.log(Clustergrammer)
    },
  },
  head: {
    title: 'test clustergrammer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'content' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
}
</script>
