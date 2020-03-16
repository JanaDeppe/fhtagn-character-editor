<template lang="pug">
div.grid-x.grid-padding-x
  //- Optional skill checkbox
  div.cell.shrink(v-if="isOptionalCheckbox")
    input(
      type="checkbox"
      v-model="selected"
      @change="selectOptionalSkill"
    )

  //- Skill name
  span.cell.shrink {{skillname || currentSkill.skillname}}
    span(v-if="currentSkill.hasSpecialisation") : {{currentSkill.specialisation}}
    small(v-if="showBaseValue") &nbsp;(Basiswert: {{currentSkill.baseValue}})

  //- Specialisation editor
  specialisation-editor(
    v-if="currentSkill.hasSpecialisation && enableSpecialisationEditing"
    :skillname="skillname"
    :specialisation="currentSkill.specialisation"
    :can-add-specialisations="canAddSpecialisations"
    :can-remove-specialisations="canRemoveSpecialisations"
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import CalculatedSkillValue from '@/components/CalculatedSkillValue.vue';
import SpecialisationEditor from '@/components/SpecialisationEditor.vue';

export default {
  components: {
    SpecialisationEditor,
    CalculatedSkillValue,
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
  },
  methods: {
    ...mapActions({
      toggleOptionalSkill: act.TOGGLE_OPTIONAL_SKILL,
      dispatchAddSpecialisation: act.ADD_SPECIALISATION,
      dispatchModifySpecialisation: act.MODIFY_SPECIALISATION,
      dispatchRemoveSpecialisation: act.REMOVE_SPECIALISATION,
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
      this.dispatchAddSpecialisation(this.skillname);
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
