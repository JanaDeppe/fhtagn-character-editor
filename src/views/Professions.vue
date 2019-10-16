<template lang="pug">
.grid-x
  .cell
    h2.text-center Profession Selector
    ul.profession-list
      li.profession-list__profession(
        :class="{'is-active': selectedProfession == index}"
        v-for="(profession, index) in professions"
        @click="setProfession(index)"
      ) {{profession.name}}

    .callout(v-if="selectedProfession > -1")
      h3 {{currProf.name}}
        small  (
          span(v-for="(attr, index) in currProf.recommendedAttributes")
            span(v-if="index != 0") ,&nbsp;
            | {{attr}}
          | )
      ul.variant-list
        li.grid-x.grid-padding-x(v-for="variant in currProf.variants")
          .cell.shrink
            input(type="radio" id="variant" v-model="selectedVariant" :value="variant" @change="updateVariant")
          .cell.auto {{variant}}
        li.grid-x.grid-padding-x
            .cell.shrink
              input(type="radio" v-model="selectedVariant" value="custom" @change="updateVariant")
            .cell.auto
              input(type="text" v-model="customVariant" placeholder="Eigene Ausprägung" @input="updateVariant")
      blockquote {{currProf.background}}
      h5 Berufsfertigkeiten:
      ul.skill-list
        li.skill-list__item(v-for="skill in getProfessionalSkills")
          skill(
            :skill="skill.skill"
            :index="skill.index"
            :canAddSpecialisations="false")
      optional-skill-list(
        f-if="currProf"
        :optionalSkills="currProf.skills.optional"
        :availableSkills="currProf.skills.optionalAmount"
        :professionId="selectedProfession"
        v-model="optionalSkills"
        @specialisation-updated="updateSpecialisation('optional', $event)"
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
import Modal from '@/components/Modal.vue';

export default {
  props: {},
  components: {
    OptionalSkillList,
    Skill,
    Modal,
  },
  data() {
    return {
      selectedProfession: -1,
      optionalSkills: [],
      selectedVariant: '',
      customVariant: '',
      isErrorOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      getProfessionalSkills: get.PROFESSIONAL_SKILLS,
      editorSteps: get.EDITOR_STEPS,
      professions: get.PROFESSIONS_LIST,
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
      changeSpecialisation: act.CHANGE_SPECIALISATION,
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
    updateSpecialisation(data) {
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

.profession-list,
.variant-list,
.skill-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.profession-list {
  height: 30vh;
  overflow-x: scroll;
  border: $hr-border;
  margin: 0 0 map_get($grid-column-gutter, small);

  &__profession {
    padding: map_get($grid-column-gutter, small)/2;
    cursor: pointer;

    @include breakpoint(medium) {
      padding: map_get($grid-column-gutter, medium)/4;
    }

    &:hover {
      background: $light-gray;
    }

    &.is-active {
      background: $primary-transparent;
    }
  }
}

.variant-list,
.skill-list {
  margin: 0 0 $paragraph-margin-bottom;
  line-height: 37px;

  @include breakpoint(large) {
    column-count: 2;
  }
  @include breakpoint(xlarge) {
    colummn-count: 3;
  }
}

</style>
