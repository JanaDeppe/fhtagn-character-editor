<template lang="pug">
div.skill.row.no-gutters.align-items-center(
  :class="{'is-nonexisting-specialisation': !skillId && currentSkill.hasSpecialisation}"
)
  //- Optional skill checkbox
  div.col-auto.pr-2(v-if="isOptionalCheckbox")
    input(
      type="checkbox"
      v-model="selected"
      @change="selectOptionalSkill"
    )

  //- Skill name
  span.col-auto.pr-2.skill-name
    span {{skillname || currentSkill.skillname}}
    span(v-if="currentSkill.hasSpecialisation") : {{currentSkill.specialisationName}}
    small.d-block.small-line-height(v-if="showBaseValue") &nbsp;(Basiswert: {{currentSkill.baseValue}})

  //- Specialisation editor
  specialisation-editor.col-auto.pr-1(
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
  calculated-skill-value.col(
    v-if="showCalculatedValue"
    :skillId="skillId"
    :skill="currentSkill")
  span(v-else) ({{currentSkill.professionalValue || currentSkill.baseValue}}%)

  //- Bonus Spinner
  bonusSkillSpinner.col-auto(
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
.skill {
  line-height: 29px;
}

.is-nonexisting-specialisation .skill-name {
  opacity: 0.5;
}

.is-nonexisting-specialisation .add-specialisation {
  opacity: 1;
}

.small-line-height {
  line-height: 1;
}
</style>
