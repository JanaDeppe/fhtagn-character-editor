<template lang="pug">
.row
  .col-12
    h2.text-center Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .col-12(v-for="(motivation, index) in characterStore.motivations")
    .form-group
      label Motivation \#{{index+1}}
      input.form-control(
        type="text"
        placeholder="Beschreibung der Motivation"
        @change="handleMotivationsChange($event, index)")

</template>

<script>
import { mapStores } from "pinia";
import { useCommonStore } from "../stores/common";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useCommonStore, useCharacterStore),
  },
  created() {
    this.checkForError();
  },
  methods: {
    handleMotivationsChange(e, index) {
      this.characterStore
        .updateMotivation({
          index,
          value: e.currentTarget.value,
        })
        .then(() => this.checkForError());
    },
    checkForError() {
      let isComplete = true;
      this.characterStore.motivations.forEach((element) => {
        if (element === "") {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.commonStore.removeWarning("missingMotivations");
      } else {
        this.commonStore.addWarning("missingMotivations");
      }
    },
  },
};
</script>
