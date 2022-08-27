<template lang="pug">
.flex.flex-wrap.items-stretch
  .basis-full.mb-3.lg_order-0
    h1.text-center Erstelle einen neuen FHTAGN Charakter!
  .basis-full.text-center.mb-3.lg_mb-0.lg_mt-3.lg_order-2
    button.button(@click="createNewCharacter") Neuen Charakter starten
  -
    var steps = [
      "Attribute verteilen",
      "Beruf wählen",
      "Fähigkeiten aussuchen",
      "Verbindungen erstellen",
      "Motivationen schreiben",
      "Namen geben"
    ];
    var i = 0;

  .basis-full.grid.gap-3.grid-cols-3.grid-rows-2.lg_order-1
    while i < steps.length
      .border.p-5.text-center
        .h4
          .badge.mb-3= i+1
          br
          = ' ' + steps[i++]


</template>

<script>
import { mapStores } from "pinia";
import { useCharacterStore } from "../stores/character";

export default {
  props: "",
  computed: {
    ...mapStores(useCharacterStore),
  },
  methods: {
    createNewCharacter() {
      this.characterStore.createNewCharacter();
      this.$router.push({ name: "attributes" });
    },
  },
};
</script>
