<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">Tutorial</p>

        {{ author }}
        <v-btn @click="mutationTest()">Mutate</v-btn>
        {{ updatePost }}

        {{ mutationResult }}
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

const TOGGLE_TODO = gql`
  mutation mute2($postId: Int!) {
    updatePost(upDatePostData: { postId: $postId }) {
      id
      firstName
    }
  }
`

export default {
  apollo: {
    author: {
      prefetch: false,
      query: gql`
        query Author2 {
          author(id: 33333) {
            id
            firstName
            posts {
              id
            }
          }
        }
      `,
    },
  },
  data() {
    return {
      eg1: 1,
      author: '',
      updatePost: 0,
      mutationResult: [],
    }
  },
  methods: {
    mutationTest() {
      this.updatePost = this.updatePost + 1
      this.$apollo
        .mutate({
          mutation: TOGGLE_TODO,
          variables: {
            postId: this.updatePost,
          },
        })
        .then((data) => (this.mutationResult = data))
    },
  },
}
</script>
