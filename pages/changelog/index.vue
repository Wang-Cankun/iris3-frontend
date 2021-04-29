<template>
  <article>
    <v-container>
      <nuxt-content :document="page" />
    </v-container>
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('changelog').fetch()

    return {
      page,
    }
  },
}
</script>
