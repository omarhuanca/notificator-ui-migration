/* eslint-disable */
import { Model } from 'vue-mc';
import { equal, required, match, string, length } from 'vue-mc/validation';

export default class SetUpThreeModel extends Model {
  dataLongValidationMessage = 'The title is too long';
  requiredValidationmessage = 'This field is mandatory';
  decimalRegex = /^(\d?\d?\d(,\d\d\d)*|\d+)(\.\d{1,2})?$/;

  defaults() {
    return {
      name: '',
      version: 0,
      modules: null,
    };
  }
  routes() {
    return {
    save: 'v1/saveSetUp',
    };
  }
  validation() {
    return {
        name: required.format(this.requiredValidationmessage).and(string).and(length(0, 100).format(this.dataLongValidationMessage)),
        version: match(this.decimalRegex).format(this.decimalValidationMessage).and(length(0, 10)).or(equal(null)).or(equal('')),
        version: (value) => {
            if (this.version >= 1) {
            return true;
            }
            return this.requiredValidationmessage;
        }
    };
  }
}
