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

  //- Bonus Draggable
  bonusSkillSpinner.col-auto(
    v-if="showDraggable"
    v-model="currentBonusCount"
    :bonusCount="currentSkill.bonusCount")

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { get, act } from '@/store/type';

import BonusSkillSpinner from '@/components/BonusSkillSpinner.vue';
import CalculatedSkillValue from '@/components/CalculatedSkillValue.vue';
import SpecialisationEditor from '@/components/SpecialisationEditor.vue';

export default {
  components: {
    BonusSkillSpinner,
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
          this
            .dispatchAddBonusSkill(
              {
                skillname: this.skillname,
                skillId: this.skillId,
              },
            )
            .then(() => {
              this.$emit('bonus-skill-changed');
            });
        }
        if (newValue === 'remove') {
          this
            .dispatchRemoveBonusSkill({ skillId: this.skillId })
            .then(() => { this.$emit('bonus-skill-changed'); });
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

.skill {
  line-height: 29px;
}

.is-nonexisting-specialisation {

  .skill-name {
    opacity: .5;
  }

  .add-specialisation {
    opacity: 1;
  }
}

.small-line-height {
  line-height: 1;
}

</style>
