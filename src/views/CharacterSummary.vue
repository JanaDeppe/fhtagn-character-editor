<template lang="pug">
div
  .grid-x.grid-padding-x.grid-padding-y(ref="characterSummaryContainer")
    .cell.small-12
      h4.text-center Zusammenfassung&nbsp;<br>
        span(v-if="charData.personalInformation.Vorname || charData.personalInformation.Nachname")
          | "{{charData.personalInformation.Vorname}} {{charData.personalInformation.Nachname}}"
    .cell.small-12
      .grid-x
        .cell.small-6(v-if="charData.personalInformation.Geschlecht") {{charData.personalInformation.Geschlecht}}
        .cell.small-6(v-if="charData.personalInformation.Alter") {{charData.personalInformation.Alter}}
        .cell.small-12(v-if="charData.personalInformation.Aussehen") {{charData.personalInformation.Aussehen}}

    // Attribute
    .cell.small-12
      h5(v-if="Object.keys(charData.attributeValues).length") Attribute:
      ul.small-list.attribute-list(v-if="charData.attributeValues")
        li(v-for="(value, abbr) in charData.attributeValues").grid-x
          .cell.small-4 {{abbr}}:
          .cell.small-8 {{value}}

    // Beruf
    .cell.small-12
      h5(v-if="charData.profession > -1") Beruf:
        span(v-if="charData.professionVariant") {{charData.professionVariant}} ({{currentProfessionName}})
        span(v-else) {{currentProfessionName}}

    // Skills
    .cell.small-12
      ul.skill-list.small-list(v-if="charData.profession > -1")
        li: h6 Fertigkeiten:
        li(v-for="skill in reducedSkills")
          skill(
            :canAddSpecialisations="false"
            :canRemoveSpecialisation="false"
            :showCalculatedValue="true"
            :skill="skill.skill"
            :index="skill.index")

    // Verbindungen
    .cell.medium-6
      ul.small-list(v-if="charData.connections.length")
        li: h6 Verbindungen:
        li(v-for="conn in charData.connections" v-if="conn.length > 0") {{conn}}
    .cell.medium-6
      // Facetten
      ul.small-list(v-if="charData.facettes.length")
        li: h6 Facetten:
        li(v-for="facette in charData.facettes") {{facette}}
    .cell.medium-6
      // Motivationen
      ul.small-list(v-if="charData.motivations.length")
        li: h6 Motivationen:
        li(v-for="motivation in charData.motivations" v-if="motivation.length > 0") {{motivation}}

  .grid-x
    .cell.small-12.button-group.align-center
      button.button(@click="openCharacterSheet") Charakterbogen erstellen
      router-link.button.hollow(:to="{ name: 'start-generation' }") Zurück zum Anfang

  character-sheet-modal(
    v-if="isCharacterSheetOpen"
    :character-data="aggregatedCharacterData"
    :isVisible="isCharacterSheetOpen"
    @modal-closed="isCharacterSheetOpen = false")

</template>

<script>
import { mapGetters } from 'vuex';
import { get } from '@/store/type';

import CharacterSheetModal from '@/components/CharacterSheetModal.vue';
import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    CharacterSheetModal,
    Skill,
  },
  data() {
    return {
      isCharacterSheetOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      reducedSkills: get.REDUCED_SKILLS,
      derivedValues: get.DERIVED_VALUES,
      charData: get.CHARACTER_DATA,
      attributes: get.ATTRIBUTE_LIST,
      getProfessionNameById: get.PROFESSION_NAME_BY_ID,
    }),
    skillList() {
      return Object.keys(this.skills).sort();
    },
    currentProfessionName() {
      return this.getProfessionNameById(this.charData.profession);
    },
    aggregatedCharacterData() {
      return {
        reducedSkills: this.reducedSkills,
        derivedValues: this.derivedValues,
        characterData: this.charData,
        professionName: this.currentProfessionName,
      };
    },
  },
  methods: {
    openCharacterSheet() {
      this.isCharacterSheetOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../common/settings';

.small-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: .8em;
}

.attribute-list {
  column-count: 2;
}

.skill-list {
  @include breakpoint(medium) {
    column-count: 2;
  }
  li {
    margin-bottom: .1rem;
  }
}

</style>
