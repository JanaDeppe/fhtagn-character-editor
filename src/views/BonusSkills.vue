<template lang="pug">
.grid-x
  .cell.small-12
    h2.text-center Bonusfertigkeiten
  p.cell Zieh alle Boni zu den gewünschten Fertigkeiten!
  draggable.bonus-list.cell(
    group="bonusSkills"
    @add="onReturnSkill"
    @remove="onUseSkill")
    .bonus-badge.label(v-for="i in availableSkills") +20% Bonus
  ul.skill-list.cell
    li.skill-list__item(
      v-for="skill in skills"
      class="grid-x padding-bottom-1"
      :key="skill.skillId || skill.skillname")
      skill(
        class="cell auto"
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

  @import '../common/settings';

  $badge-width: 95px;

  .bonus-list,
  .skill-list {
      margin-bottom: $paragraph-margin-bottom;
  }

  .bonus-list {
      padding: .2rem 0 0 .2rem;
      background: $light-gray;
      min-height: 2rem;

      .bonus-badge {
          margin-right: .2rem;
          margin-bottom: .2rem;
      }
  }

  .bonus-badge {
      width: $badge-width;
      text-align: center;
      line-height: 1.2;

      &[draggable="false"] {
        display: none;
      }
  }

  .skill-list {
      list-style: none;
      padding: 0;
      margin: 0;

      // @include breakpoint(xlarge) {
      //     column-count: 2;
      // }

      &__item {
          display: flex;
          align-items: stretch;
          margin: 0 0 .2rem;

          &.is-mythos {
            .skill-list__bonus-slot {
              display: none;
            }
            .skill-list__value {
              flex-basis: 10rem;
            }
          }
      }

      &__label {
          flex-grow: 1;
      }


      &__value {
        flex-basis: 10rem;
        text-align: right;
      }
  }
</style>
