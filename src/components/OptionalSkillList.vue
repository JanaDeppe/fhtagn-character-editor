<template lang="pug">
div
  .grid-x
    .cell.auto: p Wähle zusätzlich {{getAvailableOptionalSkillCount(professionId)}} aus folgenden Fertigkeiten:
    .cell.auto.text-right: p Restliche, optionale Skills: {{ remainingOptionalSkillCount }}
  div(v-if="error")
    .label.warning {{errorTypes[error]}}
  ul.skill-list
    li(
      v-for="(skill, index) in optionalSkills"
      :key="skill.skill+skill.index")
      skill(
        :skill="skill.skill"
        :index="skill.index"
        :isOptionalCheckbox="true"
        @optional-skill-toggled="checkForError")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import Skill from '@/components/Skill.vue';

export default {
  components: {
    Skill,
  },
  props: {
    professionId: {
      type: Number,
      default: -1,
    },
  },
  model: {
    event: 'skills-updated',
  },
  data() {
    return {
      error: false,
      errorTypes: {
        tooHigh: 'Du hast mehr optionale Fertigkeiten ausgewählt als dieser Beruf zur Verfügung hat.',
      },
    };
  },
  computed: {
    ...mapGetters({
      // TODO: rewrite to use get.PROFESSIONAL_SKILLS_BY_ID
      optionalSkills: get.OPTIONAL_SKILLS,
      optionalSkillCount: get.OPTIONAL_SKILL_COUNT,
      getAvailableOptionalSkillCount: get.AVAILABLE_OPTIONAL_SKILL_COUNT,
    }),
    remainingOptionalSkillCount() { return this.getAvailableOptionalSkillCount(this.professionId) - this.optionalSkillCount; },
  },
  created() {
    this.checkForError();
  },
  methods: {
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    checkForError() {
      const currentSkillCount = this.optionalSkillCount;
      const availableSkills = this.getAvailableOptionalSkillCount(this.professionId);
      if (currentSkillCount > availableSkills) {
        this.removeWarning('optionalSkillsRemaining');
        this.error = 'tooHigh';
      } else if (currentSkillCount < availableSkills) {
        this.addWarning('optionalSkillsRemaining');
      } else {
        this.removeWarning('optionalSkillsRemaining');
        this.error = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";

.skill-list {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: 0 0 $paragraph-margin-bottom;
  line-height: 37px;

  @include breakpoint(large) {
    column-count: 2;
  }
  @include breakpoint(xlarge) {
    colummn-count: 3;
  }
}
</style>
