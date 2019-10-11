<template lang="pug">
.cell.auto.grid-x.align-right
  .cell.shrink.label.secondary(v-if="skill.isProfessional") Beruf
  .cell.shrink.label(v-if="skill.isSelected") Optional
  .cell.shrink.label.success(v-if="skill.isBonus") Bonus
  | &nbsp;{{ getCalculatedSkillValueByName(skillName, index) }}
  span(v-if="isANumber") %

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { get } from '@/store/type';

export default {
  props: {
    skillName: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
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
    ...mapGetters({
      getCalculatedSkillValueByName: get.CALCULATED_SKILL_VALUE_BY_NAME,
    }),
    isANumber() {
      return Number.isInteger(this.skill.baseValue);
    },
    ...mapState({
      skills: state => state.rulesystem.skills,
      charSkills: state => state.character.skills,
      charBonusSkills: state => state.character.bonusSkills,
    }),
  },
};
</script>

<style lang="scss" scoped>

  @import '../common/settings';

</style>
