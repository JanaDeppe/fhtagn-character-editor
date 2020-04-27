<template lang="pug">
.row
  .col-12
    h2.text-center Bonusfertigkeiten
    p Restliche Bonus-Fertigkeiten: {{ remainingBonusSkillCount }}
  .col-12
    ul.skill-list.cell
      li.skill-list__item.pb-2(
        v-for="skill in skills"
        :key="skill.skillId || skill.skillname")
        skill(
          class="cell auto"
          :skillname="skill.skillname"
          :skillId="skill.skillId"
          :showBaseValue="true"
          :showCalculatedValue="true"
          :showDraggable="true"
          @bonus-skill-changed="checkForError")


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    Skill,
  },
  data() {
    return {
      availableSkills: 8,
      currentSkills: [],
    };
  },
  computed: {
    ...mapGetters({
      skills: get.SKILL_MAP,
      bonusSkillCount: get.BONUS_SKILL_COUNT,
    }),
    remainingBonusSkillCount() { return this.availableSkills - this.bonusSkillCount; },
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
      if (this.remainingBonusSkillCount > 0) {
        this.addWarning('bonusSkillsRemaining');
      } else {
        this.removeWarning('bonusSkillsRemaining');
      }
    },
    getKey(skillname) {
      const key = `${skillname}-${Math.floor(Math.random() * 50000)}`;
      return key;
    },
    onUseSkill() { this.usedSkills += 1; },
    onReturnSkill() {
      this.availableSkills.push(undefined);
      this.usedSkills -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";

$badge-width: 100px;

.bonus-list {
  background: $gray-200;
  min-height: 2rem;
}

.bonus-badge {
  width: $badge-width;

  &[draggable="false"] {
    display: none;
  }
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;

  @include media-breakpoint-up(large) {
    column-count: 2;
    column-gap: 1rem;
  }
}
</style>
