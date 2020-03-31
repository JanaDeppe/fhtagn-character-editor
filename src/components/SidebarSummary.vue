<template lang="pug">
div
  h4.text-center Zusammenfassung&nbsp;<br>
    span(v-if="personalInformation.Vorname || personalInformation.Nachname") "{{personalInformation.Vorname}} {{personalInformation.Nachname}}"
  .grid-x
    .cell.small-6(v-if="personalInformation.Geschlecht") {{personalInformation.Geschlecht}}
    .cell.small-6(v-if="personalInformation.Alter") {{personalInformation.Alter}}
    .cell.small-12(v-if="personalInformation.Aussehen") {{personalInformation.Aussehen}}

  // Attribute
  h6(v-if="Object.keys(attributeValues).length") Attribute:
  ul.small-list.attribute-list(v-if="attributeValues")
    li(v-for="(value, abbr) in attributeValues").grid-x
      .cell.small-4 {{abbr}}:
      .cell.small-8 {{value}}

  // Beruf
  h6(v-if="profession > -1") Beruf:&nbsp;
    span(v-if="professionVariant") {{professionVariant}} ({{professionName}})
    span(v-else) {{professionName}}

  // Skills
  ul.skill-list.small-list(v-if="!isProfessionLoading")
    li: h6 Fertigkeiten:
    li(v-for="skill in modifiedSkills")
      skill(
        :canAddSpecialisations="false"
        :canRemoveSpecialisation="false"
        :showCalculatedValue="true"
        :skillId="skill.skillId")

  // Verbindungen
  ul.small-list(v-if="connections.length > 0")
    li: h6 Verbindungen:
    li(v-for="conn in connections" v-if="conn.length > 0") {{conn}}

  // Facetten
  ul.small-list(v-if="facettes.length > 0")
    li: h6 Facetten:
    li(v-for="facette in facettes") {{facette}}

  // Motivationen
  ul.small-list(v-if="motivations.length > 0")
    li: h6 Motivationen:
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
};
</script>

<style lang="scss" scoped>

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
  li {
    margin-bottom: .1rem;
  }
}

</style>
