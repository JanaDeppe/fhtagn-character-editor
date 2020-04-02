<template lang="pug">
div.grid-x.grid-margin-x.max-width-100(
  :class="{'is-nonexisting-specialisation': !skillId && currentSkill.hasSpecialisation}"
)
  //- Optional skill checkbox
  div.cell.shrink(v-if="isOptionalCheckbox")
    input(
      type="checkbox"
      v-model="selected"
      @change="selectOptionalSkill"
    )

  //- Skill name
  span.cell.shrink.skill-name {{skillname || currentSkill.skillname}}
    span(v-if="currentSkill.hasSpecialisation") : {{currentSkill.specialisationName}}
    small(v-if="showBaseValue") &nbsp;(Basiswert: {{currentSkill.baseValue}})

  //- Specialisation editor
  specialisation-editor(
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
  span.padding-horizontal-1(v-else) ({{currentSkill.professionalValue || currentSkill.baseValue}}%)

  //- Bonus Draggable
  bonusSkillDraggable(
    v-if="showDraggable"
    v-model="currentBonusCount"
    class="cell small-3")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import BonusSkillDraggable from '@/components/BonusSkillDraggable.vue';
import CalculatedSkillValue from '@/components/CalculatedSkillValue.vue';
import SpecialisationEditor from '@/components/SpecialisationEditor.vue';

export default {
  components: {
    BonusSkillDraggable,
    CalculatedSkillValue,
    SpecialisationEditor,
  },
  props: {
    skillname: {
      type: String,
      default: '',
    },
    skillId: {
      type: String,
      default: '',
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
    showDraggable: {
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
    ...mapGetters({
      skillByName: get.SKILL_BY_NAME,
      skillById: get.SKILL_BY_ID,
    }),
    currentSkill() {
      return this.skillId
        ? this.skillById(this.skillId)
        : this.skillByName(this.skillname);
    },
    currentBonusCount: {
      get() {
        return new Array(this.currentSkill.bonusCount);
      },
      set(newValue) {
        if (newValue === 'add') {
          this.dispatchAddBonusSkill({ skillname: this.skillname, skillId: this.skillId });
        }
        if (newValue === 'remove') {
          this.dispatchRemoveBonusSkill({ skillId: this.skillId });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      toggleOptionalSkill: act.TOGGLE_OPTIONAL_SKILL,
      dispatchAddSpecialisation: act.ADD_SPECIALISATION,
      dispatchModifySpecialisation: act.MODIFY_SPECIALISATION,
      dispatchRemoveSpecialisation: act.REMOVE_SPECIALISATION,
      dispatchAddBonusSkill: act.ADD_BONUS_SKILL,
      dispatchRemoveBonusSkill: act.REMOVE_BONUS_SKILL,
    }),
    selectOptionalSkill() {
      this.toggleOptionalSkill({
        skillname: this.skillname,
        skillId: this.skillId,
      }).then(() => {
        this.$emit('optional-skill-toggled');
      });
    },
    addSpecialisation() {
      this.dispatchAddSpecialisation({
        skillname: this.currentSkill.skillname,
        isOptional: this.currentSkill.isOptional,
      });
    },
    modifySpecialisation(specialisation) {
      this.dispatchModifySpecialisation({
        skillId: this.skillId,
        specialisation,
      });
    },
    removeSpecialisation() {
      this.dispatchRemoveSpecialisation({
        skillId: this.skillId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";

.is-nonexisting-specialisation {

  .skill-name {
    opacity: .5;
  }

  .add-specialisation {
    opacity: 1;
  }
}

</style>
