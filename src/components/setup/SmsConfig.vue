<template>
  <div>
    <v-text-field type="text-input" name="smsTemplate" background-color="primary-50" v-model="sms_template" box label="SMS Template *"
                  placeholder="Enter SMS Template" :error-messages="smsTemplateError">
    </v-text-field>
    <v-time-picker ref="expirationTime" v-model="add_expiration_time_to_end_date" type="month" width="290" class="mt-3" use-seconds>
    </v-time-picker>
    <div v-if="validatePicker" class="showerror">
      <span>{{ error }}</span>
    </div>
    <v-autocomplete background-color="primary-50" v-model="copySelected" placeholder="Select paquetigos" label="Paquetigos *"
                      :items="paquetigos" :multiple="multiple" item-text="name" box
                      item-value="name" height="56px"
                      chips return-object :error-messages="paquetigosError">
        <template slot="selection" slot-scope="paquetigo">
          <v-chip color="secondary-200" close class="chip--select-multi" @input="removeItem(paquetigo)" small>
            {{ paquetigo.item.name }}
          </v-chip>
        </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'SmsConfig',
  computed: {
    paquetigos: function updatePaquetigos() {
      return this.localSelected;
    },
  },
  data() {
    return {
      notificatorName: '',
      sms_template: '',
      add_expiration_time_to_end_date: '',
      localSelected: [],
      multiple: true,
      validatePicker: false,
      copySelected: [],
      smsTemplateError: '',
      paquetigosError: '',
      error: 'This field is mandatory',
      multipleError: 'You should select at least one option',
    };
  },
  methods: {
    initialData() {
      this.localSelected = [
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
    removeItem(option) {
      const index = this.localSelected.findIndex(opt => opt.id === option.item.id);
      if (index >= 0) {
        this.localSelected.splice(index, 1);
      }
    },
    validateData() {
      let response = false;
      const flagTemplate = this.sms_template.length === 0 || this.sms_template.length > 100;
      this.smsTemplateError = '';
      if (flagTemplate) {
        this.smsTemplateError = this.error;
      }

      const flagExpirationTime = this.add_expiration_time_to_end_date.length === 0;
      this.validatePicker = false;
      if (flagExpirationTime) {
        this.validatePicker = true;
      }

      const flagPackage = this.copySelected.length <= 0;
      this.paquetigosError = '';
      if (flagPackage) {
        this.paquetigosError = this.multipleError;
      }

      if (!flagTemplate && !flagExpirationTime && !flagPackage) {
        response = true;
      }
      return response;
    },
    copyParent() {
      return {
        sms_template: this.sms_template,
        add_expiration_time_to_end_date: this.add_expiration_time_to_end_date,
        paquetigos: this.copySelected.map(item => item.name),
      };
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
