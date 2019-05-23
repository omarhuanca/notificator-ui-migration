<template>
  <div>
    <v-form>
        <v-container grid-list-md>
        <v-layout column wrap>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn @click="addSchedule()">ADD TO LIST NOTIFICATOR</v-btn>
            </v-flex>
            <div>
              <span><b>Start Time</b></span>
              <v-time-picker ref="startTime" v-model="start_time" type="month" width="290" class="mt-3" use-seconds>
              </v-time-picker>
              <div v-if="startTimeError" class="showerror">
                  <span>{{ error }}</span>
              </div>
              <span><b>End Time</b></span>
              <v-time-picker ref="endTime" v-model="end_time" type="month" width="290" class="mt-3" use-seconds>
              </v-time-picker>
              <div v-if="endTimeError" class="showerror">
                  <span>{{ error }}</span>
              </div>
              <span v-if="flagStartEndTime"><b>The end_time should be greather than start_time</b></span>
            </div>
            <v-flex xs6>
              <span><b>Expiration Time</b></span>
              <v-time-picker ref="expirationTime" v-model="add_expiration_time_to_end_date" type="month" width="290" class="mt-3" use-seconds>
              </v-time-picker>
              <div v-if="expirationTimeError" class="showerror">
                  <span>{{ error }}</span>
              </div>
            </v-flex>
            <v-flex xs6>
                <v-text-field type="text-input" name="ftp_file" background-color="primary-50" v-model="ftp_file" box label="FTP File *"
                              placeholder="FTP File" :error-messages="ftpFileError">
                </v-text-field>
            </v-flex>
            <throttling ref='ftpThrottling'>
            </throttling>
            <throttling ref='hpdThrottling'>
            </throttling>
            <throttling ref='smsThrottling'>
            </throttling>
          </v-layout>
        </v-layout>
        </v-container>
    </v-form>
    <v-layout row wrap>
        <v-flex xs12>
        <span><b>LIST NOTIFICATOR CONCILIATOR</b></span>
        <v-data-table :headers="headers" :items="notificatorSchedule" class="elevation-1 data-table__fixed-header v-table__overflow"
                    item-key="name" style="max-height: calc(40vh);backface-visibility: hidden;" hide-actions>
        <template slot="items" slot-scope="props">
            <td>{{ props.item.start_time }}</td>
            <td>{{ props.item.end_time }}</td>
            <td>
            <v-btn icon @click="onRemoveItem(props.item)">
                <v-icon>delete</v-icon>
            </v-btn>
            </td>
        </template>
        </v-data-table>
        </v-flex>
    </v-layout>
    <modal-dialog :visible="scheduleDialog.showDialog" :actionName="scheduleDialog.eventName"
                  @confirmOrCancelEvent="confirmRemoveItem" :buttonsLabel="scheduleDialog.labels">
      <template slot="title">{{ scheduleDialog.labels.title }}</template>
      <template slot="content">
        {{ scheduleDialog.labels.content }}
      </template>
    </modal-dialog>
  </div>
</template>

<script>
import ModalDialog from '@/components/ModalDialog';
// import SnackBarNotify from '@/components/SnackBarNotify';
import Throttling from '@/components/setup/Throttling';

export default {
  name: 'Schedule',
  components: {
    ModalDialog,
    // SnackBarNotify,
    Throttling,
  },
  data() {
    return {
      start_time: '',
      end_time: '',
      add_expiration_time_to_end_date: '',
      ftp_file: '',
      ftpFileError: '',
      startTimeError: false,
      endTimeError: false,
      expirationTimeError: false,
      startTimeInteger: '',
      endTimeInteger: '',
      schedule: null,
      flagStartEndTime: false,
      headers: [
        {
          text: 'Start Time',
          value: 'start_time',
          sortable: false,
        },
        {
          text: 'End Time',
          value: 'end_time',
          sortable: false,
        },
        {
          text: 'Option',
          sortable: false,
        },
      ],
      error: 'This field is mandatory',
      scheduleDialog: {
        labels: {
          title: 'Remove Notificator Schedule',
          content: 'Are you sure?',
          cancelButton: 'NO, I\'M NOT',
          confirmButton: 'YES, I\'M SURE',
        },
        eventName: 'removeSchedule',
        showDialog: false,
      },
      selected: null,
      notificatorSchedule: null,
    };
  },
  methods: {
    addSchedule() {
      const validateSchedule = this.validateData();
      if (validateSchedule) {
        const schedule = {
          start_time: this.start_time,
          startTimeInteger: this.startTimeInteger,
          end_time: this.end_time,
          endTimeInteger: this.endTimeInteger,
          add_expiration_time_to_end_date: this.add_expiration_time_to_end_date,
          ftp_file: this.ftp_file,
          throttling: {
            ftp: this.$refs.ftpThrottling.copyParent(),
            hpd: this.$refs.hpdThrottling.copyParent(),
            sms: this.$refs.smsThrottling.copyParent(),
          },
        };
        this.validateIntoList(schedule);
      }
    },
    validateData() {
      let response = false;
      const flagStartTime = this.start_time.length === 0;
      this.startTimeError = false;
      if (flagStartTime) {
        this.startTimeError = true;
      } else {
        this.startTimeInteger = this.convertToInteger(this.start_time);
      }

      const flagEndDateTime = this.end_time.length === 0;
      this.endTimeError = false;
      if (flagEndDateTime) {
        this.endTimeError = true;
      } else {
        this.endTimeInteger = this.convertToInteger(this.end_time);
      }

      this.flagStartEndTime = false;
      if (!flagStartTime && !flagEndDateTime) {
        if (this.startTimeInteger > this.endTimeInteger) {
          this.flagStartEndTime = true;
        }
      }

      const flagExpirationTime = this.add_expiration_time_to_end_date.length === 0;
      this.expirationTimeError = false;
      if (flagExpirationTime) {
        this.expirationTimeError = true;
      }

      const flagFtpFile = this.ftp_file.length === 0 || !this.ftp_file.includes('{aaaammdd}');
      this.ftpFileError = '';
      if (flagFtpFile) {
        this.ftpFileError = 'This field is mandatory or verify value';
      }

      const flagFtpThrolling = this.$refs.ftpThrottling.validateData();
      const flagHpdThrolling = this.$refs.hpdThrottling.validateData();
      const flagSmsThrolling = this.$refs.smsThrottling.validateData();
      const flagThrolling = flagFtpThrolling && flagHpdThrolling && flagSmsThrolling;
      response = !this.flagStartEndTime && !flagExpirationTime && !flagFtpFile && flagThrolling;
      return response;
    },
    validateIntoList(schedule) {
      if (schedule) {
        if (this.notificatorSchedule.length === 0) {
          this.notificatorSchedule.push(schedule);
          // this.setSnackBar('A new schedule was added.', 'success');
        } else {
          let count = 0;
          let flagFound = false;
          for (let index = 0; index < this.notificatorSchedule.length; index += 1) {
            const item = this.notificatorSchedule[index];
            if (item) {
              const flagStartTime = item.startTimeInteger <= schedule.startTimeInteger && item.endTimeInteger >= schedule.startTimeInteger;
              const flagEndTime = item.startTimeInteger <= schedule.endTimeInteger && item.endTimeInteger >= schedule.endTimeInteger;
              if (!(flagStartTime || flagEndTime)) {
                count += 1;
                flagFound = true;
              }
            }
          }
          if (count === this.notificatorSchedule.length) {
            if (flagFound) {
              this.notificatorSchedule.push(schedule);
              // this.setSnackBar('A new schedule was added.', 'success');
            }
          }
        }
      }
    },
    convertToInteger(time) {
      let response = 0;
      if (time) {
        if (time.length > 0) {
          const hours = time.split(':');
          const hour = parseInt(hours[0], 10);
          const minute = parseInt(hours[1], 10);
          const second = parseInt(hours[2], 10);
          response = (3600 * hour) + (60 * minute) + second;
        }
      }
      return response;
    },
    setSnackBar(message, color) {
      this.notifySnackBar(message, color);
    },
    onRemoveItem(item) {
      this.selected = item;
      this.scheduleDialog.showDialog = true;
    },
    confirmRemoveItem(value) {
      if (value.result) {
        const item = this.findItem(this.selected.start_time);
        if (item) {
          this.removeItem(item.start_time);
        }
      }
      this.scheduleDialog.showDialog = false;
    },
    findItem(startTime) {
      return this.notificatorSchedule.find(item => item.start_time === startTime);
    },
    removeItem(startTime) {
      const index = this.notificatorSchedule.findIndex(item => item.start_time === startTime);
      if (index > -1) {
        this.notificatorSchedule.splice(index, 1);
      }
    },
    copyParent() {
      let response = [];
      if (this.notificatorSchedule.length > 0) {
        response = this.notificatorSchedule;
      }
      return response;
    },
    initialData() {
      this.notificatorSchedule = [];
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>

<style>
.showerror span {
  color: red;
}
</style>
