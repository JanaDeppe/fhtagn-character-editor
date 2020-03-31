<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Persönliche Informationen
    p Zu guter Letzt, gebe einige persönliche Daten zu deinem Charakter an!
  .cell
    .grid-x.grid-padding-x
      .cell.medium-6(v-for="(data, key) in currentPersonalInformation")
        label {{key}}
          input(
            type="text"
            v-model="currentPersonalInformation[key]")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

export default {
  props: '',
  computed: {
    ...mapGetters({
      personalInformation: get.PERSONAL_INFORMATION,
    }),
    currentPersonalInformation: {
      get() { return this.personalInformation; },
      set(newValue) {
        this.checkForError(newValue);
        this.updatePersonalInformation(newValue);
      },
    },
  },
  methods: {
    ...mapActions({
      updatePersonalInformation: act.UPDATE_PERSONAL_INFORMATION,
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    checkForError(personalInfo) {
      let isComplete = true;
      Object.values(personalInfo).forEach(element => {
        if (element === '') {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.removeWarning('missingPersonalInformation');
      } else {
        this.addWarning('missingPersonalInformation');
      }
    },
  },
};
</script>
