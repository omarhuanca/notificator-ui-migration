export default {
  data() {
    return {
    };
  },
  methods: {
    replaceAll(source, oldText, newText) {
      if (typeof source === 'undefined' || source === null) {
        return source;
      }
      const reg = new RegExp(`/[${oldText}]/g`);
      return source.replace(reg, newText);
    },
    replaceFisrt(source, oldText, newText) {
      if (typeof source === 'undefined' || source === null) {
        return source;
      }
      return source.replace(oldText, newText);
    },
    removeItemFromArr(arr, item) {
      const i = arr.indexOf(item);
      if (i !== -1) {
        arr.splice(i, 1);
      }
    },
    removeAllItemsFromArr(arr) {
      arr.splice(1, arr.length);
    },
    notifySnackBar(message, color, time = 2000, active = true) {
      this.$store.dispatch('globalChangeNotifySnackBar', {
        color,
        active,
        message,
        duration: time,
      });
    },
  },
};
