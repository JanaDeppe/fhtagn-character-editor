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
        :optionalSkills="currProf.skills.optional"
        :availableSkills="currProf.skills.optionalAmount"
        :professionId="selectedProfession"
        v-model="optionalSkills"
        @skills-updated="updateSkills"
        @specialisation-updated="updateSpecialisation('optional', $event)"
        )
      h5 Verbindungen: {{currProf.connections}}

</template>

<script>
import { mapGetters, mapState } from 'vuex';
import {
  SET_PROFESSION_VARIANT,
  ADD_WARNING,
  REMOVE_WARNING,
} from '@/store/mutations.type';

import {
  SET_PROFESSION,
  CHANGE_SPECIALISATION,
} from '@/store/actions.type';

import store from '@/store';

import OptionalSkillList from '@/components/OptionalSkillList.vue';
import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    OptionalSkillList,
    Skill,
  },
  data() {
    return {
      selectedProfession: -1,
      optionalSkills: [],
      selectedVariant: '',
      customVariant: '',
    };
  },
  computed: {
    ...mapGetters([
      'getProfessionalSkills',
    ]),
    ...mapState({
      professions: state => state.rulesystem.professions,
      skills: state => state.rulesystem.skills,
      characterAttributes: state => state.character.attributeValues,
      professionalSpecialisations: state => state.character.skills.professionalSpecialisations,
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
  activated() {
    this.recommendProfessions();
  },
  methods: {
    recommendProfessions() {

    },
    setProfession(index) {
      this.selectedProfession = index;
      store.dispatch(SET_PROFESSION, this.selectedProfession);
    },
    updateSkills() {
      // store.commit(UPDATE_OPTIONAL_SKILLS, this.optionalSkills);
    },
    updateVariant() {
      this.checkForError(this.currentVariant);
      store.commit(SET_PROFESSION_VARIANT, this.currentVariant);
    },
    updateSpecialisation(data) {
      store.dispatch(CHANGE_SPECIALISATION, {
        skill: data.skill,
        index: this.index,
        specialisation: data.name,
        isProfessional: true,
      });
    },
    checkForError(variant) {
      if (!variant) {
        store.commit(ADD_WARNING, 'missingVariant');
      } else {
        store.commit(REMOVE_WARNING, 'missingVariant');
      }

      if (variant === 'custom' && !this.customVariant) {
        store.commit(ADD_WARNING, 'missingCustomVariant');
      } else {
        store.commit(REMOVE_WARNING, 'missingCustomVariant');
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
