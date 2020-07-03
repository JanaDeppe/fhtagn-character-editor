<template lang="pug">
.grid-x
  .cell
    h2.text-center Beruf wählen
    ul.profession-list.list-unstyled
      li.profession-list__profession(
        :class="{'is-active': selectedProfession == index}"
        v-for="(profession, index) in professions"
        @click="setProfession(index)"
      ) {{profession.name}}

    .p-3(v-if="selectedProfession > -1")
      h3 {{currProf.name}}
        small  (
          span(v-for="(attr, index) in currProf.recommendedAttributes")
            span(v-if="index != 0") ,&nbsp;
            | {{attr}}
          | )
      ul.variant-list.list-unstyled
        li.form-check.mb-2(v-for="variant in currProf.variants")
          input.form-check-input(type="radio" :id="variant" v-model="selectedVariant" :value="variant" @change="updateVariant")
          label.form-check-label(:for="variant") {{variant}}
        li.form-check.mb-2
          input.form-check-input(type="radio" v-model="selectedVariant" value="custom" @change="updateVariant")
          label.form-check-label
            input(type="text" v-model="customVariant" placeholder="Eigene Ausprägung" @input="updateVariant")
      blockquote.blockquote.alert.alert-light.border-left {{currProf.background}}
      div.mt-5(v-if="!isProfessionLoading")
        h5 Berufsfertigkeiten:
        ul.skill-list.list-unstyled.mb-5
          li.skill-list__item(v-for="skill in professionalSkills")
            combined-skill.no-break(
              v-if="skill.conjunctionId && skill.conjunctionId !== 'duplicate'"
              :conjunctionId="skill.conjunctionId"
              modType="professional"
            )
            skill.no-break.pl-2(
              v-else-if="!skill.conjunctionId"
              :skillId="skill.skillId"
              :canAddSpecialisations="false"
              :canRemoveSpecialisations="false")
        optional-skill-list(
          f-if="currProf"
          :professionId="selectedProfession"
        )
        h5 Verbindungen: {{currProf.connections}}
  modal(
    :isVisible="isErrorOpen"
    @modal-closed="isErrorOpen = false")
    h3(slot="header") Fehlende Auswahl
    p Bitte wähle einen Beruf, bevor du weitermachst!

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { act, get } from '@/store/type';

import OptionalSkillList from '@/components/OptionalSkillList.vue';
import Skill from '@/components/Skill.vue';
import CombinedSkill from '@/components/CombinedSkill.vue';
import Modal from '@/components/Modal.vue';

export default {
  props: {},
  components: {
    OptionalSkillList,
    Skill,
    CombinedSkill,
    Modal,
  },
  data() {
    return {
      selectedProfession: -1,
      selectedVariant: '',
      customVariant: '',
      isErrorOpen: false,
      conjunctions: [],
    };
  },
  computed: {
    ...mapGetters({
      professionalSkills: get.PROFESSIONAL_SKILLS,
      editorSteps: get.EDITOR_STEPS,
      professions: get.PROFESSIONS_LIST,
      isProfessionLoading: get.IS_PROFESSION_LOADING,
    }),
    currProf() {
      return this.professions[this.selectedProfession];
    },
    currentVariant() {
      if (this.selectedVariant === 'custom') {
        return this.customVariant;
      }
      return this.selectedVariant;
    },
  },
  created() {
    this.checkForError(this.currentVariant);
  },
  beforeRouteLeave(to, from, next) {
    const currentRouteIndex = this.editorSteps.findIndex(record => from.name === record.name);
    const nextRouteIndex = this.editorSteps.findIndex(record => to.name === record.name);
    if (currentRouteIndex < nextRouteIndex) {
      if (this.selectedProfession === -1) {
        next(false);
        this.isErrorOpen = true;
      } else {
        next();
      }
    } else {
      next();
    }
  },
  methods: {
    ...mapActions({
      dispatchSetProfession: act.SET_PROFESSION,
      updateProfessionVariant: act.UPDATE_PROFESSION_VARIANT,
      modifySpecialisation: act.MODIFY_SPECIALISATION,
      addWarning: act.ADD_WARNING,
      removeWarning: act.REMOVE_WARNING,
    }),
    setProfession(index) {
      this.selectedProfession = index;
      this.dispatchSetProfession(this.selectedProfession);
    },
    updateVariant() {
      this.checkForError(this.currentVariant);
      this.updateProfessionVariant(this.currentVariant);
    },
    modifySpecialisation(data) {
      this.changeSpecialisation({
        skill: data.skill,
        index: this.index,
        specialisation: data.name,
        isProfessional: true,
      });
    },
    checkForError(variant) {
      if (!variant) {
        this.addWarning('missingVariant');
      } else {
        this.removeWarning('missingVariant');
      }

      if (variant === 'custom' && !this.customVariant) {
        this.addWarning('missingCustomVariant');
      } else {
        this.removeWarning('missingCustomVariant');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/settings";
.profession-list {
  height: 21vh;
  overflow-x: scroll;
  border: $hr-border-width solid $hr-border-color;
  margin: 0 0 $grid-gutter-width;

  &__profession {
    padding: $grid-gutter-width/2;
    cursor: pointer;

    @include media-breakpoint-up(md) {
      padding: $grid-gutter-width/4;
    }

    &:hover {
      background: theme-color("light");
    }

    &.is-active {
      background: transparentize(theme-color("light"), .5);
    }
  }
}

.variant-list,
.skill-list {
  @include media-breakpoint-up(lg) {
    column-count: 2;
  }
  @include media-breakpoint-up(xl) {
    colummn-count: 3;
  }
}

.no-break {
  break-inside: avoid;
}

</style>
