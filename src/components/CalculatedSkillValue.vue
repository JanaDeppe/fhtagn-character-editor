<template lang="pug">
.flex.content-end.ml-1.mr-1.items-center
  .skill-badge
    .badge.bg-slate-600(v-if="skill.isProfessional && skill.isSelectedProfessional") {{ $t("common.terms.profession") }}
  .skill-badge
    .badge.bg-blue-600(v-if="skill.isOptional && skill.isSelected") {{ $t("common.terms.optional") }}
  .skill-badge
    .badge.bg-green-600(v-if="skill.bonusCount") {{ $t("common.terms.bonus") }}
      span(v-if="skill.bonusCount > 1") (x{{ skill.bonusCount }})
  .ml-2 {{ calculatedValue }}
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
