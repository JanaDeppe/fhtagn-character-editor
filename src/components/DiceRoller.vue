<template lang="pug">
.row
  .column
    p DiceRoller
    p Attributswerte
    button.button(@click="generateAttributeValues") Neu würfeln
</template>

<script>
export default {
  props: {
    distributableAttributeValues: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    rollAttribute() {
      // roll 4d6, drop lowest, return value
    },
    generateAttributeValues(n) {
      const attrValues = [];
      for (let i = 0; i < n; i += 1) {
        attrValues.push(this.rollAttribute());
      }

      this.$emit('update:distributableAttributeValues', attrValues);
    },
  },
};
</script>
