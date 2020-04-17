<template lang="pug">
.row
  .col-12
    h2.text-center Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .col-12(v-for="(motivation, index) in availableMotivations")
    .form-group
      label Motivation \#{{index+1}}
      input.form-control(
        type="text"
        placeholder="Beschreibung der Motivation"
        v-model="currentMotivations[index]")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

export default {
  props: '',
  data() {
    return {
      availableMotivations: 5,
    };
  },
  computed: {
    ...mapGetters({
      motivations: get.MOTIVATIONS,
    }),
    currentMotivations: {
      get() { return this.motivations; },
      set(newValue) {
        this.checkForError(newValue);
        this.updateMotivations(newValue);
      },
    },
  },
  created() {
    for (let i = 0; i < this.availableMotivations; i += 1) {
      this.currentMotivations.push('');
    }
    this.checkForError(this.currentMotivations);
  },
  methods: {
    ...mapActions({
      updateMotivations: act.UPDATE_MOTIVATIONS,
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    checkForError(motivations) {
      let isComplete = true;
      motivations.forEach(element => {
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
