<template lang="pug">
.cell.auto.grid-x.align-right
  .cell.shrink.label.secondary(v-if="skill.isProfessional") Beruf
  .cell.shrink.label(v-if="skill.isSelected") Optional
  .cell.shrink.label.success(v-if="skill.bonusCount") Bonus
    span(v-if="skill.bonusCount > 1") (x{{ skill.bonusCount }})
  | &nbsp;{{ calculatedValue }}
  span(v-if="isANumber") %

</template>

<script>

export default {
  props: {
    skill: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    isANumber() {
      return Number.isInteger(this.skill.baseValue);
    },
    calculatedValue() {
      const {
        baseValue, professionalValue, isProfessional, isSelected, bonusCount,
      } = this.skill;

      let value = baseValue;

      if (isProfessional || isSelected) {
        value = professionalValue;
      }

      for (let i = 0; i < bonusCount; i++) value += 20;

      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../common/settings';

</style>
