<template>
  <div>
    <v-layout column wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field type="number" name="maximum_retries" background-color="primary-50" v-model="maximum_retries"
                              box label="Maximim Retries *" placeholder="Maximim Retries" :error-messages="maximumError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="error_wait_time_in_milliseconds" background-color="primary-50"
                              v-model="error_wait_time_in_milliseconds"
                              box label="Maximim Retries *" placeholder="Maximim Retries" :error-messages="errorError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="bussy_wait_time_in_milliseconds" background-color="primary-50"
                              v-model="bussy_wait_time_in_milliseconds"
                              box label="Busy Wait *" placeholder="Busy Wait" :error-messages="bussyError">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Retry',
  data() {
    return {
      maximum_retries: '',
      error_wait_time_in_milliseconds: '',
      bussy_wait_time_in_milliseconds: '',
      maximumError: '',
      errorError: '',
      bussyError: '',
    };
  },
  methods: {
    validateData() {
      let response = false;
      const error = 'This field is mandatory or verify value';
      const flagMaximum = this.maximum_retries <= 0;
      this.maximumError = '';
      if (flagMaximum) {
        this.maximumError = error;
      }
      const flagError = this.error_wait_time_in_milliseconds <= 0;
      this.errorError = '';
      if (flagError) {
        this.errorError = error;
      }
      const flagBussy = this.bussy_wait_time_in_milliseconds <= 0;
      this.bussyError = '';
      if (flagBussy) {
        this.bussyError = error;
      }
      if (!flagMaximum && !flagError && !flagBussy) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        maximum_retries: parseInt(this.maximum_retries, 10),
        error_wait_time_in_milliseconds: parseInt(this.error_wait_time_in_milliseconds, 10),
        bussy_wait_time_in_milliseconds: parseInt(this.bussy_wait_time_in_milliseconds, 10),
      };
    },
  },
};
</script>
