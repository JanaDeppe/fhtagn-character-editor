<template lang="pug">
div
  .row.text-center(v-if="isPickerVisible")
    .col-12.mb-3
      h2 Mit welcher Methode möchtest du die Attribute generieren?
    a.col-12.d-block
      .border.p-3.mb-3(
        @click="switchGenerationMethod(1)"
        v-bind:class="{success: distributionMethod === 1}"
        )
          h3 Standard
          p Punkte können frei auf verschiedene Attribute verteilt werden.
    a.col-12.col-md-4.d-block
      .border.p-3(
        @click="switchGenerationMethod(2)"
        v-bind:class="{success: distributionMethod === 2}"
        )
          h4 Liste
          p Attributswerte werden aus einer Liste verteilt.
    a.col-12.col-md-4.d-block
      .border.p-3(
        @click="switchGenerationMethod(3)"
        v-bind:class="{success: distributionMethod === 3}"
        )
          h4 Würfeln
          p Attributswerte werden zuerst ausgewürfelt, dann verteilt.
    a.col-12.col-md-4.d-block
      .border.p-3(
        @click="switchGenerationMethod(4)"
        v-bind:class="{success: distributionMethod === 4}"
        )
          h4 Automatisch
          p Attributswerte werden zufällig aus einer Liste auf die Attribute verteilt.

  .row.justify-content-end.mb-3(v-if="false")
    .cell-12
      .btn.btn-outline-secondary(@click="isPickerVisible = true") Andere Methode auswählen

  // Point Distribution
  .grid-x(v-if="distributionMethod === 1" v-show="!isPickerVisible")
    .cell
      point-distributor(v-model:attributeValues="attributeValues")

  // List + Drag'n'Drop
  .grid-x(v-if="distributionMethod === 2" v-show="!isPickerVisible")
      dragn-drop-attributes(
        v-bind:distributableAttributeValues="distributableAttributeValues"
        v-on:update:attributeValues="attributeValues = $event"
      )

  // Dice + Drag'n'Drop
  .grid-x(v-if="distributionMethod === 3" v-show="!isPickerVisible")
    .cell
      dice-roller(v-on:update:distributableAttributeValues="distributableAttributeValues = $event")

  // Automated
  .grid-x(v-if="distributionMethod === 4" v-show="!isPickerVisible")
    .cell Automated

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import PointDistributor from '@/components/PointDistributor.vue';
import DiceRoller from '@/components/DiceRoller.vue';
import DragnDropAttributes from '@/components/DragnDropAttributes.vue';

export default {
  props: {},
  components: {
    PointDistributor,
    DiceRoller,
    DragnDropAttributes,
  },
  data() {
    return {
      distributableAttributeValues: [],
      isPickerVisible: false,
      distributionMethod: 1,
    };
  },
  computed: {
    ...mapGetters({
      getAttributeValues: get.ATTRIBUTE_VALUES,
    }),
    attributeValues: {
      get() { return this.getAttributeValues; },
      set(newAttributeValues) { this.setAttributeValues(newAttributeValues); },
    },
  },
  methods: {
    ...mapActions({
      setAttributeValues: act.SET_ATTRIBUTE_VALUES,
    }),
    switchGenerationMethod(methodIndex) {
      this.isPickerVisible = false;
      this.distributionMethod = methodIndex;
    },
  },
};
</script>
