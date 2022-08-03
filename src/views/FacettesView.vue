<template lang="pug">
.row
  .col-12
    h2.text-center Facetten
    p Füge, wenn du möchtest, deinem Charakter Facetten hinzu!
  .col-12(v-for="(facette, name) in rulesystemStore.facettes").callout
    .row.mb-3
      .col-auto
        input(
          type="checkbox"
          v-model="selectedFacettes"
          :value="name")
      .col
        h4 {{name}}
        p {{facette.description}}
        p
          strong Vorteil:
          |  {{facette.advantage}}
        p
          strong Nachteil:
          |  {{facette.disadvantage}}
</template>

<script>
import { mapStores } from "pinia";
import { useRulesystemStore } from "../stores/rulesystem";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useRulesystemStore, useCharacterStore),
    selectedFacettes: {
      get() {
        return this.characterStore.facettes;
      },
      set(newValue) {
        this.characterStore.facettes = newValue;
      },
    },
  },
};
</script>
