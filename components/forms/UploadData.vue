<template>
  <v-col class="mb-2" cols="12">
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Title  -->
      <p class="title">
        Project title
      </p>
      <v-text-field
        v-model="title"
        :rules="rules"
        counter="25"
        label="Title:"
        outlined
      ></v-text-field>

      <!-- Upload data  -->
      <v-card outlined hover color="primary">
        <v-col cols="12">
          <v-row justify="space-between">
            <p class="title">
              Upload data
            </p>
            <v-btn>Load example data</v-btn>
          </v-row>
        </v-col>

        <v-tabs v-model="tab" background-color="white" grow>
          <v-tab>scRNA-Seq data only </v-tab>
          <v-tab>scRNA-Seq + scATAC-seq data </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <p class="title ma-0">
              Upload scRNA-seq data
            </p>
            <div v-for="(n, i) in multipleDatasetsLength" :key="n">
              <v-file-input
                v-model="expFile[i]"
                color="primary"
                counter
                chips
                :rules="fileRules"
                :label="'Upload sample ' + n"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
                required
                multiple
              ></v-file-input>
            </div>
            <v-btn @click="addMultipleDataset">Add a row</v-btn>
            <v-btn @click="removeMultipleDataset">Remove a row</v-btn>
          </v-tab-item>
          <v-tab-item>
            <p class="title ma-0">
              Upload scRNA-seq and scATAC-seq data
            </p>
            <v-file-input
              v-model="expFile[0]"
              color="primary"
              counter
              chips
              :rules="fileRules"
              label="Upload scRNA-seq dataset"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              required
              multiple
            ></v-file-input>
            <v-file-input
              v-model="expFile[1]"
              color="primary"
              counter
              chips
              :rules="fileRules"
              label="Upload scATAC-seq dataset"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              required
              multiple
            ></v-file-input>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <p class="title">
        Upload metadata (Optional)
      </p>

      <v-file-input
        v-model="labelFile"
        color="primary"
        counter
        :rules="fileRules"
        label="Click to upload (txt, tsv, csv)"
        prepend-icon="mdi-paperclip"
        outlined
        :show-size="1000"
        required
      ></v-file-input>

      <p class="title">
        Email (Optional)
      </p>

      <v-text-field
        v-model="email"
        outlined
        label="E-mail"
        hint="Optional: You will be notified by email when the job is done."
        persistent-hint
      ></v-text-field>

      <p class="title">
        Project description (Optional)
      </p>
      <v-textarea v-model="description" outlined label="Description:" clearable>
      </v-textarea>
    </v-form>
  </v-col>
</template>

<script>
import FormData from 'form-data'
export default {
  data: () => ({
    title: '',
    tab: null,
    valid: true,
    form: {},
    expFile: [],
    labelFile: null,
    email: '',
    description: '',
    multipleDatasetsLength: 1,
    rules: [(v) => v.length <= 25 || 'Max 25 characters'],
    nameRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    fileRules: [(v) => !!v || 'Field is required'],
    selectRules: [(v) => !!v || 'Control data is required'],
    emailRules: [
      (v) => (/.+@.+\..+/.test(v) && v.length > 0) || 'E-mail must be valid',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    submit() {
      if (!this.$refs.form.validate()) return
      this.dialog = true
      this.uploadStatus = 'Uploading ...'
      const formData = new FormData()
      formData.append('method', 'post')
      formData.append('name', 'list')
      formData.append('Content-Type', 'multipart/form-data')
      formData.append('email', this.email)

      // this.form.submit()
    },
    addMultipleDataset() {
      this.multipleDatasetsLength++
    },
    removeMultipleDataset() {
      if (this.multipleDatasetsLength === 1) return
      this.multipleDatasetsLength--
    },
  },
}
</script>
