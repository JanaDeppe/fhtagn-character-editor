<template lang="pug">
.row.align-items-stretch
  .col-12.mb-3.order-lg-0
    h1.text-center Erstelle einen neuen <br>FHTAGN Charakter!
  .col-12.text-center.mb-3.mb-lg-0.mt-lg-3.order-lg-2
    button.btn.btn-success(@click="createNewCharacter") Neuen Charakter starten
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

  while i < steps.length
    .col-12.col-md-6.col-lg-4.order-lg-1.d-flex: .alert.alert-secondary.text-center.col
      .h4
        .badge.badge-secondary.mb-3= i+1
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
