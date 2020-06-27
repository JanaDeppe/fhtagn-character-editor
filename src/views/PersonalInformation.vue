<template lang="pug">
.row
  .col-12
    h2.text-center Persönliche Informationen
    p Zu guter Letzt, gebe einige persönliche Daten zu deinem Charakter an!
  .col-12
    .row
      .col-12.col-md-6.mb-3(v-for="(data, key) in currentPersonalInformation")
        .form-group
          label {{key}}
          textarea.form-control(
            v-if="key === 'Notizen'"
            v-model="currentPersonalInformation[key]"
            rows="5")
          input.form-control(
            v-else
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
