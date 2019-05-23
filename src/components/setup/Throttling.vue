<template>
  <div>
    <v-layout column wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field type="number" name="maximum_request_quota" background-color="primary-50" v-model="maximum_request_quota"
                              box label="Maximim Request *" placeholder="Maximim Request" :error-messages="maximumError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="restore_time_in_seconds" background-color="primary-50" v-model="restore_time_in_seconds"
                              box label="Restore Time *" placeholder="Restore Time" :error-messages="restoreError">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Throttling',
  data() {
    return {
      maximum_request_quota: '',
      restore_time_in_seconds: '',
      maximumError: '',
      restoreError: '',
    };
  },
  methods: {
    validateData() {
      let response = false;
      const error = 'This field is mandatory or verify value';
      const flagMaximum = this.maximum_request_quota <= 0;
      this.maximumError = '';
      if (flagMaximum) {
        this.maximumError = error;
      }
      const flagRestore = this.restore_time_in_seconds <= 0;
      this.restoreError = '';
      if (flagRestore) {
        this.restoreError = error;
      }
      if (!flagMaximum && !flagRestore) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        maximum_request_quota: parseInt(this.maximum_request_quota, 10),
        restore_time_in_seconds: parseInt(this.restore_time_in_seconds, 10),
      };
    },
  },
};
</script>
