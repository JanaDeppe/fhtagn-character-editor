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
