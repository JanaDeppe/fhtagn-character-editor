<template lang="pug">
.grid-x.grid-margin-x
  .cell.small-12
    h2.text-center Bonusfertigkeiten
  p.cell Zieh alle Boni zu den gewünschten Fertigkeiten!
  draggable.bonus-list.cell(group="skillModifications")
    .bonus-badge.label(v-for="i in availableSkills") +20% Bonus
  ul.skill-list.cell
    li.skill-list__item(
      v-for="skill in skills"
      class="grid-x"
      :key="skill.skillname")
      //- :class="{'is-mythos': !Number.isInteger(skill.value)}")
      skill(
        class="cell auto"
        :skillname="skill.skillname"
        :skillId="skill.skillId"
        :showBaseValue="true"
        :showCalculatedValue="true"
        @optional-skill-toggled="checkForError")
      draggable.skill-list__bonus-slot(
        class="cell small-6"
        group="skillModifications"
        @add="onAdd(skill.skillname, skill.skillId, $event)"
        @remove="onRemove(skill.skillname, skill.skillId, $event)"
        :name="skill.skillname"
        )

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import Draggable from 'vuedraggable';
import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    Draggable,
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
    }),
  },
  created() {
    // this.checkForError(this.currentSkills.length);
  },
  methods: {
    ...mapActions({
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
      addBonusSkill: act.ADD_BONUS_SKILL,
      removeBonusSkill: act.REMOVE_BONUS_SKILL,
    }),
    onAdd(skillname, skillId) {
      this.currentSkills.push(skillname);
      this.addBonusSkill({ skillname, skillId });
    },
    onRemove(skillname, skillId) {
      this.currentSkills.splice(this.currentSkills.indexOf(skillname), 1);
      this.removeBonusSkill({ skillId });
    },
    checkForError(selectedSkillsAmount) {
      if (selectedSkillsAmount < this.availableSkills) {
        this.addWarning('bonusSkillsRemaining');
      } else {
        this.removeWarning('bonusSkillsRemaining');
      }
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
  }

  .skill-list {
      list-style: none;
      padding: 0;

      @include breakpoint(xlarge) {
          column-count: 2;
      }

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

      &__bonus-slot {
          min-height: 1rem;
          background: $light-gray;
          flex-basis: $badge-width;
          border-radius: $global-radius;
      }

      &__value {
        flex-basis: 10rem;
        text-align: right;
      }
  }
</style>
