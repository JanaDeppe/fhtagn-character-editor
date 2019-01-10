<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Persönliche Informationen
    p Zu guter Letzt, gebe einige persönliche Daten zu deinem Charakter an!
  .cell
    .grid-x.grid-padding-x
      .cell.medium-6(v-for="(data, key) in currentInfo")
        label {{key}}
          input(type="text" v-model="currentInfo[key]" @change="updatePersonalInformation")

</template>

<script>
import { mapState } from 'vuex';
import {
  SET_PERSONAL_INFORMATION,
  ADD_WARNING,
  REMOVE_WARNING,
} from '@/store/mutations.type';

import store from '@/store';

export default {
  props: '',
  data() {
    return {
      currentInfo: {},
    };
  },
  created() {
    this.checkForError(this.currentInfo);
    this.currentInfo = Object.assign({}, this.characterInfo);
  },
  computed: {
    ...mapState({
      characterInfo: state => state.character.personalInformation,
    }),
  },
  methods: {
    updatePersonalInformation() {
      this.checkForError(this.currentInfo);
      store.commit(SET_PERSONAL_INFORMATION, this.currentInfo);
    },
    checkForError(personalInfo) {
      let isComplete = true;
      Object.values(personalInfo).forEach((element) => {
        if (element === '') {
          isComplete = false;
        }
      });
      if (isComplete) {
        store.commit(REMOVE_WARNING, 'missingPersonalInformation');
      } else {
        store.commit(ADD_WARNING, 'missingPersonalInformation');
      }
    },
  },
};
</script>
