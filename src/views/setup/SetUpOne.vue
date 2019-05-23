<template>
  <div>
    <set-up-one-form :model="model">
    </set-up-one-form>
  </div>
</template>

<script>
import SetUpOneForm from '@/components/setup/SetUpOneForm';
import SetUpOneModel from '@/models/SetUpOneModel';

export default {
  name: 'SetpUpOne',
  components: {
    SetUpOneForm,
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    initialData() {
      this.model = new SetUpOneModel();
      this.$store.dispatch('setUpFormChangeData', this.model);
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
