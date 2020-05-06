<template lang="pug">
div
  .row
    .col-12: h5 Optionale Fertigkeiten:
    .col: p Wähle zusätzlich {{getAvailableOptionalSkillCount(professionId)}} aus folgenden Fertigkeiten.
    .col.text-right: p Restliche, optionale Fertigkeiten: {{ remainingOptionalSkillCount }}
  .h5(v-if="error")
    .d-block.badge.badge-warning {{errorTypes[error]}}
  ul.skill-list.list-unstyled
    li(
      v-for="skill in optionalSkills"
      :key="skill.skillId")
      combined-skill(
        v-if="skill.conjunctionId && skill.conjunctionId !== 'duplicate'"
        :conjunctionId="skill.conjunctionId"
        modType="optional"
      )
      skill.pl-2(
        v-else-if="!skill.conjunctionId"
        :skillId="skill.skillId"
        :isOptionalCheckbox="true"
        @optional-skill-toggled="checkForError")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import Skill from '@/components/Skill.vue';
import CombinedSkill from '@/components/CombinedSkill.vue';


export default {
  components: {
    Skill,
    CombinedSkill,
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
      if (this.remainingOptionalSkillCount < 0) {
        this.removeWarning('optionalSkillsRemaining');
        this.error = 'tooHigh';
      } else if (this.remainingOptionalSkillCount > 0) {
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
  @include media-breakpoint-up(lg) {
    column-count: 2;
  }
  @include media-breakpoint-up(xl) {
    colummn-count: 3;
  }
}
</style>
