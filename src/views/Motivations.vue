<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .cell(v-for="(motivation, index) in availableMotivations")
    label Motivation \#{{index+1}}
      input(type="text" placeholder="Beschreibung der Motivation" v-model="currentMotivations[index]" @change="updateMotivations")

</template>

<script>
import { mapState } from 'vuex';
import {
  UPDATE_MOTIVATIONS,
  ADD_WARNING,
  REMOVE_WARNING,
} from '@/store/mutations.type';

import store from '@/store';

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
    updateMotivations() {
      this.checkForError(this.currentMotivations);
      store.commit(UPDATE_MOTIVATIONS, this.currentMotivations);
    },
    checkForError(motivations) {
      let isComplete = true;
      motivations.forEach((element) => {
        if (element === '') {
          isComplete = false;
        }
      });
      if (isComplete) {
        store.commit(REMOVE_WARNING, 'missingMotivations');
      } else {
        store.commit(ADD_WARNING, 'missingMotivations');
      }
    },
  },
};
</script>
