<template lang="pug">
div
  p Wähle zusätzlich {{getAvailableOptionalSkillCount(getProfessionId)}} aus folgenden Fertigkeiten:
  div(v-if="error")
    .label.warning {{errorTypes[error]}}
  ul.skill-list
    li(
      v-for="(skill, index) in getOptionalSkills"
      :key="skill.skill+skill.index")
      skill(
        :skill="skill.skill"
        :index="skill.index"
        :isOptionalCheckbox="true"
        @optional-skill-toggled="checkForError")

</template>

<script>
import { mapGetters } from 'vuex';
import {
  ADD_WARNING,
  REMOVE_WARNING,
} from '@/store/mutations.type';

import store from '@/store';
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
    ...mapGetters([
      'getProfessionId',
      'getOptionalSkills',
      'getAvailableOptionalSkillCount',
      'getOptionalSkillCount',
    ]),
  },
  created() {
    this.checkForError();
  },
  methods: {
    checkForError() {
      const currentSkillCount = this.getOptionalSkillCount;
      const availableSkills = this.getAvailableOptionalSkillCount(this.getProfessionId);
      if (currentSkillCount > availableSkills) {
        store.commit(REMOVE_WARNING, 'optionalSkillsRemaining');
        this.error = 'tooHigh';
      } else if (currentSkillCount < availableSkills) {
        store.commit(ADD_WARNING, 'optionalSkillsRemaining');
      } else {
        store.commit(REMOVE_WARNING, 'optionalSkillsRemaining');
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
