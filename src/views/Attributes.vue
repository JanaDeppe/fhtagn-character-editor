<template lang="pug">
div
  .grid-x.grid-margin-x.align-stretch.text-center(v-if="isPickerVisible")
    .cell.small-12
      h2 Mit welcher Methode möchtest du die Attribute generieren?
    a.cell.small-12.display-block.callout(
      @click="switchGenerationMethod(1)"
      v-bind:class="{success: distributionMethod === 1}"
      )
        h3 Standard
        p Punkte können frei auf verschiedene Attribute verteilt werden.
    a.cell.medium-4.display-block.callout(
      @click="switchGenerationMethod(2)"
      v-bind:class="{success: distributionMethod === 2}"
      )
        h4 Liste
        p Attributswerte werden aus einer Liste verteilt.
    a.cell.medium-4.display-block.callout(
      @click="switchGenerationMethod(3)"
      v-bind:class="{success: distributionMethod === 3}"
      )
        h4 Würfeln
        p Attributswerte werden zuerst ausgewürfelt, dann verteilt.
    a.cell.medium-4.display-block.callout(
      @click="switchGenerationMethod(4)"
      v-bind:class="{success: distributionMethod === 4}"
      )
        h4 Automatisch
        p Attributswerte werden zufällig aus einer Liste auf die Attribute verteilt.

  .grid-x.grid-margin-x.text-right(v-if="!isPickerVisible")
    .cell
      button.button.secondary.small(@click="isPickerVisible = true") Andere Methode auswählen

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
      isPickerVisible: true,
      distributionMethod: 0,
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
