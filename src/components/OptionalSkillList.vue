<template lang="pug">
div
  .row
    .col-12: h5 Optionale Fertigkeiten:
    .col: p Wähle zusätzlich {{rulesystemStore.availableOptionalSkillCount(professionId)}} aus folgenden Fertigkeiten.
    .col.text-right: p Restliche, optionale Fertigkeiten: {{ remainingOptionalSkillCount }}
  .h5(v-if="error")
    .d-block.badge.badge-warning {{errorTypes[error]}}
  ul.skill-list.list-unstyled
    li.no-break(
      v-for="skill in skillsStore.optionalSkills"
      :key="skill.skillId")
      combined-skill(
        v-if="skill.conjunctionId && skill.conjunctionId !== 'duplicate'"
        :conjunctionId="skill.conjunctionId"
        modType="optional"
      )
      single-skill.pl-2(
        v-else-if="!skill.conjunctionId"
        :skillId="skill.skillId"
        :isOptionalCheckbox="true"
        @optional-skill-toggled="checkForError")

</template>

<script>
import { mapStores } from "pinia";
import { useRulesystemStore } from "../stores/rulesystem";
import { useSkillsStore } from "../stores/skills";
import { useCommonStore } from "../stores/common";

import SingleSkill from "@/components/SingleSkill.vue";
import CombinedSkill from "@/components/CombinedSkill.vue";

export default {
  components: {
    SingleSkill,
    CombinedSkill,
  },
  props: {
    professionId: {
      type: Number,
      default: -1,
    },
  },
  model: {
    event: "skills-updated",
  },
  data() {
    return {
      error: false,
      errorTypes: {
        tooHigh:
          "Du hast mehr optionale Fertigkeiten ausgewählt als dieser Beruf zur Verfügung hat.",
      },
    };
  },
  computed: {
    ...mapStores(useCommonStore, useRulesystemStore, useSkillsStore),
    remainingOptionalSkillCount() {
      return (
        this.rulesystemStore.availableOptionalSkillCount(this.professionId) -
        this.skillsStore.optionalSkillCount
      );
    },
  },
  created() {
    this.checkForError();
  },
  methods: {
    checkForError() {
      if (this.remainingOptionalSkillCount < 0) {
        this.commonStore.removeWarning("optionalSkillsRemaining");
        this.error = "tooHigh";
      } else if (this.remainingOptionalSkillCount > 0) {
        this.commonStore.addWarning("optionalSkillsRemaining");
      } else {
        this.commonStore.removeWarning("optionalSkillsRemaining");
        this.error = false;
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1024px) {
  .skill-list {
    column-count: 2;
  }
}

@media screen and (min-width: 1440px) {
  .skill-list {
    column-count: 3;
  }
}

.no-break {
  break-inside: avoid;
}
</style>
