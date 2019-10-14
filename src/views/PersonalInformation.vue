<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Persönliche Informationen
    p Zu guter Letzt, gebe einige persönliche Daten zu deinem Charakter an!
  .cell
    .grid-x.grid-padding-x
      .cell.medium-6(v-for="(data, key) in currentInfo")
        label {{key}}
          input(type="text" v-model="currentInfo[key]" @change="handlePersonalInformationChange")

</template>

<script>
import { mapState, mapActions } from 'vuex';
import { act } from '@/store/type';

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
    ...mapActions({
      updatePersonalInformation: act.UPDATE_PERSONAL_INFORMATION,
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    handlePersonalInformationChange() {
      this.checkForError(this.currentInfo);
      this.updatePersonalInformation(this.currentInfo);
    },
    checkForError(personalInfo) {
      let isComplete = true;
      Object.values(personalInfo).forEach((element) => {
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
