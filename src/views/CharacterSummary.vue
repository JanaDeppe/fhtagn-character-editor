<template lang="pug">
div
  .flex.flex-wrap(ref="characterSummaryContainer")
    .basis-full.mb-3
      h4.text-center Zusammenfassung&nbsp;<br>
        span(v-if="characterStore.personalInformation.Vorname || characterStore.personalInformation.Nachname")
          | "{{characterStore.personalInformation.Vorname}} {{characterStore.personalInformation.Nachname}}"
    .basis-full.mb-3
      .flex.flex-wrap
        .basis-1-2(v-if="characterStore.personalInformation.Alter") Alter: {{characterStore.personalInformation.Alter}}
        .basis-1-2(v-if="characterStore.personalInformation.Muttersprache") Muttersprache: {{characterStore.personalInformation.Muttersprache}}
        .basis-full(v-if="characterStore.personalInformation.Aussehen") Aussehen: {{characterStore.personalInformation.Aussehen}}
        .basis-full(v-if="characterStore.personalInformation.Ausrüstungsgegenstände")
          | Ausrüstungsgegenstände: {{characterStore.personalInformation.Ausrüstungsgegenstände}}

    // Attribute
    .basis-full.mb-5
      h5(v-if="Object.keys(characterStore.attributeValues).length") Attribute:
      ul.columns-3(v-if="characterStore.attributeValues")
        li(v-for="(value, abbr) in characterStore.attributeValues").flex
          .basis-1-6 {{abbr}}:
          .basis-5-6 {{value}}

    // Beruf
    .basis-full.mb-3
      h5(v-if="characterStore.profession > -1") Beruf:
        span(v-if="characterStore.professionVariant") {{characterStore.professionVariant}} ({{currentProfessionName}})
        span(v-else) {{currentProfessionName}}

    // Skills
    .basis-full.mb-5
      h6 Fertigkeiten:
      ul.columns-2(v-if="characterStore.profession > -1")
        li.mb-2(v-for="skill in skillsStore.completeSkillMap")
          single-skill(
            :canAddSpecialisations="false"
            :canRemoveSpecialisations="false"
            :showCalculatedValue="true"
            :skillname="skill.skillname"
            :skillId="skill.skillId")

    // Bindungen
    .basis-full.md_basis-1-2.mb-3(v-if="characterStore.connections.length")
      ul
        li: h6 Bindungen:
        li(v-for="conn in nonZeroConnections") {{conn}}

    // Facetten
    .basis-full.md_basis-1-2.mb-3(v-if="characterStore.facettes.length")
      ul
        li: h6 Facetten:
        li(v-for="facette in characterStore.facettes") {{facette}}

    // Motivationen
    .basis-full.md_basis-1-2.mb-3(v-if="characterStore.motivations.length")
      ul
        li: h6 Motivationen:
        li(v-for="motivation in nonZeroMotivations") {{motivation}}

  .flex.justify-center.mt-3.mb-5
    .basis-1-2.flex.gap-3
      button.button(@click="openCharacterSheet") Charakterbogen erstellen
      router-link.button(:to="{ name: 'start-generation' }") Zurück zum Anfang

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
