<template lang="pug">
div
  .row(ref="characterSummaryContainer")
    .col-12.mb-3
      h4.text-center Zusammenfassung&nbsp;<br>
        span(v-if="charData.personalInformation.Vorname || charData.personalInformation.Nachname")
          | "{{charData.personalInformation.Vorname}} {{charData.personalInformation.Nachname}}"
    .col-12.mb-3
      .row
        .col-6(v-if="charData.personalInformation.Alter") Alter: {{charData.personalInformation.Alter}}
        .col-6(v-if="charData.personalInformation.Muttersprache") Muttersprache: {{charData.personalInformation.Muttersprache}}
        .col-12(v-if="charData.personalInformation.Aussehen") Aussehen: {{charData.personalInformation.Aussehen}}
        .col-12(v-if="charData.personalInformation.Ausrüstungsgegenstände")
          | Ausrüstungsgegenstände: {{charData.personalInformation.Ausrüstungsgegenstände}}

    // Attribute
    .col-12.mb-5
      h5(v-if="Object.keys(charData.attributeValues).length") Attribute:
      ul.list-unstyled.attribute-list(v-if="charData.attributeValues")
        li(v-for="(value, abbr) in charData.attributeValues").row
          .col-2 {{abbr}}:
          .col-10 {{value}}

    // Beruf
    .col-12.mb-3
      h5(v-if="charData.profession > -1") Beruf:
        span(v-if="charData.professionVariant") {{charData.professionVariant}} ({{currentProfessionName}})
        span(v-else) {{currentProfessionName}}

    // Skills
    .col-12.mb-5
      h6 Fertigkeiten:
      ul.skill-list.list-unstyled(v-if="charData.profession > -1")
        li.mb-2(v-for="skill in skillMap")
          skill(
            :canAddSpecialisations="false"
            :canRemoveSpecialisations="false"
            :showCalculatedValue="true"
            :skillname="skill.skillname"
            :skillId="skill.skillId")

    // Verbindungen
    .col-12.col-md-6.mb-3(v-if="charData.connections.length")
      ul.list-unstyled
        li: h6 Verbindungen:
        li(v-for="conn in charData.connections" v-if="conn.length > 0") {{conn}}

    // Facetten
    .col-12.col-md-6.mb-3(v-if="charData.facettes.length")
      ul.list-unstyled
        li: h6 Facetten:
        li(v-for="facette in charData.facettes") {{facette}}

    // Motivationen
    .col-12.col-md-6.mb-3(v-if="charData.motivations.length")
      ul.list-unstyled
        li: h6 Motivationen:
        li(v-for="motivation in charData.motivations" v-if="motivation.length > 0") {{motivation}}

  .row.mt-3.mb-5
    .col-6.offset-3.btn-group
      button.btn.btn-success(@click="openCharacterSheet") Charakterbogen erstellen
      router-link.btn.btn-outline-success(:to="{ name: 'start-generation' }") Zurück zum Anfang

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
      skillMap: get.SKILL_MAP,
      derivedValues: get.DERIVED_VALUES,
      charData: get.CHARACTER_DATA,
      attributes: get.ATTRIBUTE_LIST,
      getProfessionNameById: get.PROFESSION_NAME_BY_ID,
      getFacetteByName: get.FACETTE_BY_NAME,
    }),
    skillList() {
      return Object.keys(this.skills).sort();
    },
    currentProfessionName() {
      return this.getProfessionNameById(this.charData.profession);
    },
    currentFacettes() {
      return this.charData.facettes.map(facette => ({ [facette]: this.getFacetteByName(facette) }));
    },
    aggregatedCharacterData() {
      return {
        skillMap: this.skillMap,
        derivedValues: this.derivedValues,
        characterData: this.charData,
        professionName: this.currentProfessionName,
        facettes: this.currentFacettes,
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
@import "../common/settings";

.attribute-list {
  column-count: 3;
}

.skill-list {
  @include media-breakpoint-up(md) {
    column-count: 2;
  }
}

</style>
