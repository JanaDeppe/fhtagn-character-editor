<template lang="pug">
div
  h4.text-center Zusammenfassung<br>
    span(v-if="personalInformation.Vorname || personalInformation.Nachname") "{{personalInformation.Vorname}} {{personalInformation.Nachname}}"
  .row.mb-3
    .col-12.col-md-6(v-if="personalInformation.Muttersprache") Muttersprache: {{personalInformation.Muttersprache}}
    .col-12.col-md-6(v-if="personalInformation.Alter") Alter: {{personalInformation.Alter}}
    .col-12(v-if="personalInformation.Aussehen") Aussehen: {{personalInformation.Aussehen}}
    .col-12(v-if="personalInformation.Ausrüstungsgegenstände")
      | Ausrüstung: {{personalInformation.Ausrüstungsgegenstände}}

  // Attribute
  h6(v-if="Object.keys(attributeValues).length") Attribute:
  ul.list-unstyled.mb-3.attribute-list(v-if="attributeValues")
    li(v-for="(value, abbr) in attributeValues").row
      .col-2 {{abbr}}:
      .col-8 {{value}}

  // Beruf
  h5(v-if="profession > -1") Beruf:&nbsp;
    span(v-if="professionVariant") {{professionVariant}} ({{professionName}})
    span(v-else) {{professionName}}

  // Skills
  ul.list-unstyled.small-list(v-if="!isProfessionLoading")
    li: h6 Fertigkeiten:
    li(v-for="skill in modifiedSkills")
      skill.mb-1(
        :canAddSpecialisations="false"
        :canRemoveSpecialisations="false"
        :showCalculatedValue="true"
        :skillId="skill.skillId")

  // Verbindungen
  div(v-if="isArrayPopulated(connections)")
    h6.mb-0 Verbindungen:
    ul.small-list.list-unstyled.mb-3
      li(v-for="conn in connections" v-if="conn.length > 0") {{conn}}

  // Facetten
  div(v-if="facettes.length > 0")
    h6.mb-0 Facetten:
    ul.small-list.list-unstyled
      li(v-for="facette in facettes") {{facette}}

  // Motivationen
  div(v-if="isArrayPopulated(motivations)")
    h6.mb-0 Motivationen:
    ul.small-list.list-unstyled
      li(v-for="motivation in motivations" v-if="motivation.length > 0") {{motivation}}

</template>

<script>
import { mapGetters } from 'vuex';
import { get } from '@/store/type';

import Skill from '@/components/Skill.vue';

export default {
  props: {},
  components: {
    Skill,
  },
  computed: {
    ...mapGetters({
      attributes: get.ATTRIBUTE_LIST,
      modifiedSkills: get.MODIFIED_SKILLS,
      characterData: get.CHARACTER_DATA,
      professionNameById: get.PROFESSION_NAME_BY_ID,
      isProfessionLoading: get.IS_PROFESSION_LOADING,
    }),
    attributeValues() {
      return this.characterData.attributeValues;
    },
    connections() { return this.characterData.connections; },
    facettes() { return this.characterData.facettes; },
    motivations() { return this.characterData.motivations; },
    personalInformation() { return this.characterData.personalInformation; },
    profession() { return this.characterData.profession; },
    professionVariant() { return this.characterData.professionVariant; },
    professionName() { return this.professionNameById(this.profession); },
  },
  methods: {
    isArrayPopulated(array) {
      return !!(array.find(item => item.trim().length > 0));
    },
  },
};
</script>

<style scoped>

.small-list {
  font-size: .875rem;
}

.attribute-list {
    column-count: 3;
}

</style>
