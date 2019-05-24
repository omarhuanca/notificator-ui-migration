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
                  <div><b>Notificator</b></div>
                  <v-flex xs6>
                    <v-text-field type="text-input" name="notificatorName" background-color="primary-50" v-model="notificatorName"
                                  box label="Notificator Name *"
                                  placeholder="Notificator Name" :error-messages="notificatorNameError">
                    </v-text-field>
                  </v-flex>
                  <div>
                    <div><b>FTP</b></div>
                    <notificator ref="ftpNotificatorThree">
                    </notificator>
                    <v-flex xs6>
                      <v-text-field type="number" name="total_msisdn" background-color="primary-50" v-model="total_msisdn" box label="Total Msidn *"
                                    placeholder="Total Msidn" :error-messages="totalError">
                      </v-text-field>
                    </v-flex>
                  </div>
                  <div>
                    <div><b>HPD</b></div>
                    <notificator ref="hpdNotificatorThree">
                    </notificator>
                    <v-flex xs6>
                      <v-text-field type="number" name="add_expiration_time_in_minutes" background-color="primary-50"
                                    v-model="add_expiration_time_in_minutes" box label="Expiration Time *"
                                    placeholder="Expiration Time" :error-messages="expirationTimeError">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field type="number" name="max_credit" background-color="primary-50" v-model="max_credit" box label="Max Credit *"
                                  placeholder="Max Credit" :error-messages="creditError">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete background-color="primary-50" v-model="listModel" placeholder="MSISDNS Test" label="MSISDNS Test *"
                            :items="updateList" :multiple="multiple" item-text="name" box
                            item-value="name" height="56px" :error-messages="testError"
                            chips return-object>
                        <template slot="selection" slot-scope="props">
                          <v-chip color="secondary-200" close class="chip--select-multi" small>
                            {{ props.item.name }}
                          </v-chip>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                    <v-flex xs6>
                      <v-autocomplete background-color="primary-50" v-model="paquetigos" placeholder="Paquetigos" label="Paquetigos *"
                            :items="updatePaquetigo" :multiple="multiple" item-text="name" box
                            item-value="name" height="56px" :error-messages="paquetigoError"
                            chips return-object>
                        <template slot="selection" slot-scope="props">
                          <v-chip color="secondary-200" close class="chip--select-multi" small>
                            {{ props.item.name }}
                          </v-chip>
                        </template>
                      </v-autocomplete>
                    </v-flex>
                  </div>
                  <div>
                    <div><b>SMS</b></div>
                    <notificator ref="smsNotificatorThree">
                    </notificator>
                  </div>
                </div>
              </div>
            </v-layout>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
    <v-flex xs4>
        <div>
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
    <!--snack-bar-notify></snack-bar-notify-->
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
import ModalDialog from '@/components/ModalDialog';
import Notificator from '@/components/setup/Notificator';
// import SnackBarNotify from '@/components/SnackBarNotify';

export default {
  name: 'SetpUpThreeForm',
  components: {
    ModalDialog,
    Notificator,
    // SnackBarNotify,
  },
  computed: {
    ...mapState({
      model: state => state.setUpForm.model,
    }),
    updateList: function updateList() {
      return this.listSelected;
    },
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
      add_expiration_time_in_minutes: '',
      expirationTimeError: '',
      max_credit: '',
      creditError: '',
      total_msisdn: '',
      totalError: '',
      multiple: true,
      listSelected: [],
      listModel: [],
      testError: '',
      updatePaquetigo: [],
      paquetigos: [],
      paquetigoError: '',
      error: 'This field is mandatory',
      numberError: 'This field is mandatory or verify value',
      multipleError: 'You should select at least one option',
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
      const flagName = this.validateData();
      if (this.model.validate() && flagName) {
        this.model.modules.notificator.name = this.notificatorName;
        const ftp = this.$refs.ftpNotificatorThree.copyParent();
        ftp.total_msisdn = 100;
        this.model.modules.notificator.ftp = ftp;

        const hpd = this.$refs.hpdNotificatorThree.copyParent();
        hpd.add_expiration_time_in_minutes = parseInt(this.add_expiration_time_in_minutes, 10);
        hpd.max_credit = parseInt(this.max_credit, 10);
        hpd.msisdns_test = this.listModel.map(item => item.name);
        hpd.paquetigos = this.paquetigos.map(item => item.name);
        this.model.modules.notificator.hpd = hpd;

        this.model.modules.notificator.sms = this.$refs.smsNotificatorThree.copyParent();
        return this.model.save().then(() => {
          response = true;
          this.$router.push('masteritems');
          // this.setSnackBar('The item was created successfully.', 'success');
        });
      }
      return response;
    },
    validateData() {
      let response = false;
      const flagNoticatorName = this.notificatorName.length === 0 || this.notificatorName.length > 100;
      this.notificatorNameError = '';
      if (flagNoticatorName) {
        this.notificatorNameError = this.error;
      }

      const flagTotal = this.total_msisdn <= 0;
      this.totalError = '';
      if (flagTotal) {
        this.totalError = this.numberError;
      }

      const flagExpirationTime = this.add_expiration_time_in_minutes <= 0;
      this.expirationTimeError = '';
      if (flagExpirationTime) {
        this.expirationTimeError = this.numberError;
      }

      const flagCredit = this.max_credit <= 0;
      this.creditError = '';
      if (flagCredit) {
        this.creditError = this.numberError;
      }

      const flagTest = this.listModel.length === 0;
      this.testError = '';
      if (flagTest) {
        this.testError = this.multipleError;
      }

      const flagPaquetigo = this.paquetigos.length === 0;
      this.paquetigoError = '';
      if (flagPaquetigo) {
        this.paquetigoError = this.multipleError;
      }

      const flagMultipleSelect = !flagTest && !flagPaquetigo;
      const flagFtpNoficicatorThree = this.$refs.ftpNotificatorThree.validateData();
      const flagHpdNotificator = this.$refs.hpdNotificatorThree.validateData();
      const flagSmsNotificator = this.$refs.smsNotificatorThree.validateData();
      const flagNotificator = flagFtpNoficicatorThree && flagHpdNotificator && flagSmsNotificator;
      const flagNumber = !flagTotal && !flagExpirationTime && !flagCredit;

      response = !flagNoticatorName && flagNotificator && flagNumber && flagMultipleSelect;
      return response;
    },
    initialData() {
      this.model.modules = {
        notificator: {
          name: '',
        },
        conciliator: {
          name: 'CONCILIADOR DWH',
          list: null,
          add: null,
          delete: null,
        },
      };
      this.listSelected = [
        {
          id: 1,
          name: '101',
        },
        {
          id: 2,
          name: '102',
        },
        {
          id: 3,
          name: '103',
        },
        {
          id: 4,
          name: '104',
        },
      ];
      this.updatePaquetigo = [
        {
          id: 1,
          name: 'PAQ-1',
        },
        {
          id: 2,
          name: 'PAQ-7',
        },
        {
          id: 3,
          name: 'PAQ-15',
        },
        {
          id: 4,
          name: 'PAQ-30',
        },
      ];
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
