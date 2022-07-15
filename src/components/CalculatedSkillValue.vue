<template lang="pug">
.row.no-gutters.justify-content-end.ml-1.mr-1.align-items-center
  .col-auto.skill-badge
    .badge.badge-secondary(v-if="skill.isProfessional && skill.isSelectedProfessional") Beruf
  .col-auto.skill-badge
    .badge.badge-primary(v-if="skill.isOptional && skill.isSelected") Optional
  .col-auto.skill-badge
    .badge.badge-success(v-if="skill.bonusCount") Bonus
      span(v-if="skill.bonusCount > 1") (x{{ skill.bonusCount }})
  .col-auto.ml-2 {{ calculatedValue }}
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
        baseValue,
        professionalValue,
        isProfessional,
        isSelectedProfessional,
        isSelected,
        bonusCount,
      } = this.skill;

      let value = baseValue;

      if ((isProfessional && isSelectedProfessional) || isSelected) {
        value = professionalValue;
      }

      for (let i = 0; i < bonusCount; i++) value += 20;

      return value;
    },
  },
};
</script>

<style scoped>
.skill-badge:not(:first-child) {
  margin-left: 1px;
}
</style>
