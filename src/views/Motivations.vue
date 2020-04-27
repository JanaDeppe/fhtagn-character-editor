<template lang="pug">
.row
  .col-12
    h2.text-center Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .col-12(v-for="(motivation, index) in motivations")
    .form-group
      label Motivation \#{{index+1}}
      input.form-control(
        type="text"
        placeholder="Beschreibung der Motivation"
        @change="handleMotivationsChange($event, index)")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

export default {
  props: '',
  computed: {
    ...mapGetters({
      motivations: get.MOTIVATIONS,
    }),
  },
  created() {
    this.checkForError();
  },
  methods: {
    ...mapActions({
      updateMotivation: act.UPDATE_MOTIVATION,
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    handleMotivationsChange(e, index) {
      this.updateMotivation({
        index,
        value: e.currentTarget.value,
      }).then(() => this.checkForError());
    },
    checkForError() {
      let isComplete = true;
      this.motivations.forEach(element => {
        if (element === '') {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.removeWarning('missingMotivations');
      } else {
        this.addWarning('missingMotivations');
      }
    },
  },
};
</script>
