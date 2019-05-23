<template>
  <div>
    <set-up-three-form :model="model">
    </set-up-three-form>
  </div>
</template>

<script>
import SetUpThreeForm from '@/components//setup/SetUpThreeForm';
import SetUpThreeModel from '@/models/SetUpThreeModel';

export default {
  name: 'SetpUpOne',
  components: {
    SetUpThreeForm,
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    initialData() {
      this.model = new SetUpThreeModel();
      this.$store.dispatch('setUpFormChangeData', this.model);
    },
  },
  beforeMount() {
    this.initialData();
  },
};
</script>
