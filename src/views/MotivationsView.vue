<template lang="pug">
.flex.flex-wrap
  .basis-full
    h2 Motivationen
    p Schreibe auf, was deinen Charakter antreibt.

  .basis-full.md_basis-7-12.my-3(v-for="(motivation, index) in characterStore.motivations")
    label.block Motivation \#{{index+1}}
    input.w-full(
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
        .updateMotivation(index, e.currentTarget.value)
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
