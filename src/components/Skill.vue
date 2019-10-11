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
  span.cell.shrink {{skill}}
    span(v-if="currentSkill.hasSpecialisation") : {{currentSkill.name}}
    small(v-if="showBaseValue") &nbsp;(Basiswert: {{currentSkill.baseValue}})

  //- Specialisation editor
  specialisation-editor(
    v-if="currentSkill.hasSpecialisation && enableSpecialisationEditing"
    :skill="skill"
    :specialisation="currentSkill.name"
    :can-add-specialisations="canAddSpecialisations"
    :can-remove-specialisation="canRemoveSpecialisation ? index > 0 : false"
    @modify-specialisation="modifySpecialisation"
    @add-specialisation="addSpecialisation"
    @remove-specialisation="removeSpecialisation"
  )

  //- Calculated skill value
  calculated-skill-value(
    v-if="showCalculatedValue"
    :skillName="skill"
    :index="index"
    :skill="currentSkill")
  span.padding-horizontal-1(v-else) ({{currentSkill.value || currentSkill.baseValue}}%)
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
    skill: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
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
    canRemoveSpecialisation: {
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
    }),
    currentSkill() {
      return this.skillByName(this.skill, this.index);
    },
  },
  methods: {
    ...mapActions({
      toggleSkill: act.TOGGLE_SKILL,
      newSpecialisation: act.NEW_SPECIALISATION,
      changeSpecialisation: act.CHANGE_SPECIALISATION,
      removeSpecialisation: act.REMOVE_SPECIALISATION,
    }),
    selectOptionalSkill(e) {
      this.toggleSkill({
        skill: this.skill,
        index: this.index,
        type: 'optional',
        value: e.currentTarget.value,
      });
      this.$emit('optional-skill-toggled');
    },
    addSpecialisation() {
      const newSpecialisation = {
        skill: this.skill,
      };
      if (this.isOptionalCheckbox) newSpecialisation.isOptional = true;
      this.newSpecialisation(newSpecialisation);
    },
    modifySpecialisation(specialisation) {
      this.changeSpecialisation({
        skill: this.skill,
        specialisation,
        index: this.index,
      });
    },
    removeSpecialisation() {
      this.removeSpecialisation({
        skill: this.skill,
        index: this.index,
      });
    },
  },
};
</script>
