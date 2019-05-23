<template>
  <div>
    <v-layout row wrap>
    <v-flex xs10>
      <v-form>
        <v-container grid-list-md>
          <v-layout column wrap>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field type="text-input" name="startDateTime" background-color="primary-50" v-model="startDateTime" box label="Start Date *"
                              placeholder="Start Date" :error-messages="startDateTimeEror">
                </v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field type="text-input" name="endDateTime" background-color="primary-50" v-model="endDateTime" box label="End Date *"
                              placeholder="End Date" :error-messages="endDateTimeError">
                </v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field type="numeric" name="code" background-color="primary-50" v-model="code" box label="Code *"
                              placeholder="Code" :error-messages="codeError">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
    <v-flex xs2>
        <div>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn @click="search()">Search</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn>Clear</v-btn>
            </v-flex>
          </v-layout>
        </div>
    </v-flex>
    <v-layout row wrap>
        <v-flex xs12>
        <v-data-table :headers="headers" :items="[]" class="elevation-1 data-table__fixed-header v-table__overflow"
                    item-key="name" style="max-height: calc(40vh);backface-visibility: hidden;" hide-actions>
        <template slot="items" slot-scope="props">
            <td>{{ props.item.start_time }}</td>
            <td>{{ props.item.end_time }}</td>
            <td>
            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>
            </td>
        </template>
        </v-data-table>
        </v-flex>
    </v-layout>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ReportOneForm',
  data() {
    return {
      startDateTime: '',
      startDateTimeEror: '',
      endDateTime: '',
      endDateTimeError: '',
      code: '',
      codeError: '',
      error: 'This field is mandatory',
      headers: [
        {
          text: 'Start Time',
        },
        {
          text: 'End Time',
        },
        {
          text: 'Code',
        },
        {
          text: 'Option',
        },
      ],
    };
  },
  methods: {
    search() {
      this.validateData();
    },
    validateData() {
      let response = false;
      const flagStartDateTime = this.startDateTime.length === 0;
      this.startDateTimeEror = '';
      if (flagStartDateTime) {
        this.startDateTimeEror = this.error;
      }

      const flagEndDateTime = this.endDateTime.length === 0;
      this.endDateTimeError = '';
      if (flagEndDateTime) {
        this.endDateTimeError = this.error;
      }

      const flagCode = this.code.length === 0;
      this.codeError = '';
      if (flagCode) {
        this.codeError = this.error;
      }

      if (!flagStartDateTime && !flagEndDateTime && !flagCode) {
        response = false;
      }
      return response;
    },
  },
};
</script>
