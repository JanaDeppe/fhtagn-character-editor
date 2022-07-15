<template lang="pug">
div.pl-2.skill.row.no-gutters.align-items-start.border

  //- Optional skill checkbox
  div.col-auto.pr-2.pt-1(
    v-if="conjunction.type === 'and'"
  )
    input(
      type="checkbox"
      @change="handleAnd"
    )

  //- Skill name
  .col-auto.pr-2
    .d-flex.align-items-center.flex-wrap(v-for="(skillId, index) in conjunction.skillIds")
      .pr-2.flex-shrink-1(
        v-if="conjunction.type === 'or' && modType === 'professional'")
        input(
          @change="handleOrProfessional(index)"
          :value="index"
          v-model="orSelectedProfessional"
          type="radio")

      .pr-2.flex-shrink-1(
        v-if="conjunction.type === 'or' && modType === 'optional'")
        input(
          @change="handleOrOptional(index)"
          :value="index"
          :disabled="isDisabled(index)"
          v-model="orSelectedOptional"
          type="checkbox")

      single-skill(
        :class="{'is-disabled': isDisabled(index)}"
        :skillId="skillId")
      small.conjunction-word(
        v-if="index !== conjunction.skillIds.length -1"
        :class="{'pl-4': conjunction.type === 'or'}") {{ conjunctionWord }}
</template>

<script>
import { mapStores } from "pinia";
import { useSkillsStore } from "../stores/skills";
import SingleSkill from "@/components/SingleSkill.vue";

export default {
  components: {
    SingleSkill,
  },
  props: {
    conjunctionId: {
      type: String,
      default: "",
    },
    modType: {
      type: String,
      default: "optional",
    },
  },
  data() {
    return {
      orSelectedProfessional: -1,
      orSelectedOptional: [],
      dirty: false,
    };
  },
  computed: {
    ...mapStores(useSkillsStore),
    conjunction() {
      return this.skillsStore.conjunctions[this.conjunctionId];
    },
    skills() {
      return this.conjunction.skillIds.map((skillId) =>
        this.skillsStore.skillById(skillId)
      );
    },
    conjunctionWord() {
      return this.conjunction.type === "and" ? "und" : "oder";
    },
  },
  methods: {
    isDisabled(index) {
      return (
        this.orSelectedOptional.indexOf(index) === -1 &&
        this.orSelectedOptional.length !== 0
      );
    },
    handleAnd() {
      this.conjunction.skillIds.forEach((skillId) =>
        this.skillsStore.toggleOptionalSkill({ skillId })
      );
    },
    handleOrOptional(index) {
      this.skillsStore.toggleOptionalSkill({
        skillId: this.conjunction.skillIds[index],
      });
    },
    handleOrProfessional(index) {
      if (this.dirty) {
        this.skillsStore.toggleProfessionalSkill(
          this.conjunction.skillIds[index === 0 ? 1 : 0]
        );
      }
      this.skillsStore.toggleProfessionalSkill(
        this.conjunction.skillIds[index]
      );
      this.dirty = true;
    },
  },
};
</script>

<style scoped>
.conjunction-word {
  text-transform: uppercase;
  width: 100%;
}

.is-disabled {
  opacity: 0.5;
}
</style>
