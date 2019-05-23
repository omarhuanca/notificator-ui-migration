<template>
  <div>
    <v-layout row wrap>
    <v-flex xs8>
      <v-form>
        <v-container grid-list-md>
          <v-layout column wrap>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field type="text-input" name="name" background-color="primary-50" v-model="model.name" box label="Name *"
                              placeholder="Name" :error-messages="model.errors.name">
                </v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field type="text-version" name="version" background-color="primary-50" v-model="model.version" box label="Version *"
                              placeholder="Version" :error-messages="model.errors.version">
                </v-text-field>
              </v-flex>
              <div>
                <div>Modules</div>
                <div>
                  <div>Notificator</div>
                  <v-flex xs6>
                    <v-text-field type="text-input" name="notificatorName" background-color="primary-50" v-model="notificatorName"
                                  box label="Notificator Name *"
                                  placeholder="Notificator Name" :error-messages="notificatorNameError">
                    </v-text-field>
                  </v-flex>
                  <div>
                    <div>Notificator Scheduling</div>
                    <schedule ref="notificatorSchedule">
                    </schedule>
                  </div>
                </div>
                <div>
                  <div>Conciliator</div>
                  <v-flex xs6>
                    <v-text-field type="text-input" name="conciliatorName" background-color="primary-50" v-model="conciliatorName"
                                  box label="Conciliator Name *"
                                  placeholder="Conciliator Name" :error-messages="conciliatorNameError">
                    </v-text-field>
                  </v-flex>
                  <div>
                    <div>Conciliator Scheduling</div>
                    <conciliator-schedule ref="conciliatorSchedule">
                    </conciliator-schedule>
                  </div>
                </div>
              </div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
    <v-flex xs4>
        <div class="footer-bar">
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn @click="sendRequest()">Save</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="onCancel()">Cancel</v-btn>
            </v-flex>
          </v-layout>
        </div>
    </v-flex>
    </v-layout>
    <modal-dialog :visible="setUpDialog.showDialog" :actionName="setUpDialog.eventName"
                @confirmOrCancelEvent="confirmCancelItem" :buttonsLabel="setUpDialog.labels">
    <template slot="title">{{ setUpDialog.labels.title }}</template>
    <template slot="content">
      {{ setUpDialog.labels.content }}
    </template>
  </modal-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import SnackBarNotify from '@/components/SnackBarNotify';
import Schedule from '@/components/setup/Schedule';
import ConciliatorSchedule from '@/components/setup/ConciliatorSchedule';
import ModalDialog from '@/components/ModalDialog';

export default {
  name: 'SetpUpTwoForm',
  components: {
    // SnackBarNotify,
    Schedule,
    ConciliatorSchedule,
    ModalDialog,
  },
  computed: {
    ...mapState({
      model: state => state.setUpForm.model,
    }),
  },
  data() {
    return {
      setUpDialog: {
        labels: {
          title: 'Cancel the Process',
          content: 'Are you sure?',
          cancelButton: 'NO, I\'M NOT',
          confirmButton: 'YES, I\'M SURE',
        },
        eventName: 'cancelProcess',
        showDialog: false,
      },
      name: '',
      version: '',
      notificatorName: '',
      notificatorNameError: '',
      conciliatorName: '',
      conciliatorNameError: '',
      error: 'This field is mandatory',
    };
  },
  methods: {
    onCancel() {
      this.setUpDialog.showDialog = true;
    },
    confirmCancelItem(value) {
      if (value.result) {
        this.$router.push('/');
      }
      this.setUpDialog.showDialog = false;
    },
    /*
    setSnackBar(message, color) {
      this.notifySnackBar(message, color);
    },
    */
    sendRequest() {
      let response = false;
      const flagName = this.validateData();
      if (this.model.validate() && flagName) {
        this.model.modules.notificator.scheduling = this.$refs.notificatorSchedule.copyParent();
        this.model.modules.conciliator.scheduling = this.$refs.conciliatorSchedule.copyParent();
        return this.model.save().then(() => {
          response = true;
          this.$router.push('home');
          // this.setSnackBar('The item was created successfully.', 'success');
        });
      }
      return response;
    },
    validateData() {
      let response = false;
      const flagNoticatorName = this.notificatorName.length === 0 || this.notificatorName.length > 100;
      this.notificatorNameError = '';
      this.model.modules.notificator.name = this.notificatorName;
      if (flagNoticatorName) {
        this.notificatorNameError = this.error;
        this.model.modules.notificator.name = '';
      }

      const flagConciliatorName = this.conciliatorName.length === 0 || this.conciliatorName.length > 100;
      this.conciliatorNameError = '';
      this.model.modules.conciliator.name = this.conciliatorName;
      if (flagConciliatorName) {
        this.conciliatorNameError = this.error;
        this.model.modules.conciliator.name = '';
      }

      const flagNotificatorSchedule = this.$refs.notificatorSchedule.validateData();
      const flagConciliatorSchedule = this.$refs.conciliatorSchedule.validateData();
      const flagSchedule = flagNotificatorSchedule && flagConciliatorSchedule;

      response = !flagNoticatorName && !flagConciliatorName && flagSchedule;
      return response;
    },
    initialData() {
      this.model.modules = {
        notificator: {
          name: '',
          scheduling: [],
        },
        conciliator: {
          name: '',
          scheduling: [],
        },
      };
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
