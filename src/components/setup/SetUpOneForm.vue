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
                <div><b>Modules</b></div>
                <div>
                  <div>
                    <div><b>Notificador</b></div>
                    <v-flex xs6>
                      <v-text-field type="text-input" name="notificatorName" background-color="primary-50" v-model="notificatorName"
                                    box label="Notificator Name *"
                                    placeholder="Notificator Name" :error-messages="notificatorNameError">
                      </v-text-field>
                    </v-flex>
                    <div>
                      <div><b>SMS Config</b></div>
                      <v-flex xs8>
                        <sms-config ref="smsConfigOne">
                        </sms-config>
                      </v-flex>
                    </div>
                    <div>
                      <div><b>Services</b></div>
                      <div>
                        <div><b>FTP</b></div>
                        <service ref="ftpOne">
                        </service>
                      </div>
                      <div>
                        <div><b>HPD</b></div>
                        <service ref="hpdOne">
                        </service>
                      </div>
                      <div>
                        <div><b>SMS</b></div>
                        <service ref="smsOne">
                      </service>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div><b>Conciliator</b></div>
                    <v-flex xs6>
                      <v-text-field type="text-input" name="conciliatorName" background-color="primary-50" v-model="conciliatorName"
                                    box label="Conciliator Name *"
                                    placeholder="Conciliator Name" :error-messages="conciliatorNameError">
                      </v-text-field>
                    </v-flex>
                    <div>
                      <div><b>Queries</b></div>
                      <div>
                        <div><b>Query 01</b></div>
                        <query ref="queryOne">
                        </query>
                      </div>
                      <div>
                        <div><b>Query 02</b></div>
                        <query ref="queryTwo">
                        </query>
                      </div>
                      <div>
                        <div><b>Query 03</b></div>
                        <query ref="queryThree">
                        </query>
                      </div>
                      <div>
                        <div><b>Query 04</b></div>
                        <query ref="queryFour">
                        </query>
                      </div>
                    </div>
                    <div>
                      <div><b>Services</b></div>
                      <div>
                        <div><b>List</b></div>
                        <service ref="listOne">
                        </service>
                      </div>
                      <div>
                        <div><b>Add</b></div>
                        <service ref="addOne">
                        </service>
                      </div>
                      <div>
                        <div><b>Delete</b></div>
                        <service ref="deleteOne">
                        </service>
                      </div>
                    </div>
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
import SmsConfig from '@/components/setup/SmsConfig';
import ModalDialog from '@/components/ModalDialog';
// import SnackBarNotify from '@/components/SnackBarNotify';
import Service from '@/components/setup/Service';
import Query from '@/components/setup/Query';

export default {
  name: 'SetpUpOneForm',
  components: {
    SmsConfig,
    ModalDialog,
    Service,
    Query,
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
      notificatorName: '',
      notificatorNameError: '',
      conciliatorName: '',
      conciliatorNameError: '',
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
    sendRequest() {
      let response = false;

      if (this.model.validate() && this.validateData()) {
        this.model.modules.notificator.name = this.notificatorName;
        this.model.modules.notificator.sms_config = this.$refs.smsConfigOne.copyParent();

        this.model.modules.notificator.services.ftp = this.$refs.ftpOne.copyParent();
        this.model.modules.notificator.services.hpd = this.$refs.hpdOne.copyParent();
        this.model.modules.notificator.services.sms = this.$refs.smsOne.copyParent();

        this.model.modules.conciliator.name = this.conciliatorName;
        this.model.modules.conciliator.queries.query01 = this.$refs.queryOne.copyParent();
        this.model.modules.conciliator.queries.query02 = this.$refs.queryTwo.copyParent();
        this.model.modules.conciliator.queries.query03 = this.$refs.queryThree.copyParent();
        this.model.modules.conciliator.queries.query04 = this.$refs.queryFour.copyParent();

        this.model.modules.conciliator.services.list = this.$refs.listOne.copyParent();
        this.model.modules.conciliator.services.add = this.$refs.addOne.copyParent();
        this.model.modules.conciliator.services.delete = this.$refs.deleteOne.copyParent();

        return this.model.save().then(() => {
          response = true;
          this.$router.push('home');
          // this.setSnackBar('The item was created successfully.', 'success');
        });
      }
      return response;
    },
    validateData() {
      const flagNoticatorName = this.notificatorName.length === 0 || this.notificatorName.length > 100;
      const error = 'This field is mandatory';
      this.notificatorNameError = '';
      if (flagNoticatorName) {
        this.notificatorNameError = error;
      }

      const flagSmsConfig = this.$refs.smsConfigOne.validateData();

      const flagConciliatorName = this.conciliatorName.length === 0 || this.conciliatorName.length > 100;
      this.conciliatorNameError = '';
      if (flagConciliatorName) {
        this.conciliatorNameError = this.error;
      }

      const flagQueryOne = this.$refs.queryOne.validateData();
      const flagQueryTwo = this.$refs.queryTwo.validateData();
      const flagQueryThree = this.$refs.queryThree.validateData();
      const flagQueryFour = this.$refs.queryFour.validateData();

      const flagFtpOne = this.$refs.ftpOne.validateData();
      const flagHpdOne = this.$refs.hpdOne.validateData();
      const flagSmsOne = this.$refs.smsOne.validateData();

      const flagListOne = this.$refs.listOne.validateData();
      const flagAddOne = this.$refs.addOne.validateData();
      const flagDeleteOne = this.$refs.deleteOne.validateData();

      const flagName = !flagNoticatorName && !flagConciliatorName;
      const flagNotificatorService = flagFtpOne && flagHpdOne && flagSmsOne;
      const flagQuery = flagQueryOne && flagQueryTwo && flagQueryThree && flagQueryFour;
      const flagConciliatorService = flagListOne && flagAddOne && flagDeleteOne;
      return flagName && flagSmsConfig && flagNotificatorService && flagQuery && flagConciliatorService;
    },
    /*
    setSnackBar(message, color) {
      this.notifySnackBar(message, color);
    },
    */
    initialData() {
      this.model.modules = {
        notificator: {
          name: '',
          sms_config: {},
          services: {},
        },
        conciliator: {
          name: '',
          queries: {},
          services: {},
        },
      };
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
