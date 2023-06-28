<template lang="pug">
section.text-sm
  h2.text-center {{ $t("components.sidebarSummary.title") }}<br>
    span(v-if="personalInformation.Vorname || personalInformation.Nachname") "{{personalInformation.Vorname}} {{personalInformation.Nachname}}"
  .flex.flex-wrap.mb-3
    .mt-3.basis-full.md_basis-1-2(v-if="personalInformation.Muttersprache") {{ $t("common.terms.nativeLanguage") }}: {{personalInformation.Muttersprache}}
    .mt-3.basis-full.md_basis-1-2(v-if="personalInformation.Alter") {{ $t("common.terms.age") }}: {{personalInformation.Alter}}
    .mt-3.basis-full(v-if="personalInformation.Aussehen") {{ $t("common.terms.appearance") }}: {{personalInformation.Aussehen}}
    .mt-3.basis-full(v-if="personalInformation.Ausrüstungsgegenstände")
      | {{ $t("common.terms.equipment") }}: {{personalInformation.Ausrüstungsgegenstände}}

  // Attribute
  h3.mt-3(v-if="Object.keys(attributeValues).length") {{ $t("common.terms.attributes") }}:
  ul.columns-3(v-if="attributeValues")
    li(v-for="(value, abbr) in attributeValues").flex
      .shrink.mr-1 {{ $t(`rulesystem.attributes.abbr.${abbr}`) }}:
      .grow {{value}}

  // Beruf
  h5.mt-3(v-if="profession > -1") {{ $t("common.terms.profession") }}:&nbsp;
    span(v-if="professionVariant") {{ $t(`rulesystem.professions.${professionName}.variants.${professionVariant}`) }} ({{ $t(`rulesystem.professions.${professionName}.name`) }})
    span(v-else) {{professionName}}

  // Skills
  ul.mt-3(v-if="!characterStore.isProfessionLoading")
    li: h6 {{ $t("common.terms.skills") }}:
    li(v-for="skill in skillsStore.modifiedSkills")
      single-skill.mb-1(
        :canAddSpecialisations="false"
        :canRemoveSpecialisations="false"
        :showCalculatedValue="true"
        :skillId="skill.skillId")

  // Bindungen
  div(v-if="isArrayPopulated(connections)")
    h6.mt-3.mb-0 {{ $t("common.terms.connections") }}:
    ul
      li(v-for="conn in connections") {{conn}}

  // Facetten
  div(v-if="facettes.length > 0")
    h6.mt-3.mb-0 {{ $t("common.terms.facettes") }}:
    ul
      li(v-for="facette in facettes") {{facette}}

  // Motivationen
  div(v-if="isArrayPopulated(motivations)")
    h6.mt-3.mb-0 {{ $t("common.terms.motivations") }}:
    ul
      li(v-for="motivation in motivations") {{motivation}}

</template>

<script>
import { mapStores } from "pinia";
import { useCharacterStore } from "../stores/character";
import { useSkillsStore } from "../stores/skills";
import { useRulesystemStore } from "../stores/rulesystem";
import SingleSkill from "@/components/SingleSkill.vue";

export default {
  props: {},
  components: {
    SingleSkill,
  },
  computed: {
    ...mapStores(useCharacterStore, useSkillsStore, useRulesystemStore),
    attributeValues() {
      return this.characterStore.characterData.attributeValues;
    },
    connections() {
      return this.characterStore.characterData.connections.filter(
        (conn) => conn.length > 0
      );
    },
    facettes() {
      return this.characterStore.characterData.facettes;
    },
    motivations() {
      return this.characterStore.characterData.motivations.filter(
        (motiv) => motiv.length > 0
      );
    },
    personalInformation() {
      return this.characterStore.characterData.personalInformation;
    },
    profession() {
      return this.characterStore.characterData.profession;
    },
    professionVariant() {
      return this.characterStore.characterData.professionVariant;
    },
    professionName() {
      return this.rulesystemStore.professionNameById(this.profession);
    },
  },
  methods: {
    isArrayPopulated(array) {
      return !!array.find((item) => item.trim().length > 0);
    },
  },
};
</script>
