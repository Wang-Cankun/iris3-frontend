<template>
  <div>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>Note</v-card-title>
        <v-divider class="my-2 py-2"></v-divider>
        <v-card-text class="my-0 py-0">
          You have changed parameters for this job. Proceeding will create a new
          branch for this project.
        </v-card-text>

        <v-card-actions>
          <v-btn class="mx-2 mb-2" color="primary" dark @click="login()">
            Confirm </v-btn
          ><v-btn color="grey darken-1" text @click="close()"> cancel </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    branch: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      value: 1,
      email: '',
      password: '',
      statusCode: '',
      error: '',
      snackbar: null,
    }
  },
  computed: {},
  watch: {
    dialog(val) {
      !val && this.$emit('close')
    },
  },
  methods: {
    login() {
      this.$emit('branch')
      this.$emit('close')
      this.$emit('update:branch', true)
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
