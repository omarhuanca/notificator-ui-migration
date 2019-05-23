<template>
  <div>
    <set-up-two-form :model="model">
    </set-up-two-form>
  </div>
</template>

<script>
import SetUpTwoForm from '@/components/setup/SetUpTwoForm';
import SetUpTwoModel from '@/models/SetUpTwoModel';

export default {
  name: 'SetpUpOne',
  components: {
    SetUpTwoForm,
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    initialData() {
      this.model = new SetUpTwoModel();
      this.$store.dispatch('setUpFormChangeData', this.model);
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
