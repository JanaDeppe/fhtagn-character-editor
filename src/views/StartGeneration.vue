<template lang="pug">
.row
  .col-12.mb-3
    h1.text-center Erstelle einen neuen <br>FHTAGN Charakter!
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
    .col-12.col-md-6.col-lg-4: .alert.alert-secondary.text-center
      .h4
        .badge.badge-secondary.mb-3= i+1
        br
        = ' ' + steps[i++]
  .col-12.text-center.mt-3
    button.btn.btn-success(@click="createNewCharacter") Neuen Charakter starten

</template>

<script>
import { mapActions } from 'vuex';
import { act } from '@/store/type';

export default {
  props: '',
  methods: {
    ...mapActions({
      dispatchCreateNewCharacter: act.CREATE_NEW_CHARACTER,
    }),
    createNewCharacter() {
      this.dispatchCreateNewCharacter();
      this.$router.push({ name: 'attributes' });
    },
  },
};
</script>
