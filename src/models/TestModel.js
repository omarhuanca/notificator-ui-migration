/* eslint-disable */
import { Model } from 'vue-mc';
import { equal, integer, min, required, string, length } from 'vue-mc/validation';

export default class TestModel extends Model {
  requiredNameMessage = 'Name is required';
  nameLengthValidationMessage = 'The name ${value} is too long (Max: 60 characters)';

  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      status: true,
      code: '',
      name: '',
    };
  }
  // Attribute mutations.
  mutations() {
    return {
      id: id => Number(id) || null,
      status: Boolean,
      code: String || '',
      name: name => name.toString().trim(),
    };
  }
  // Attribute validation
  validation() {
    return {
      id: integer.and(min(1)).or(equal(null)),
      name: string.and(required.format(this.requiredNameMessage)).and(length(1, 60).format(this.nameLengthValidationMessage)),
    };
  }
  options() {
    return {
      identifier: 'id',
      validateOnChange: true,
      validateOnSave: true,
      validateRecursively: true,
      patch: true,
    };
  }
  routes() {
    return {
      save: 'v1/test',
      patch: 'v1/test/{id}',
    };
  }
}