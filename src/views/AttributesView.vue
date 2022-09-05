<template lang="pug">
div
  .grid.grid-cols-3.auto-rows-min.gap-5.text-center(v-if="isPickerVisible")
    .col-span-3.row-auto
      h2 Mit welcher Methode möchtest du die Attribute generieren?
    a.block.col-span-3.row-auto
      .border.p-3(
        @click="switchGenerationMethod(1)"
        v-bind:class="{'border-rust shadow': distributionMethod === 1}"
        )
          h3 Standard
          p Punkte können frei auf verschiedene Attribute verteilt werden.
    a.block.col-span-3.md_col-span-1
      .border.p-3(
        @click="switchGenerationMethod(2)"
        v-bind:class="{'border-rust shadow': distributionMethod === 2}"
        )
          h4 Liste
          p Attributswerte werden aus einer Liste verteilt.
    a.block.col-span-3.md_col-span-1
      .border.p-3(
        @click="switchGenerationMethod(3)"
        v-bind:class="{'border-rust shadow': distributionMethod === 3}"
        )
          h4 Würfeln
          p Attributswerte werden zuerst ausgewürfelt, dann verteilt.
    a.block.col-span-3.md_col-span-1
      .border.p-3(
        @click="switchGenerationMethod(4)"
        v-bind:class="{'border-rust shadow': distributionMethod === 4}"
        )
          h4 Automatisch
          p Attributswerte werden zufällig aus einer Liste auf die Attribute verteilt.

  .flex.justify-center.mt-3(v-if="!isPickerVisible")
    .basis-auto
      .button(@click="isPickerVisible = true") Andere Methode auswählen

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
import { mapStores } from "pinia";
import { useCharacterStore } from "@/stores/character";

import PointDistributor from "@/components/PointDistributor.vue";
import DiceRoller from "@/components/DiceRoller.vue";
import DragnDropAttributes from "@/components/DragnDropAttributes.vue";

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
      distributionMethod: 1,
    };
  },
  computed: {
    ...mapStores(useCharacterStore),
    attributeValues: {
      get() {
        return this.characterStore.attributeValues;
      },
      set(newAttributeValues) {
        this.characterStore.attributeValues = newAttributeValues;
      },
    },
  },
  methods: {
    switchGenerationMethod(methodIndex) {
      this.isPickerVisible = false;
      this.distributionMethod = methodIndex;
    },
  },
};
</script>
