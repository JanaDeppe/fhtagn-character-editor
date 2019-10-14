<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .cell(v-for="(motivation, index) in availableMotivations")
    label Motivation \#{{index+1}}
      input(type="text" placeholder="Beschreibung der Motivation" v-model="currentMotivations[index]" @change="handleMotivationsChange")

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { act } from '@/store/type';

export default {
  props: '',
  data() {
    return {
      availableMotivations: 5,
      currentMotivations: [],
    };
  },
  computed: {
    ...mapState({
      characterMotivations: state => state.character.motivations,
    }),
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
    handleMotivationsChange() {
      this.checkForError(this.currentMotivations);
      this.updateMotivations(this.currentMotivations);
    },
    checkForError(motivations) {
      let isComplete = true;
      motivations.forEach((element) => {
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
