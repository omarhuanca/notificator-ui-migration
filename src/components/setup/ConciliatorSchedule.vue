<template>
  <div>
    <v-form>
        <v-container grid-list-md>
        <v-layout column wrap>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn @click="addSchedule()">ADD TO LIST CONCILIATOR</v-btn>
            </v-flex>
            <v-flex xs6>
              <span><b>Start Time</b></span>
              <v-time-picker ref="startTime" v-model="start_time" type="month" width="290" class="mt-3" use-seconds>
              </v-time-picker>
              <div v-if="startTimeError" class="showerror">
                <span>{{ error }}</span>
              </div>
            </v-flex>
            <v-flex xs6>
              <span><b>End Time</b></span>
              <v-time-picker ref="endTime" v-model="end_time" type="month" width="290" class="mt-3" use-seconds>
              </v-time-picker>
            </v-flex>
            <throttling ref='listThrottlingTwo'>
            </throttling>
            <throttling ref='addThrottlingTwo'>
            </throttling>
            <throttling ref='deleteThrottlingTwo'>
            </throttling>
          </v-layout>
        </v-layout>
        </v-container>
    </v-form>
    <v-layout row wrap>
        <v-flex xs12>
        <span><b>LIST SCHEDULE CONCILIATOR</b></span>
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
  name: 'ConciliatorSchedule',
  components: {
    ModalDialog,
    // SnackBarNotify,
    Throttling,
  },
  data() {
    return {
      start_time: '',
      end_time: null,
      startTimeError: false,
      schedule: null,
      startTimeInteger: '',
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
          title: 'Remove Conciliator Schedule',
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
          throttling: {
            list: this.$refs.listThrottlingTwo.copyParent(),
            add: this.$refs.addThrottlingTwo.copyParent(),
            delete: this.$refs.deleteThrottlingTwo.copyParent(),
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

      const flagListThrolling = this.$refs.listThrottlingTwo.validateData();
      const flagAddThrolling = this.$refs.addThrottlingTwo.validateData();
      const flagDeleteThrolling = this.$refs.deleteThrottlingTwo.validateData();
      const flagThrolling = flagListThrolling && flagAddThrolling && flagDeleteThrolling;
      response = !flagStartTime && flagThrolling;
      return response;
    },
    validateIntoList(schedule) {
      if (schedule) {
        if (this.notificatorSchedule.length === 0) {
          this.notificatorSchedule.push(schedule);
          // this.setSnackBar('A new schedule was added.', 'success');
        } else {
          const filterList = this.notificatorSchedule.filter(item => item.startTimeInteger === schedule.startTimeInteger);
          if (filterList) {
            if (filterList.length === 0) {
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
    /*
    setSnackBar(message, color) {
      this.notifySnackBar(message, color);
    },
    */
    initialData() {
      this.notificatorSchedule = [];
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
