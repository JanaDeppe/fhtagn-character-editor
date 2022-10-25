<template lang="pug">
.flex.flex-wrap
  .basis-full
    h2 Facetten
    p Füge, wenn du möchtest, deinem Charakter Facetten hinzu!
  .basis-full(v-for="(facette, name) in rulesystemStore.facettes").callout
    .flex.my-3
      .mr-5
        input(
          type="checkbox"
          v-model="selectedFacettes"
          :value="name"
          :id="name")
      label.block.grow(:for="name")
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
