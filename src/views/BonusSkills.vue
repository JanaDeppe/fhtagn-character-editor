<template lang="pug">
.row
  .col-12
    h2.text-center Bonusfertigkeiten
  p.col-12 Zieh alle Boni zu den gewünschten Fertigkeiten!
  .col-12.mb-3
    draggable.bonus-list.p-1(
      group="bonusSkills"
      @add="onReturnSkill"
      @remove="onUseSkill")
      .bonus-badge.badge.badge-success.mr-2.mb-1.text-center(v-for="i in availableSkills") +20% Bonus
  .col-12
    ul.skill-list
      li.skill-list__item.pb-2(
        v-for="skill in skills"
        :key="skill.skillId || skill.skillname")
        skill(
          :skillname="skill.skillname"
          :skillId="skill.skillId"
          :showBaseValue="true"
          :showCalculatedValue="true"
          :showDraggable="true"
          @optional-skill-toggled="checkForError")


</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import Skill from '@/components/Skill.vue';
import Draggable from 'vuedraggable';

export default {
  props: {},
  components: {
    Draggable,
    Skill,
  },
  data() {
    return {
      availableSkills: new Array(8),
      usedSkills: 0,
      currentSkills: [],
    };
  },
  computed: {
    ...mapGetters({
      skills: get.SKILL_MAP,
    }),
  },
  created() {
    // this.checkForError(this.currentSkills.length);
  },
  methods: {
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),

    checkForError(selectedSkillsAmount) {
      if (selectedSkillsAmount < this.availableSkills) {
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
  }
}
</style>
