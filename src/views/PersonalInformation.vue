<template lang="pug">
.flex.flex-wrap
  .basis-full
    h2 {{ $t("common.terms.personalInformation") }}
    p {{ $t("views.personalInformation.addPersonalInfo") }}
  .basis-full.grid.grid-cols-2.gap-3.mt-3
      div(v-for="(data, key) in currentPersonalInformation")
        label {{$t(`rulesystem.personalInformation.${key}`)}}
        textarea.w-full(
          v-if="key === 'notes'"
          v-model="currentPersonalInformation[key]"
          rows="5")
        input.w-full(
          v-else
          type="text"
            v-model="currentPersonalInformation[key]")

</template>

<script>
import { mapStores } from "pinia";
import { useCharacterStore } from "../stores/character";
import { useCommonStore } from "../stores/common";

export default {
  props: "",
  computed: {
    ...mapStores(useCharacterStore, useCommonStore),
    currentPersonalInformation: {
      get() {
        return this.characterStore.personalInformation;
      },
      set(newValue) {
        this.checkForError(newValue);
        this.characterStore.personalInformation = { ...newValue };
      },
    },
  },
  methods: {
    checkForError(personalInfo) {
      let isComplete = true;
      Object.values(personalInfo).forEach((element) => {
        if (element === "") {
          isComplete = false;
        }
      });
      if (isComplete) {
        this.commonStore.removeWarning("missingPersonalInformation");
      } else {
        this.commonStore.addWarning("missingPersonalInformation");
      }
    },
  },
};
</script>
