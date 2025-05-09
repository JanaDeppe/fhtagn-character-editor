<template lang="pug">
div.flex.items-start(
  :class="{'is-nonexisting-specialisation': !skillId && currentSkill.hasSpecialisation}"
)
  //- Optional skill checkbox
  div.pr-2(v-if="isOptionalCheckbox")
    input(
      type="checkbox"
      v-model="selected"
      @change="selectOptionalSkill"
    )

  //- Skill name
  span.skill-name.pr-2
    span {{ $t(`rulesystem.skills.${skillname || currentSkill.skillname}`) }}
    span(v-if="currentSkill.hasSpecialisation") : {{currentSkill.specialisationName}}
    small.block.leading-3(v-if="showBaseValue") &nbsp;({{ $t("components.skills.baseValue") }}: {{currentSkill.baseValue}})

  //- Specialisation editor
  specialisation-editor.pr-1.add-specialisation(
    v-if="currentSkill.hasSpecialisation && enableSpecialisationEditing"
    :skillname="currentSkill.skillname"
    :specialisation="currentSkill.specialisationName"
    :can-add-specialisations="canAddSpecialisations"
    :can-modify-specialisations="!!(skillId)"
    :can-remove-specialisations="canRemoveSpecialisations && !!(skillId)"
    @modify-specialisation="modifySpecialisation"
    @add-specialisation="addSpecialisation"
    @remove-specialisation="removeSpecialisation"
  )

  //- Calculated skill value
  calculated-skill-value(
    v-if="showCalculatedValue"
    :skillId="skillId"
    :skill="currentSkill")
  span(v-else) ({{currentSkill.professionalValue || currentSkill.baseValue}}%)

  //- Bonus Spinner
  bonusSkillSpinner.grow(
    v-if="showBonusSpinner"
    v-model:bonusCount="currentBonusCount")

</template>

<script>
import { mapStores } from "pinia";
import { useSkillsStore } from "../stores/skills";
import { useRulesystemStore } from "../stores/rulesystem";

import BonusSkillSpinner from "@/components/BonusSkillSpinner.vue";
import CalculatedSkillValue from "@/components/CalculatedSkillValue.vue";
import SpecialisationEditor from "@/components/SpecialisationEditor.vue";

export default {
  components: {
    BonusSkillSpinner,
    CalculatedSkillValue,
    SpecialisationEditor,
  },
  props: {
    skillname: {
      type: String,
      default: "",
    },
    skillId: {
      type: String,
      default: "",
    },
    isOptionalCheckbox: {
      type: Boolean,
      default: false,
    },
    enableSpecialisationEditing: {
      type: Boolean,
      default: true,
    },
    showCalculatedValue: {
      type: Boolean,
      default: false,
    },
    showBaseValue: {
      type: Boolean,
      default: false,
    },
    showBonusSpinner: {
      type: Boolean,
      default: false,
    },
    canRemoveSpecialisations: {
      type: Boolean,
      default: true,
    },
    canAddSpecialisations: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    ...mapStores(useSkillsStore, useRulesystemStore),
    currentSkill() {
      return this.skillId
        ? this.skillsStore.skillById(this.skillId)
        : this.rulesystemStore.skillByName(this.skillname);
    },
    currentBonusCount: {
      get() {
        return this.currentSkill.bonusCount;
      },
      set(newValue) {
        if (newValue === "add") {
          this.skillsStore
            .addBonusSkill(
              this.skillname,
              this.skillId,
              this.currentSkill.specialisationName
            )
            .then(() => {
              this.$emit("bonus-skill-changed");
            });
        }
        if (newValue === "remove") {
          this.skillsStore.removeBonusSkill(this.skillId).then(() => {
            this.$emit("bonus-skill-changed");
          });
        }
      },
    },
  },
  methods: {
    selectOptionalSkill() {
      this.skillsStore.toggleOptionalSkill(this.skillId).then(() => {
        this.$emit("optional-skill-toggled");
      });
    },
    addSpecialisation() {
      this.skillsStore.addSpecialisation(
        this.currentSkill.skillname,
        this.currentSkill.isOptional
      );
    },
    modifySpecialisation(specialisation) {
      this.skillsStore.modifySpecialisation(this.skillId, specialisation);
    },
    removeSpecialisation() {
      this.skillsStore.removeSpecialisation(this.skillId);
    },
  },
};
</script>

<style scoped>
.is-nonexisting-specialisation .skill-name {
  opacity: 0.5;
}

.is-nonexisting-specialisation .add-specialisation {
  opacity: 1;
}
</style>
