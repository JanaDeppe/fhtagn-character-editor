<template lang="pug">
div
  .flex.flex-wrap.mb-2
    .basis-full: h5 {{ $t("views.professions.optionalSkills") }}:
    p.basis-1-2 {{ $t("views.professions.chooseAdditionally", { amount: rulesystemStore.availableOptionalSkillCount(professionId) }) }}
    p.basis-1-2.text-right {{ $t("views.professions.remainingOptionalSkills") }}: {{ remainingOptionalSkillCount }}
  .h5(v-if="error")
    .d-block.badge.badge-warning {{errorTypes[error]}}
  ul.xl_columns-2
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
