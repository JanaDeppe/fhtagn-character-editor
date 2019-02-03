<template lang="pug">
.grid-x.grid-padding-x
  .cell.small-12
    h1.text-center Erstelle einen neuen <br>Fhtagn Charakter!
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
    .cell.medium-6.large-4.xlarge-3: .callout.primary
      .label.primary= i+1
      = ' ' + steps[i++]
  .cell.small-12
    button.button(@click="createNewCharacter") Neuen Charakter starten

</template>

<script>
import store from '@/store';
import {
  CREATE_NEW_CHARACTER,
} from '@/store/actions.type';

export default {
  props: '',
  methods: {
    createNewCharacter() {
      store.dispatch(CREATE_NEW_CHARACTER);
      this.$router.push({ name: 'attributes' });
    },
  },
};
</script>
