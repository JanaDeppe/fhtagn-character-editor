<template lang="pug">
div
  .row(ref="characterSummaryContainer")
    .col-12.mb-3
      h4.text-center Zusammenfassung&nbsp;<br>
        span(v-if="characterStore.personalInformation.Vorname || characterStore.personalInformation.Nachname")
          | "{{characterStore.personalInformation.Vorname}} {{characterStore.personalInformation.Nachname}}"
    .col-12.mb-3
      .row
        .col-6(v-if="characterStore.personalInformation.Alter") Alter: {{characterStore.personalInformation.Alter}}
        .col-6(v-if="characterStore.personalInformation.Muttersprache") Muttersprache: {{characterStore.personalInformation.Muttersprache}}
        .col-12(v-if="characterStore.personalInformation.Aussehen") Aussehen: {{characterStore.personalInformation.Aussehen}}
        .col-12(v-if="characterStore.personalInformation.Ausrüstungsgegenstände")
          | Ausrüstungsgegenstände: {{characterStore.personalInformation.Ausrüstungsgegenstände}}

    // Attribute
    .col-12.mb-5
      h5(v-if="Object.keys(characterStore.attributeValues).length") Attribute:
      ul.list-unstyled.attribute-list(v-if="characterStore.attributeValues")
        li(v-for="(value, abbr) in characterStore.attributeValues").row
          .col-2 {{abbr}}:
          .col-10 {{value}}

    // Beruf
    .col-12.mb-3
      h5(v-if="characterStore.profession > -1") Beruf:
        span(v-if="characterStore.professionVariant") {{characterStore.professionVariant}} ({{currentProfessionName}})
        span(v-else) {{currentProfessionName}}

    // Skills
    .col-12.mb-5
      h6 Fertigkeiten:
      ul.skill-list.list-unstyled(v-if="characterStore.profession > -1")
        li.mb-2(v-for="skill in skillsStore.completeSkillMap")
          single-skill(
            :canAddSpecialisations="false"
            :canRemoveSpecialisations="false"
            :showCalculatedValue="true"
            :skillname="skill.skillname"
            :skillId="skill.skillId")

    // Verbindungen
    .col-12.col-md-6.mb-3(v-if="characterStore.connections.length")
      ul.list-unstyled
        li: h6 Verbindungen:
        li(v-for="conn in nonZeroConnections") {{conn}}

    // Facetten
    .col-12.col-md-6.mb-3(v-if="characterStore.facettes.length")
      ul.list-unstyled
        li: h6 Facetten:
        li(v-for="facette in characterStore.facettes") {{facette}}

    // Motivationen
    .col-12.col-md-6.mb-3(v-if="characterStore.motivations.length")
      ul.list-unstyled
        li: h6 Motivationen:
        li(v-for="motivation in nonZeroMotivations") {{motivation}}

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
import { mapStores } from "pinia";
import { useSkillsStore } from "../stores/skills";
import { useCharacterStore } from "../stores/character";
import { useRulesystemStore } from "../stores/rulesystem";

import CharacterSheetModal from "@/components/CharacterSheetModal.vue";
import SingleSkill from "@/components/SingleSkill.vue";

export default {
  props: {},
  components: {
    CharacterSheetModal,
    SingleSkill,
  },
  data() {
    return {
      isCharacterSheetOpen: false,
    };
  },
  computed: {
    ...mapStores(useSkillsStore, useCharacterStore, useRulesystemStore),
    skillList() {
      return Object.keys(this.skills).sort();
    },
    currentProfessionName() {
      return this.rulesystemStore.professionNameById(
        this.characterStore.profession
      );
    },
    nonZeroConnections() {
      return this.characterStore.connections.filter(
        (connection) => connection.length > 0
      );
    },
    nonZeroMotivations() {
      return this.characterStore.motivations.filter(
        (motivation) => motivation.length > 0
      );
    },
    currentFacettes() {
      return this.characterStore.facettes.map((facette) => ({
        [facette]: this.rulesystemStore.facetteByName(facette),
      }));
    },
    aggregatedCharacterData() {
      return {
        skillMap: this.skillsStore.completeSkillMap,
        derivedValues: this.characterStore.derivedValues,
        characterData: this.characterStore.characterData,
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

<style scoped>
.attribute-list {
  column-count: 3;
}

@media screen and (min-width: 768px) {
  .skill-list {
    column-count: 2;
  }
}
</style>
