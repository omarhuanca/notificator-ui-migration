<template>
  <div>
    <v-layout column wrap>
        <v-layout row wrap>
            <v-flex xs6>
                <v-text-field type="text-input" name="name" background-color="primary-50" v-model="name" box label="Service Name *"
                            placeholder="Service Name" :error-messages="nameError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="text-input" name="host" background-color="primary-50" v-model="host" box label="Host *"
                        placeholder="Host" :error-messages="hostError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="number" name="port" background-color="primary-50" v-model="port" box label="Port *"
                            placeholder="Port" :error-messages="portError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="text-input" name="request_method" background-color="primary-50" v-model="request_method"
                              box label="Request Method *" placeholder="Request Method" :error-messages="requestError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="text-input" name="username" background-color="primary-50" v-model="username" box label="Username *"
                              placeholder="Username" :error-messages="usernameError">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="password" name="password" background-color="primary-50" v-model="password" box label="Password *"
                              placeholder="Password" :error-messages="passwordError">
                </v-text-field>
            </v-flex>
            <retry ref='retryOne'>
            </retry>
            <throttling ref='throttlingOne'>
            </throttling>
        </v-layout>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Retry from '@/components/setup/Retry';
import Throttling from '@/components/setup/Throttling';

export default {
  name: 'Service',
  components: {
    Retry,
    Throttling,
  },
  computed: {
    ...mapState({
      model: state => state.setUpForm.model,
    }),
  },
  data() {
    return {
      name: '',
      host: '',
      port: '',
      request_method: '',
      username: '',
      password: '',
      nameError: '',
      hostError: '',
      portError: '',
      requestError: '',
      usernameError: '',
      passwordError: '',
    };
  },
  methods: {
    validateData() {
      let response = false;
      const error = 'This field is mandatory';
      const numberError = 'This field is mandatory or verify value';
      const flagName = this.name.length === 0 || this.name.length > 100;
      this.nameError = '';
      if (flagName) {
        this.nameError = error;
      }
      const flagHost = this.host.length === 0 || this.host.length > 100;
      this.hostError = '';
      if (flagHost) {
        this.hostError = error;
      }
      const flagPort = this.port <= 0 || this.port < 10;
      this.portError = '';
      if (flagPort) {
        this.portError = numberError;
      }
      const flagRequest = this.request_method.length === 0 || this.request_method.length > 100;
      this.requestError = '';
      if (flagRequest) {
        this.requestError = error;
      }
      const flagUsername = this.username.length === 0 || this.username.length > 100;
      this.usernameError = '';
      if (flagUsername) {
        this.usernameError = error;
      }
      const flagPassword = this.password.length === 0 || this.password.length > 100;
      this.passwordError = '';
      if (flagPassword) {
        this.passwordError = error;
      }
      const flagRetry = this.$refs.retryOne.validateData();
      const flagThrottling = this.$refs.throttlingOne.validateData();

      if (!flagName && !flagHost && !flagPort && !flagRequest && !flagUsername && !flagPassword && flagRetry && flagThrottling) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        name: this.name,
        host: this.host,
        port: parseInt(this.port, 10),
        request_method: this.request_method,
        username: this.username,
        password: this.password,
        retry: this.$refs.retryOne.copyParent(),
        throttling: this.$refs.throttlingOne.copyParent(),
      };
    },
  },
};
</script>
