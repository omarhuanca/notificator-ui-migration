<template>
  <div>
    <v-layout column wrap>
        <v-layout row wrap>
            <v-flex xs4>
                <v-checkbox v-model="test_mode" label='Test Mode' background-color="primary-50"></v-checkbox>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="wait_time_in_milliseconds" background-color="primary-50" v-model="wait_time_in_milliseconds"
                              box label="Wait Time *"
                              placeholder="Wait Time" :error-messages="waitTimeError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="ok_rate" background-color="primary-50" v-model="ok_rate" box label="Rate *"
                            placeholder="Rate" :error-messages="rateError">
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Notificator',
  data() {
    return {
      test_mode: false,
      testModeError: '',
      wait_time_in_milliseconds: '',
      waitTimeError: '',
      ok_rate: '',
      rateError: '',
      error: 'This field is mandatory',
      numberError: 'This field is mandatory or verify value',
    };
  },
  methods: {
    validateData() {
      let response = false;
      const flagWaitTime = this.wait_time_in_milliseconds <= 0;
      this.waitTimeError = '';
      if (flagWaitTime) {
        this.waitTimeError = this.numberError;
      }
      const flagRate = this.ok_rate <= 0;
      this.rateError = '';
      if (flagRate) {
        this.rateError = this.numberError;
      }

      if (!flagWaitTime && !flagRate) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        test_mode: this.test_mode,
        wait_time_in_milliseconds: parseInt(this.wait_time_in_milliseconds, 10),
        ok_rate: parseInt(this.ok_rate, 10),
      };
    },
  },
};
</script>
